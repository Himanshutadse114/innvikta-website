import os

terms = [
    # Solutions -> InSAT
    "Security Awareness Training",
    "Interactive Gamified Arcade",
    "AI Adaptive Learning",
    "Microlearning",
    # Solutions -> Phishing Simulation
    "Multi Vector Attack",
    "Vishing Simulation",
    "Audience Segmentation",
    "AI-Led Scenario Variants",
    # Solutions -> Human Risk Intelligence
    "Risk Scoring",
    "Department Heatmaps",
    "Executive Reporting",
    "Pre/Post Analysis",
    # Solutions -> Compliance Training
    "Compliance Learning Suite",
    "Acknowledgement Tracking",
    "Refresher Campaigns",
    "Audit-Ready Evidence",
    # Solutions -> Customized Solutions
    "Industry-Specific Portals",
    "Departmental Learning Paths",
    "Executive Risk Management",
    "Culture Benchmark Studies",
]

def search_files(dirs):
    matches = {}
    for d in dirs:
        for root, _, files in os.walk(d):
            for file in files:
                if file.endswith((".js", ".jsx", ".ts", ".tsx", ".md")):
                    filepath = os.path.join(root, file)
                    try:
                        with open(filepath, "r", encoding="utf-8") as f:
                            content = f.read()
                        for term in terms:
                            if term.lower() in content.lower():
                                if term not in matches:
                                    matches[term] = []
                                matches[term].append(filepath)
                    except Exception as e:
                        pass
    return matches

if __name__ == "__main__":
    results = search_files(["app", "layouts"])
    for term, files in sorted(results.items()):
        print(f"Term: {term}")
        for file in sorted(set(files)):
            print(f"  - {file}")
