import os
import re

files_to_check = [
    "app/solutions/insat/page.js",
    "app/solutions/phishing-simulation/page.js",
    "app/solutions/human-risk-intelligence/page.js",
    "app/solutions/compliance-training/page.js",
    "app/solutions/customized-solutions/page.js",
]

for filepath in files_to_check:
    print(f"=== File: {filepath} ===")
    if not os.path.exists(filepath):
        print("  File not found!")
        continue
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Let's search for h1, h2, h3 tags or text that looks like headers
    headings = re.findall(r'<(h1|h2|h3|h4|section)[^>]*>(.*?)</\1>', content, re.DOTALL)
    print(f"Found {len(headings)} elements:")
    for tag, text in headings[:25]:  # print first 25
        clean_text = re.sub(r'<[^>]+>', '', text).strip()
        clean_text = re.sub(r'\s+', ' ', clean_text)
        print(f"  <{tag}>: {clean_text[:60]}")
    print()
