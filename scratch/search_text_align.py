import glob
import re

files = glob.glob("styles/**/*.scss", recursive=True) + glob.glob("styles/**/*.css", recursive=True)

for filepath in files:
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()
    
    for i, line in enumerate(lines):
        if "text-align" in line:
            print(f"File: {filepath} | Line {i+1}: {line.strip()}")
