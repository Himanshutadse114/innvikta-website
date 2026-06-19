import os

for root, _, files in os.walk("."):
    if "node_modules" in root or ".next" in root or ".git" in root:
        continue
    for file in files:
        if file.endswith((".js", ".jsx", ".ts", ".tsx", ".scss", ".css")):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                if "blur" in content.lower() or "banner-img" in content.lower():
                    print(f"Found in: {path}")
                    for idx, line in enumerate(content.splitlines()):
                        if "blur" in line.lower() or "banner-img" in line.lower():
                            print(f"  {idx+1}: {line.strip()}")
            except Exception:
                pass
