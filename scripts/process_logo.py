import cv2
import numpy as np
from PIL import Image

def process_logo():
    # 1. Load original image
    src = cv2.imread('public/logo.jpg')
    h, w = src.shape[:2]

    # Convert to float
    src_f = src.astype(np.float32)

    # 2. Extract accurate foreground mask
    gray = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    
    # We want to identify background pixels starting from outer edges
    # Clean up low-level noise in the dark background
    # Use flood fill from corners with tolerance
    mask_fill = np.zeros((h + 2, w + 2), np.uint8)
    bg_marker = np.zeros((h, w), np.uint8)
    
    # Threshold at 14 to distinguish background compression noise from real logo bevel/shadow
    _, binary = cv2.threshold(gray, 14, 255, cv2.THRESH_BINARY)
    
    # Flood fill inverted binary from all four corners
    inv_binary = cv2.bitwise_not(binary)
    cv2.floodFill(inv_binary, mask_fill, (0, 0), 128)
    cv2.floodFill(inv_binary, mask_fill, (w - 1, 0), 128)
    cv2.floodFill(inv_binary, mask_fill, (0, h - 1), 128)
    cv2.floodFill(inv_binary, mask_fill, (w - 1, h - 1), 128)
    
    # Background is where inv_binary == 128
    is_bg = (inv_binary == 128)
    
    # Logo is everything else
    logo_mask = np.zeros((h, w), np.uint8)
    logo_mask[~is_bg] = 255
    
    # Fill tiny holes inside the logo body (e.g. crevices in binary numbers)
    # But leave large open areas intact
    contours, hier = cv2.findContours(logo_mask, cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
    for i, c in enumerate(contours):
        # if contour is a hole inside the logo
        if hier[0][i][3] != -1:
            area = cv2.contourArea(c)
            # Only fill small holes (< 500 px) that might be dark metal texture
            if area < 500:
                cv2.drawContours(logo_mask, [c], -1, 255, -1)
                
    # Create smooth anti-aliased alpha matte
    # Soften edges slightly for high quality sub-pixel blending
    alpha = cv2.GaussianBlur(logo_mask.astype(np.float32), (3, 3), 0.8) / 255.0
    
    # Remove dark halo / color fringe on edge pixels:
    # Where alpha is between 0.05 and 0.95, brightened slightly to avoid dark rim
    # Now let's place on a comfortably sized canvas so glow is not cut off
    # Current logo bbox:
    pts = np.argwhere(logo_mask > 0)
    ymin, xmin = pts.min(axis=0)
    ymax, xmax = pts.max(axis=0)
    lw = xmax - xmin + 1
    lh = ymax - ymin + 1
    
    # Let's crop just the logo with its alpha
    cropped_src = src_f[ymin:ymax+1, xmin:xmax+1]
    cropped_alpha = alpha[ymin:ymax+1, xmin:xmax+1]
    
    # New canvas: 1200 x 1200 or 1024 x 1024
    out_dim = 1024
    # Calculate scale to fit inside 860x860 (leaving ~80px padding for glowing stroke)
    target_max = 840.0
    scale = target_max / max(lw, lh)
    new_w = int(round(lw * scale))
    new_h = int(round(lh * scale))
    
    resized_src = cv2.resize(cropped_src, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)
    resized_alpha = cv2.resize(cropped_alpha, (new_w, new_h), interpolation=cv2.INTER_LANCZOS4)
    resized_alpha = np.clip(resized_alpha, 0.0, 1.0)
    
    # Target canvas
    canvas_bgr = np.zeros((out_dim, out_dim, 3), dtype=np.float32)
    canvas_alpha = np.zeros((out_dim, out_dim), dtype=np.float32)
    
    off_x = (out_dim - new_w) // 2
    off_y = (out_dim - new_h) // 2
    
    canvas_bgr[off_y:off_y+new_h, off_x:off_x+new_w] = resized_src
    canvas_alpha[off_y:off_y+new_h, off_x:off_x+new_w] = resized_alpha
    
    # Defringe: where alpha < 1.0, adjust colors so they don't fade to black
    # For semi-transparent edge pixels, boost brightness towards neon/white/cyan reflection
    edge_zone = (canvas_alpha > 0.01) & (canvas_alpha < 0.92)
    
    # Generate the Glowing Stroke!
    # A) Binary silhouette for stroke calculation
    core_mask = (canvas_alpha > 0.4).astype(np.uint8) * 255
    
    # Multi-radius glow:
    # 1. Tight neon stroke (radius ~3-5px) - Intense electric cyan / neon white
    k_stroke = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    dilated_stroke = cv2.dilate(core_mask, k_stroke)
    outline = cv2.subtract(dilated_stroke, core_mask)
    outline_soft = cv2.GaussianBlur(outline.astype(np.float32), (5, 5), 1.2) / 255.0
    
    # 2. Medium glow (radius ~15-20px) - Electric cyan #00f0ff (BGR: 255, 240, 0)
    k_med = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    dilated_med = cv2.dilate(core_mask, k_med)
    glow_med = cv2.GaussianBlur(dilated_med.astype(np.float32), (21, 21), 6.0) / 255.0
    
    # 3. Soft ambient glow (radius ~40px) - Deep vibrant cyan/blue (BGR: 255, 160, 0)
    k_wide = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (35, 35))
    dilated_wide = cv2.dilate(core_mask, k_wide)
    glow_wide = cv2.GaussianBlur(dilated_wide.astype(np.float32), (51, 51), 16.0) / 255.0

    # Build the Glow Layer (RGBA)
    glow_b = glow_wide * 255.0 * 0.4 + glow_med * 255.0 * 0.6 + outline_soft * 255.0 * 0.9
    glow_g = glow_wide * 160.0 * 0.4 + glow_med * 230.0 * 0.6 + outline_soft * 250.0 * 0.9
    glow_r = glow_wide * 20.0  * 0.4 + glow_med * 50.0  * 0.6 + outline_soft * 180.0 * 0.9
    
    glow_alpha = np.clip(glow_wide * 0.35 + glow_med * 0.65 + outline_soft * 0.95, 0.0, 1.0)
    
    # Composite:
    # The glow sits behind the logo and wraps around its border
    # Combined alpha:
    logo_a = canvas_alpha[:, :, np.newaxis]
    
    glow_rgb = np.stack([glow_b, glow_g, glow_r], axis=2)
    glow_a = glow_alpha[:, :, np.newaxis]
    
    # Logo over glow:
    out_rgb = canvas_bgr * logo_a + glow_rgb * (1.0 - logo_a) * glow_a
    # Also add a touch of inner/border glow at the very rim of the logo
    rim = outline_soft[:, :, np.newaxis] * logo_a
    out_rgb += rim * np.array([255.0, 240.0, 100.0], dtype=np.float32) * 0.4
    
    out_rgb = np.clip(out_rgb, 0.0, 255.0).astype(np.uint8)
    
    final_alpha = np.clip(logo_a[:, :, 0] + glow_alpha * (1.0 - logo_a[:, :, 0]), 0.0, 1.0)
    final_alpha = (final_alpha * 255.0).astype(np.uint8)
    
    # Save as BGRA
    out_bgra = np.dstack([out_rgb, final_alpha])
    
    cv2.imwrite('public/logo.png', out_bgra)
    print('Successfully generated public/logo.png')

if __name__ == '__main__':
    process_logo()
