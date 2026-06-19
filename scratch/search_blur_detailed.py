import os

files_to_check = []
for root, _, files in os.walk("."):
    if "node_modules" in root or ".next" in root or ".git" in root or "threatcop.com" in root or "build-test" in root:
        continue
    for file in files:
        if file.endswith((".scss", ".css", ".js", ".jsx")):
            files_to_check.append(os.path.join(root, file))

for path in files_to_check:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if "blur" in content.lower():
        for idx, line in enumerate(content.splitlines()):
            if "blur" in line.lower():
                print(f"{path}:{idx+1}: {line.strip()}")
