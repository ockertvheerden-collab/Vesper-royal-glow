#!/usr/bin/env python3
"""Compose the Vesper 1200x630 share card from the app's painted portraits."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

W, H = 2400, 1260  # exact 2x of 1200x630
NEAR_BLACK = (7, 8, 9, 255)
STEEL = (184, 196, 206, 255)
IVORY = (236, 236, 232, 255)
SLATE = (138, 142, 148, 255)

PORTRAITS = [
    "/workspace/public/portraits/lyra.jpg",
    "/workspace/public/portraits/kael.jpg",
    "/workspace/public/portraits/oren.jpg",
    "/workspace/public/portraits/nox.jpg",
    "/workspace/public/portraits/sable.jpg",
    "/workspace/public/portraits/mira.jpg",
    "/workspace/public/portraits/wren.jpg",
    "/workspace/public/portraits/iri.jpg",
]

SERIF_BOLD = "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf"
SANS_NARROW = "/usr/share/fonts/truetype/liberation/LiberationSansNarrow-Regular.ttf"
OUT = Path("/workspace/.grok/card-raw.png")


def hex_rgba(rgb, a=255):
    return (rgb[0], rgb[1], rgb[2], a)


def radial_background(size, inner, outer):
    w, h = size
    import numpy as np

    ys, xs = np.ogrid[0:h, 0:w]
    cx, cy = (w - 1) / 2.0, (h - 1) / 2.0
    nx = (xs - cx) / cx
    ny = (ys - cy) / (cy * 0.92)
    t = np.clip(np.sqrt(nx * nx + ny * ny) * 0.92, 0, 1)
    t = t * t * (3 - 2 * t)
    r = (inner[0] + (outer[0] - inner[0]) * t).astype(np.uint8)
    g = (inner[1] + (outer[1] - inner[1]) * t).astype(np.uint8)
    b = (inner[2] + (outer[2] - inner[2]) * t).astype(np.uint8)
    a = np.full((h, w), 255, dtype=np.uint8)
    arr = np.dstack([r, g, b, a])
    return Image.fromarray(arr, "RGBA")


def glow_ellipse(size, cx, cy, rx, ry, color, blur, strength=1.0):
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    pad = int(blur * 1.6)
    d.ellipse(
        (cx - rx, cy - ry, cx + rx, cy + ry),
        outline=hex_rgba(color, int(90 * strength)),
        width=max(2, int(6 * strength)),
    )
    d.ellipse(
        (cx - rx + 10, cy - ry + 8, cx + rx - 10, cy + ry - 8),
        outline=hex_rgba(color, int(40 * strength)),
        width=2,
    )
    return layer.filter(ImageFilter.GaussianBlur(blur))


def circle_portrait(path, diameter):
    src = Image.open(path).convert("RGBA")
    # The painted medallions already sit in a circle; scale then mask.
    src = src.resize((diameter, diameter), Image.Resampling.LANCZOS)
    mask = Image.new("L", (diameter, diameter), 0)
    md = ImageDraw.Draw(mask)
    inset = max(2, diameter // 48)
    md.ellipse((inset, inset, diameter - 1 - inset, diameter - 1 - inset), fill=255)
    # Soft edge so the orb sits in the dark
    mask = mask.filter(ImageFilter.GaussianBlur(1.4))
    out = Image.new("RGBA", (diameter, diameter), (0, 0, 0, 0))
    out.paste(src, (0, 0))
    out.putalpha(mask)
    return out


def orb_with_glow(portrait, glow_pad=36):
    d = portrait.size[0]
    canvas = Image.new("RGBA", (d + glow_pad * 2, d + glow_pad * 2), (0, 0, 0, 0))
    glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    # Cool steel rim glow
    gd.ellipse(
        (glow_pad - 8, glow_pad - 8, glow_pad + d + 8, glow_pad + d + 8),
        fill=(184, 196, 206, 70),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(18))
    canvas = Image.alpha_composite(canvas, glow)
    # Thin steel ring
    ring = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    rd = ImageDraw.Draw(ring)
    rd.ellipse(
        (glow_pad - 2, glow_pad - 2, glow_pad + d + 1, glow_pad + d + 1),
        outline=(184, 196, 206, 150),
        width=3,
    )
    ring = ring.filter(ImageFilter.GaussianBlur(0.6))
    canvas = Image.alpha_composite(canvas, ring)
    canvas.paste(portrait, (glow_pad, glow_pad), portrait)
    return canvas


def draw_crystal(size, cx, cy, scale=1.0):
    """Faceted elongated shard with cool steel rim light."""
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    glow = Image.new("RGBA", size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    h = 248 * scale
    w = 108 * scale
    gd.polygon(
        [
            (cx, cy - h - 36),
            (cx + w + 28, cy),
            (cx, cy + h + 36),
            (cx - w - 28, cy),
        ],
        fill=(184, 196, 206, 80),
    )
    gd.ellipse(
        (cx - 70 * scale, cy - 70 * scale, cx + 70 * scale, cy + 70 * scale),
        fill=(236, 236, 232, 40),
    )
    glow = glow.filter(ImageFilter.GaussianBlur(34))
    layer = Image.alpha_composite(layer, glow)

    d = ImageDraw.Draw(layer)
    top = (cx, cy - h)
    bot = (cx, cy + h)
    right = (cx + w, cy + 10)
    left = (cx - w, cy + 16)
    mid_r = (cx + w * 0.42, cy - h * 0.08)
    mid_l = (cx - w * 0.18, cy + h * 0.06)

    d.polygon([top, left, bot], fill=(72, 78, 84, 255))
    d.polygon([top, right, bot], fill=(176, 188, 198, 255))
    d.polygon([top, mid_l, bot], fill=(112, 118, 124, 230))
    d.polygon([top, mid_r, (cx + w * 0.08, cy + h * 0.28)], fill=(236, 236, 232, 230))
    # Core spark
    d.polygon(
        [
            (cx, cy - h * 0.22),
            (cx + w * 0.16, cy + 4),
            (cx, cy + h * 0.18),
            (cx - w * 0.08, cy + 6),
        ],
        fill=(236, 236, 232, 90),
    )
    d.line([top, right], fill=(236, 236, 232, 210), width=3)
    d.line([top, left], fill=(184, 196, 206, 160), width=2)
    d.line([right, bot], fill=(138, 142, 148, 170), width=2)
    d.line([left, bot], fill=(64, 68, 72, 210), width=2)
    d.line([top, bot], fill=(220, 224, 228, 100), width=1)
    return layer


def tracked_text_image(text, font, fill, tracking, shadow=True):
    # Measure
    dummy = Image.new("RGBA", (8, 8), (0, 0, 0, 0))
    dd = ImageDraw.Draw(dummy)
    widths = [dd.textlength(ch, font=font) for ch in text]
    total = sum(widths) + tracking * (len(text) - 1)
    bbox = font.getbbox(text[0] if text else "X")
    height = bbox[3] - bbox[1] + 16
    pad = 28
    img = Image.new("RGBA", (int(total) + pad * 2, height + pad * 2), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    x = pad
    y = pad - bbox[1]
    if shadow:
        sx = x
        for ch, w in zip(text, widths):
            draw.text((sx + 1, y + 3), ch, font=font, fill=(7, 8, 9, 210))
            sx += w + tracking
        img = img.filter(ImageFilter.GaussianBlur(1.2))
        draw = ImageDraw.Draw(img)
    for ch, w in zip(text, widths):
        draw.text((x, y), ch, font=font, fill=fill)
        x += w + tracking
    return img


def vignette(size, strength=0.55):
    w, h = size
    import numpy as np

    ys, xs = np.ogrid[0:h, 0:w]
    cx, cy = (w - 1) / 2.0, (h - 1) / 2.0
    nx = (xs - cx) / (w * 0.52)
    ny = (ys - cy) / (h * 0.55)
    r = np.sqrt(nx * nx + ny * ny)
    t = np.clip((r - 0.72) / 0.55, 0, 1)
    alpha = (255 * strength * t * t).astype(np.uint8)
    overlay = Image.new("RGBA", size, (7, 8, 9, 0))
    overlay.putalpha(Image.fromarray(alpha, "L"))
    return overlay


def film_grain(size, amount=8):
    import numpy as np

    w, h = size
    rng = np.random.default_rng(1337)
    noise = rng.integers(128 - amount, 128 + amount + 1, size=(h, w), dtype=np.int16)
    grain = np.clip(noise, 0, 255).astype(np.uint8)
    alpha = np.full((h, w), 18, dtype=np.uint8)
    arr = np.dstack([grain, grain, grain, alpha])
    return Image.fromarray(arr, "RGBA")


def compose():
    # Inner glow slightly cooler/lighter than near-black
    bg = radial_background((W, H), (18, 22, 26, 255), NEAR_BLACK)
    cx, cy = W / 2, H / 2

    # Orbit ring
    orbit = glow_ellipse((W, H), cx, cy, 820, 410, (184, 196, 206), blur=6, strength=1.1)
    bg = Image.alpha_composite(bg, orbit)
    orbit2 = glow_ellipse((W, H), cx, cy, 820, 410, (184, 196, 206), blur=22, strength=0.7)
    bg = Image.alpha_composite(bg, orbit2)

    # Crystal first (behind lockup, in front of void)
    crystal = draw_crystal((W, H), cx, cy - 28, scale=1.12)
    bg = Image.alpha_composite(bg, crystal)

    # Portraits in a 22.5°-offset ring so N/E/S/W stay open for the lockup
    n = len(PORTRAITS)
    rx, ry = 820.0, 410.0
    diameter = 288
    for i, path in enumerate(PORTRAITS):
        ang = math.radians(22.5 + i * (360.0 / n))
        x = cx + rx * math.cos(ang)
        y = cy + ry * math.sin(ang)
        orb = orb_with_glow(circle_portrait(path, diameter), glow_pad=40)
        ox, oy = orb.size
        bg.alpha_composite(orb, (int(x - ox / 2), int(y - oy / 2)))

    # Dark scrim behind the lockup so type stays ivory-crisp
    scrim = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scrim)
    sd.ellipse((cx - 520, cy - 210, cx + 520, cy + 250), fill=(7, 8, 9, 150))
    scrim = scrim.filter(ImageFilter.GaussianBlur(42))
    bg = Image.alpha_composite(bg, scrim)

    # Title lockup — centered, tracked, editorial
    title_font = ImageFont.truetype(SERIF_BOLD, 228)
    tag_font = ImageFont.truetype(SANS_NARROW, 38)
    title = tracked_text_image("VESPER", title_font, IVORY, tracking=52, shadow=True)
    tag = tracked_text_image(
        "The last circle of names.",
        tag_font,
        (168, 174, 180, 255),
        tracking=12,
        shadow=True,
    )

    # Hairline under the title
    lockup_w = max(title.size[0], tag.size[0])
    lockup_h = title.size[1] + 8 + 2 + 18 + tag.size[1]
    lockup = Image.new("RGBA", (lockup_w, lockup_h), (0, 0, 0, 0))
    tx = (lockup_w - title.size[0]) // 2
    lockup.alpha_composite(title, (tx, 0))
    line_y = title.size[1] - 10
    ld = ImageDraw.Draw(lockup)
    lw = int(lockup_w * 0.42)
    ld.line(
        ((lockup_w - lw) // 2, line_y, (lockup_w + lw) // 2, line_y),
        fill=(184, 196, 206, 140),
        width=2,
    )
    gx = (lockup_w - tag.size[0]) // 2
    lockup.alpha_composite(tag, (gx, line_y + 16))

    lx = int(cx - lockup.size[0] / 2)
    ly = int(cy - lockup.size[1] / 2 + 28)
    bg.alpha_composite(lockup, (lx, ly))

    bg = Image.alpha_composite(bg, vignette((W, H), strength=0.62))
    bg = Image.alpha_composite(bg, film_grain((W, H), amount=7))

    # Slight contrast
    rgb = bg.convert("RGB")
    rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
    rgb = ImageEnhance.Color(rgb).enhance(0.92)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    rgb.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} {rgb.size}")


if __name__ == "__main__":
    compose()
