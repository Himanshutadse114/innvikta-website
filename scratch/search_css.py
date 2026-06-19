with open("styles/insat.scss", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines, 1):
    if "arrow-link" in line:
        print(f"Line {i}: {line.strip()}")
