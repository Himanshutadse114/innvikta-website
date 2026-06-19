import os

for file in os.listdir("styles"):
    if file.endswith(".scss"):
        path = os.path.join("styles", file)
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        for idx, line in enumerate(content.splitlines()):
            if ".banner" in line or "banner-img" in line or "banner_img" in line:
                print(f"{file}:{idx+1}: {line.strip()}")
