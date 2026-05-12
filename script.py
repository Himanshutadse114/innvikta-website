import sys
from PIL import Image
import os

def process_image(img_path, num_slices, prefix):
    try:
        img = Image.open(img_path).convert("RGBA")
        data = img.getdata()
        
        bg_color = data[0]
        
        new_data = []
        for item in data:
            if abs(item[0] - bg_color[0]) < 20 and abs(item[1] - bg_color[1]) < 20 and abs(item[2] - bg_color[2]) < 20:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
                
        img.putdata(new_data)
        
        width, height = img.size
        slice_width = width // num_slices
        
        out_dir = "C:\\Users\\ADMIN\\Downloads\\next-js-website\\public\\images\\brands"
        
        for i in range(num_slices):
            left = i * slice_width
            right = (i + 1) * slice_width
            slice_img = img.crop((left, 0, right, height))
            
            bbox = slice_img.getbbox()
            if bbox:
                slice_img = slice_img.crop(bbox)
                
            out_path = os.path.join(out_dir, f"{prefix}_{i}.png")
            slice_img.save(out_path, "PNG")
            print(f"Saved {out_path}")
            
    except Exception as e:
        print(f"Error processing {img_path}: {e}")

process_image("C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\aef6e69c-b5bd-4077-8ea5-f004e044fa3f\\media__1778591538275.png", 5, "batch1")
process_image("C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\aef6e69c-b5bd-4077-8ea5-f004e044fa3f\\media__1778591540865.png", 5, "batch2")
process_image("C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\aef6e69c-b5bd-4077-8ea5-f004e044fa3f\\media__1778591732127.png", 4, "batch3")
