import cv2
import numpy as np
from PIL import Image

def generate_ultimate_logo():
    # 1. Load original high-res logo
    src = cv2.imread('public/logo.jpg')
    h, w, _ = src.shape

    # 2. Segment logo foreground
    max_c = np.max(src, axis=2)
    cand = (max_c > 16).astype(np.uint8) * 255
    inv = cv2.bitwise_not(cand)
    
    # Flood fill outer background from corners
    mask_corners = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(inv, mask_corners, (0, 0), 128)
    cv2.floodFill(inv, mask_corners, (w - 1, 0), 128)
    cv2.floodFill(inv, mask_corners, (0, h - 1), 128)
    cv2.floodFill(inv, mask_corners, (w - 1, h - 1), 128)
    
    # Flood fill the inner triangle hole between bracket and X crossing
    mask_hole = np.zeros((h + 2, w + 2), np.uint8)
    cv2.floodFill(inv, mask_hole, (587, 530), 128)
    
    logo_raw = (inv != 128).astype(np.uint8) * 255
    
    # Clean the empty air zones
    logo_raw[:, :83] = 0
    logo_raw[:475, 192:253] = 0
    logo_raw[566:, 192:253] = 0
    
    # Fill small internal crevices/texture grooves
    cnts, hier = cv2.findContours(logo_raw, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    logo_clean = logo_raw.copy()
    for i, c in enumerate(cnts):
        if hier[0][i][3] != -1:
            area = cv2.contourArea(c)
            # Only fill small enclosed regions (< 1000 px) that are dark metal grooves
            if area < 1000:
                cv2.drawContours(logo_clean, [c], -1, 255, -1)
                
    # Filter out any tiny disconnected noise
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(logo_clean)
    main_body = np.zeros_like(logo_clean)
    for i in range(1, num_labels):
        if stats[i, cv2.CC_STAT_AREA] > 3000:
            main_body[labels == i] = 255
            
    # Slight morphological smoothing to remove 1-px quantization jitter
    k_smooth = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    main_body = cv2.morphologyEx(main_body, cv2.MORPH_CLOSE, k_smooth)

    # 3. Signed Distance Field for Subpixel Accuracy
    d_in = cv2.distanceTransform(main_body, cv2.DIST_L2, 5)
    d_out = cv2.distanceTransform(cv2.bitwise_not(main_body), cv2.DIST_L2, 5)
    
    # Logo Alpha (with 1.5px antialiased transition)
    logo_alpha = np.clip((d_in - d_out) / 1.5 + 0.5, 0.0, 1.0)
    
    # 4. Center and scale onto 1024x1024 canvas with margin for glowing stroke
    pts = np.argwhere(main_body > 0)
    ymin, xmin = pts.min(axis=0)
    ymax, xmax = pts.max(axis=0)
    lw = xmax - xmin + 1
    lh = ymax - ymin + 1
    
    # Crop source image and distance maps
    crop_src = src[ymin:ymax+1, xmin:xmax+1].astype(np.float32)
    crop_la = logo_alpha[ymin:ymax+1, xmin:xmax+1]
    crop_din = d_in[ymin:ymax+1, xmin:xmax+1]
    crop_dout = d_out[ymin:ymax+1, xmin:xmax+1]
    
    out_size = 1024
    target_box = 860.0
    scale = target_box / max(lw, lh)
    nw = int(round(lw * scale))
    nh = int(round(lh * scale))
    
    res_src = cv2.resize(crop_src, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    res_la = cv2.resize(crop_la, (nw, nh), interpolation=cv2.INTER_LANCZOS4)
    res_la = np.clip(res_la, 0.0, 1.0)
    res_din = cv2.resize(crop_din, (nw, nh), interpolation=cv2.INTER_LANCZOS4) * scale
    res_dout = cv2.resize(crop_dout, (nw, nh), interpolation=cv2.INTER_LANCZOS4) * scale
    
    # Full canvas maps
    canvas_src = np.zeros((out_size, out_size, 3), dtype=np.float32)
    canvas_la = np.zeros((out_size, out_size), dtype=np.float32)
    canvas_din = np.zeros((out_size, out_size), dtype=np.float32)
    canvas_dout = np.full((out_size, out_size), 999.0, dtype=np.float32)
    
    ox = (out_size - nw) // 2
    oy = (out_size - nh) // 2
    
    canvas_src[oy:oy+nh, ox:ox+nw] = res_src
    canvas_la[oy:oy+nh, ox:ox+nw] = res_la
    canvas_din[oy:oy+nh, ox:ox+nw] = res_din
    canvas_dout[oy:oy+nh, ox:ox+nw] = res_dout
    
    # Recompute Euclidean distance transform on full canvas for perfect seamless glow across edges
    binary_core = (canvas_la > 0.5).astype(np.uint8) * 255
    full_dout = cv2.distanceTransform(cv2.bitwise_not(binary_core), cv2.DIST_L2, 5)
    full_din = cv2.distanceTransform(binary_core, cv2.DIST_L2, 5)
    
    # 5. GLOW STROKE COMPUTATION (Silky, rich, neon cyan and blue)
    # A) Sharp intense neon outline stroke (width 2-4px, bright white-cyan)
    # Peak at d=1.5px
    stroke_sharp = np.exp(-((full_dout - 1.0) / 2.2) ** 2) * (full_dout >= 0)
    
    # B) Medium vibrant cyan neon glow (radius 12px)
    stroke_mid = np.exp(-(full_dout / 7.5)) * (full_dout >= 0)
    
    # C) Soft atmospheric electric blue aura (radius 32px)
    stroke_wide = np.exp(-(full_dout / 20.0)) * (full_dout >= 0)
    
    # D) Inner rim glow along the bevel edge inside the logo
    inner_rim = np.exp(-(full_din / 2.5) ** 2) * (full_din > 0)
    
    # Combine Glow components:
    # Colors in BGR:
    # Sharp:  (B: 255, G: 250, R: 180) -> Ultra bright cyan-white
    # Mid:    (B: 255, G: 215, R: 0)   -> Electric Neon Cyan (#00d7ff)
    # Wide:   (B: 220, G: 120, R: 0)   -> Studio Blue (#0078dc)
    
    glow_b = stroke_sharp * 255.0 * 1.0 + stroke_mid * 255.0 * 0.9 + stroke_wide * 220.0 * 0.5
    glow_g = stroke_sharp * 250.0 * 1.0 + stroke_mid * 215.0 * 0.9 + stroke_wide * 120.0 * 0.5
    glow_r = stroke_sharp * 180.0 * 1.0 + stroke_mid * 0.0   * 0.9 + stroke_wide * 0.0   * 0.5
    
    glow_intensity = np.maximum(stroke_sharp * 1.0, np.maximum(stroke_mid * 0.85, stroke_wide * 0.4))
    glow_alpha = np.clip(stroke_sharp * 0.95 + stroke_mid * 0.80 + stroke_wide * 0.35, 0.0, 1.0)
    
    # Glow RGB normalized for straight alpha
    glow_intensity_safe = np.maximum(glow_intensity, 1e-4)[:, :, np.newaxis]
    glow_bgr_raw = np.stack([glow_b, glow_g, glow_r], axis=2)
    glow_bgr_clean = np.clip(glow_bgr_raw / glow_intensity_safe, 0.0, 255.0)
    
    # Logo body with inner neon rim enhancement
    rim_boost = inner_rim[:, :, np.newaxis] * np.array([255.0, 240.0, 140.0], dtype=np.float32) * 0.45
    logo_enhanced = np.clip(canvas_src + rim_boost, 0.0, 255.0)
    
    # Straight Alpha blending:
    # Inside logo: canvas_la -> logo_enhanced
    # Outside logo: glow_alpha * (1 - canvas_la) -> glow_bgr_clean
    la = canvas_la[:, :, np.newaxis]
    ga = (glow_alpha * (1.0 - canvas_la))[:, :, np.newaxis]
    
    total_alpha = np.clip(la + ga, 0.0, 1.0)
    total_alpha_safe = np.maximum(total_alpha, 1e-5)
    
    final_bgr = (logo_enhanced * la + glow_bgr_clean * ga) / total_alpha_safe
    final_bgr = np.clip(final_bgr, 0.0, 255.0).astype(np.uint8)
    final_alpha = (total_alpha[:, :, 0] * 255.0).astype(np.uint8)
    
    # Pack to RGBA PIL image
    final_bgra = np.dstack([final_bgr, final_alpha])
    final_rgba = cv2.cvtColor(final_bgra, cv2.COLOR_BGRA2RGBA)
    pil_master = Image.fromarray(final_rgba)
    
    # Save master high-resolution transparent PNG
    pil_master.save('public/logo.png', format='PNG', optimize=True)
    print('Master public/logo.png (1024x1024) created!')
    
    # Also save 512x512, 256x256, 192x192, 64x64, 32x32 for favicons and web manifests
    for sz in [512, 256, 192, 64, 32]:
        resized = pil_master.resize((sz, sz), Image.Resampling.LANCZOS)
        resized.save(f'public/logo-{sz}.png', format='PNG', optimize=True)
        if sz == 32:
            resized.save('public/favicon.ico', format='ICO')
            
    # Also update logo.jpg with a dark background version so any fallback works beautifully
    dark_preview = Image.new('RGB', (1024, 1024), (11, 15, 25))
    dark_preview.paste(pil_master, (0, 0), pil_master)
    dark_preview.save('public/logo.jpg', format='JPEG', quality=95)
    dark_preview.save('scripts/preview_dark_v2.jpg', format='JPEG', quality=95)
    
    light_preview = Image.new('RGB', (1024, 1024), (248, 250, 252))
    light_preview.paste(pil_master, (0, 0), pil_master)
    light_preview.save('scripts/preview_light_v2.jpg', format='JPEG', quality=95)
    print('Generated all resolutions and preview images!')

if __name__ == '__main__':
    generate_ultimate_logo()
