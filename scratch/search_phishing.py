with open("app/solutions/phishing-simulation/page.js", "r", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if any(term in line.lower() for term in ["vishing", "multi", "audience", "variant", "campaign", "variant", "attack"]):
        print(f"{i+1}: {line.strip()}")
