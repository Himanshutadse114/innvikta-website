with open("styles/insat.scss", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "h2" in line.split("//")[0]: # Ignore comments
        print(f"Line {i+1}: {line.strip()}")
