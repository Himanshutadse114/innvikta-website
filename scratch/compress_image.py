from PIL import Image
import os

img_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\public\images\og-image.png"
output_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\public\images\og-image.jpg"

img = Image.open(img_path)
if img.mode in ('RGBA', 'LA'):
    background = Image.new(img.mode[:-1], img.size, (255, 255, 255))
    background.paste(img, img.split()[-1])
    img = background

img.save(output_path, "JPEG", quality=80, optimize=True)
print(f"Compressed image size: {os.path.getsize(output_path)} bytes")
