import re

with open("styles/insat.scss", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "52-heading" in line:
        print(f"Line {i+1}: {line.strip()}")
