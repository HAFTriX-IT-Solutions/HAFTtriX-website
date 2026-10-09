import cv2
import numpy as np
from PIL import Image

def build_logo():
    # 1. Load original high-resolution logo
    src = cv2.imread('public/logo.jpg')
    h, w, c = src.shape

    # 2. Compute accurate logo mask
    # Find max color channel
    max_c = np.max(src, axis=2)
    
    # Threshold candidates
    cand = (max_c > 16).astype(np.uint8) * 255
    
    # Invert and floodfill from outer borders to isolate background
    inv = cv2.bitwise_not(cand)
    fill_mask = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(inv, fill_mask, (0, 0), 128)
    cv2.floodFill(inv, fill_mask, (w - 1, 0), 128)
    cv2.floodFill(inv, fill_mask, (0, h - 1), 128)
    cv2.floodFill(inv, fill_mask, (w - 1, h - 1), 128)
    
    logo_mask = (inv != 128).astype(np.uint8) * 255
    
    # Fill internal holes (grooves/crevices inside the logo components)
    cnts, hier = cv2.findContours(logo_mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    for i, c_item in enumerate(cnts):
        if hier[0][i][3] != -1:
            cv2.drawContours(logo_mask, [c_item], -1, 255, -1)
            
    # Clean up empty air zones where ambient glow bled into air:
    # 1. To the left of H column (x < 83)
    logo_mask[:, :83] = 0
    # 2. Empty space between H column and bracket tips (x in [192, 252])
    # Above horizontal bar: y < 475
    logo_mask[:475, 192:253] = 0
    # Below horizontal bar: y > 565
    logo_mask[566:, 192:253] = 0
    
    # Remove any tiny floating specks (< 100 pixels) outside the main body
    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(logo_mask)
    clean_mask = np.zeros_like(logo_mask)
    for i in range(1, num_labels):
        if stats[i, cv2.CC_STAT_AREA] > 1000:
            clean_mask[labels == i] = 255
            
    logo_mask = clean_mask
    
    # Smooth edges with slight anti-aliasing
    alpha = cv2.GaussianBlur(logo_mask.astype(np.float32), (3, 3), 0.75) / 255.0
    alpha = np.clip(alpha, 0.0, 1.0)
    
    # Crop to bounding box of the logo
    pts = np.argwhere(logo_mask > 0)
    ymin, xmin = pts.min(axis=0)
    ymax, xmax = pts.max(axis=0)
    lw = xmax - xmin + 1
    lh = ymax - ymin + 1
    
    cropped_src = src[ymin:ymax+1, xmin:xmax+1].astype(np.float32)
    cropped_alpha = alpha[ymin:ymax+1, xmin:xmax+1]
    
    # Canvas size: 1024 x 1024 with ample room for glow stroke (padding ~70px)
    out_dim = 1024
    target_max = 880.0
    scale = target_max / max(lw, lh)
    nw = int(round(lw * scale))
    nh = int(round(lh * scale))
    
    res_src = cv2.resize(cropped_src, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    res_alpha = cv2.resize(cropped_alpha, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    res_alpha = np.clip(res_alpha, 0.0, 1.0)
    
    # Position centered on canvas
    ox = (out_dim - nw) // 2
    oy = (out_dim - nh) // 2
    
    canvas_logo_bgr = np.zeros((out_dim, out_dim, 3), dtype=np.float32)
    canvas_logo_a = np.zeros((out_dim, out_dim), dtype=np.float32)
    
    canvas_logo_bgr[oy:oy+nh, ox:ox+nw] = res_src
    canvas_logo_a[oy:oy+nh, ox:ox+nw] = res_alpha
    
    # Binary logo core for stroke dilation
    core = (canvas_logo_a > 0.4).astype(np.uint8) * 255
    
    # Create the glow stroke:
    # 1. Crisp outline stroke along the perimeter (3px width)
    k1 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    d1 = cv2.dilate(core, k1)
    stroke_sharp = cv2.subtract(d1, core)
    stroke_sharp_f = cv2.GaussianBlur(stroke_sharp.astype(np.float32), (3, 3), 0.8) / 255.0
    
    # 2. Medium vibrant neon glow (radius ~12px)
    k2 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    d2 = cv2.dilate(core, k2)
    stroke_med = cv2.subtract(d2, core)
    stroke_med_f = cv2.GaussianBlur(stroke_med.astype(np.float32), (15, 15), 4.5) / 255.0
    
    # 3. Soft atmospheric neon aura (radius ~30px)
    k3 = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (33, 33))
    d3 = cv2.dilate(core, k3)
    stroke_wide = cv2.subtract(d3, core)
    stroke_wide_f = cv2.GaussianBlur(stroke_wide.astype(np.float32), (35, 35), 11.0) / 255.0
    
    # Color palette for glow:
    # Inner sharp stroke: Intense bright cyan/white-cyan (RGB: 140, 250, 255 -> BGR: 255, 250, 140)
    # Medium glow: Electric cyan #00f0ff (RGB: 0, 240, 255 -> BGR: 255, 240, 0)
    # Wide aura: Deep glowing blue #0284c7 (RGB: 2, 132, 199 -> BGR: 199, 132, 2)
    
    glow_b = stroke_sharp_f * 255.0 + stroke_med_f * 255.0 + stroke_wide_f * 220.0
    glow_g = stroke_sharp_f * 250.0 + stroke_med_f * 225.0 + stroke_wide_f * 140.0
    glow_r = stroke_sharp_f * 160.0 + stroke_med_f * 20.0  + stroke_wide_f * 10.0
    
    # Combined glow alpha
    glow_alpha = np.clip(stroke_sharp_f * 0.95 + stroke_med_f * 0.80 + stroke_wide_f * 0.45, 0.0, 1.0)
    
    # Normalize glow RGB where glow_alpha > 0 so that color doesn't darken (unassociated/straight alpha)
    glow_rgb = np.stack([glow_b, glow_g, glow_r], axis=2)
    # Scale color to full brightness
    glow_intensity = np.maximum.reduce([stroke_sharp_f, stroke_med_f, stroke_wide_f])
    glow_intensity_safe = np.maximum(glow_intensity, 1e-4)[:, :, np.newaxis]
    glow_rgb_norm = glow_rgb / glow_intensity_safe
    glow_rgb_norm = np.clip(glow_rgb_norm, 0.0, 255.0)
    
    # Composite Logo over Glow using Straight Alpha:
    # For pixels where logo_a is high, use logo color.
    # For pixels where logo_a is low but glow_alpha is high, use glow color.
    # Smooth transition in between.
    la = canvas_logo_a[:, :, np.newaxis]
    ga = (glow_alpha * (1.0 - canvas_logo_a))[:, :, np.newaxis]
    total_a = la + ga
    total_a_safe = np.maximum(total_a, 1e-5)
    
    # Subtle inner neon edge on the logo perimeter for integration:
    inner_rim = stroke_sharp_f[:, :, np.newaxis] * la
    logo_brightened = np.clip(canvas_logo_bgr + inner_rim * np.array([255.0, 240.0, 120.0]) * 0.4, 0.0, 255.0)
    
    final_bgr = (logo_brightened * la + glow_rgb_norm * ga) / total_a_safe
    final_bgr = np.clip(final_bgr, 0.0, 255.0).astype(np.uint8)
    final_alpha = (np.clip(total_a[:, :, 0], 0.0, 1.0) * 255.0).astype(np.uint8)
    
    # Output BGRA
    final_bgra = np.dstack([final_bgr, final_alpha])
    
    # Convert to RGBA for PIL
    final_rgba = cv2.cvtColor(final_bgra, cv2.COLOR_BGRA2RGBA)
    pil_img = Image.fromarray(final_rgba)
    
    # Save as high quality PNG
    pil_img.save('public/logo.png', format='PNG', optimize=True)
    print('Saved public/logo.png successfully!')
    
    # Also save a 512x512 and 192x192 version for icons / favicon
    pil_512 = pil_img.resize((512, 512), Image.Resampling.LANCZOS)
    pil_512.save('public/logo-512.png', format='PNG', optimize=True)
    
    pil_192 = pil_img.resize((192, 192), Image.Resampling.LANCZOS)
    pil_192.save('public/logo-192.png', format='PNG', optimize=True)

    # Also generate a dark-background preview and a light-background preview to check both
    dark_bg = Image.new('RGB', (1024, 1024), (10, 15, 29))
    dark_bg.paste(pil_img, (0, 0), pil_img)
    dark_bg.save('scripts/preview_dark.jpg', quality=95)
    
    light_bg = Image.new('RGB', (1024, 1024), (248, 250, 252))
    light_bg.paste(pil_img, (0, 0), pil_img)
    light_bg.save('scripts/preview_light.jpg', quality=95)
    print('Saved previews successfully!')

if __name__ == '__main__':
    build_logo()
