from PIL import Image, ImageDraw, ImageFont
import os

STORY_W, STORY_H = 1080, 1920
BG_COLOR = (18, 18, 18)         # near-black matching the cards
GOLD = (196, 160, 96)

output_dir = os.path.expanduser("~/Desktop")

labels = [
    "commercial",
    "portraits",
    "couples",
]

for i, label in enumerate(labels, start=1):
    src_path = f"/Users/cliffordroberts/.openclaw/workspace/story_src_{i}.png"
    card = Image.open(src_path).convert("RGBA")
    cw, ch = card.size

    # Scale card to fit within 90% of story width, preserving aspect ratio
    max_card_w = int(STORY_W * 0.90)
    scale = max_card_w / cw
    new_cw = int(cw * scale)
    new_ch = int(ch * scale)
    card_resized = card.resize((new_cw, new_ch), Image.LANCZOS)

    # Create story canvas
    story = Image.new("RGBA", (STORY_W, STORY_H), BG_COLOR + (255,))
    draw = ImageDraw.Draw(story)

    # Subtle gold top bar
    draw.rectangle([0, 0, STORY_W, 6], fill=GOLD + (255,))
    draw.rectangle([0, STORY_H - 6, STORY_W, STORY_H], fill=GOLD + (255,))

    # Center card with safe zones (top ~250px, bottom ~350px for IG UI)
    safe_top = 250
    safe_bottom = 350
    usable_h = STORY_H - safe_top - safe_bottom
    card_x = (STORY_W - new_cw) // 2
    card_y = safe_top + (usable_h - new_ch) // 2

    story.alpha_composite(card_resized, dest=(card_x, card_y))

    # Bottom branding text
    try:
        font_sm = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
        font_brand = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 38)
    except:
        font_sm = ImageFont.load_default()
        font_brand = font_sm

    brand = "SAINT'S TOUCH PHOTOGRAPHY"
    handle = "@saintstouch.photo"
    site = "saintstouch.photography"

    def centered_text(draw, y, text, font, color):
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        draw.text(((STORY_W - tw) // 2, y), text, font=font, fill=color)

    brand_y = card_y + new_ch + 48
    centered_text(draw, brand_y, brand, font_brand, (230, 215, 185))
    centered_text(draw, brand_y + 52, handle, font_sm, GOLD)
    centered_text(draw, brand_y + 96, site, font_sm, (160, 150, 135))

    # Save as RGB PNG
    out_path = os.path.join(output_dir, f"story_{label}.png")
    story.convert("RGB").save(out_path, "PNG")
    print(f"Saved: {out_path}")

print("Done.")
