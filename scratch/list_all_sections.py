import os

files = [
    "app/solutions/insat/page.js",
    "app/solutions/phishing-simulation/page.js",
    "app/solutions/human-risk-intelligence/page.js",
    "app/solutions/compliance-training/page.js",
    "app/solutions/customized-solutions/page.js",
]

for filepath in files:
    print(f"=== File: {filepath} ===")
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()
    
    for i, line in enumerate(lines):
        if "<section" in line:
            # find the next few lines or the heading within this section
            print(f"  Line {i+1}: {line.strip()}")
            # print next 10 lines to see if there's a heading or text
            for j in range(1, 10):
                if i + j < len(lines):
                    next_l = lines[i+j].strip()
                    if next_l:
                        print(f"    +{j}: {next_l}")
            print("-" * 30)
    print()
