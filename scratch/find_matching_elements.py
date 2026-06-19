import re

files = {
    "insat": "app/solutions/insat/page.js",
    "phishing": "app/solutions/phishing-simulation/page.js",
    "human": "app/solutions/human-risk-intelligence/page.js",
    "compliance": "app/solutions/compliance-training/page.js",
    "custom": "app/solutions/customized-solutions/page.js",
}

for name, path in files.items():
    print(f"=== {name}: {path} ===")
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    for i, line in enumerate(lines):
        # search for potential headers, sections, or keywords
        if any(kw in line.lower() for kw in ["section", "h2", "h3", "h4", "card", "title"]):
            print(f"Line {i+1}: {line.strip()[:100]}")
    print()
