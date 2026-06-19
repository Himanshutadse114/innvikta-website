from PIL import Image
import os

img_path = r"C:\Users\ADMIN\.gemini\antigravity-ide\brain\e0b335ad-f46d-4a68-b341-718e33f3597d\media__1781152407173.png"
output_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\public\images\og-image.jpg"

img = Image.open(img_path)
if img.mode in ('RGBA', 'LA'):
    background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
    background.paste(img, img.split()[-1])
    img = background

# Save with 85% quality to keep it compressed and look great
img.save(output_path, "JPEG", quality=85, optimize=True)
print(f"Saved and compressed: {os.path.getsize(output_path)} bytes")
