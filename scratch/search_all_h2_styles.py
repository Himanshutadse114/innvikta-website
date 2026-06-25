import glob
import re

files = glob.glob("styles/**/*.scss", recursive=True) + glob.glob("styles/**/*.css", recursive=True)

for filepath in files:
    with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    # Search for h2 selector or 52-heading
    matches = re.finditer(r'(?:h2|\.text-52-heading)[^{}]*\{[^{}]*\}', content, re.IGNORECASE)
    for match in matches:
        print(f"File: {filepath}")
        print(f"Match: {match.group(0).strip()}")
        print("-" * 40)
