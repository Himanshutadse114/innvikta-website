import re

pages = {
    "insat": ("app/solutions/insat/page.js", [
        "Security Awareness Training",
        "Gamified",
        "AI Adaptive Learning",
        "Microlearning"
    ]),
    "phishing": ("app/solutions/phishing-simulation/page.js", [
        "Multichannel Simulation",
        "Vishing Tests",
        "AI Scenario Variants",
        "Custom Campaign Builder",
        "Reports & Insights"
    ]),
    "human": ("app/solutions/human-risk-intelligence/page.js", [
        "Risk Scoring",
        "Heatmap",
        "Executive Reporting",
        "Pre/Post Analysis",
        "Capabilities"
    ]),
    "compliance": ("app/solutions/compliance-training/page.js", [
        "Compliance Training Suite",
        "Acknowledgement Tracking",
        "Refresher",
        "Audit-Ready Evidence"
    ]),
    "custom": ("app/solutions/customized-solutions/page.js", [
        "Industry-Specific",
        "Departmental",
        "Executive Risk",
        "Culture Benchmark",
        "Paths",
        "BFSI"
    ]),
}

for name, (path, keywords) in pages.items():
    print(f"================ {name.upper()} ({path}) ================")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    
    lines = content.splitlines()
    for kw in keywords:
        found = False
        for idx, line in enumerate(lines):
            if kw.lower() in line.lower():
                print(f"Keyword: '{kw}' at line {idx+1}:")
                start = max(0, idx - 3)
                end = min(len(lines), idx + 5)
                for l_no in range(start, end):
                    print(f"  {l_no+1:4d}: {lines[l_no]}")
                print("-" * 50)
                found = True
        if not found:
            print(f"Keyword: '{kw}' NOT FOUND")
            print("-" * 50)
    print("\n")
