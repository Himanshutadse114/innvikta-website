import re
from bs4 import BeautifulSoup

def audit():
    html_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\Insat\index.html"
    with open(html_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    soup = BeautifulSoup(html_content, "html.parser")
    
    print("--- HEAD ELEMENTS ---")
    title = soup.find("title")
    if title:
        print(f"Title: {title.text}")
    
    meta_tags = soup.find_all("meta")
    for meta in meta_tags:
        if meta.get("name"):
            print(f"Meta Name={meta.get('name')}: {meta.get('content')}")
        elif meta.get("property"):
            print(f"Meta Property={meta.get('property')}: {meta.get('content')}")
            
    print("\n--- BODY SECTION TAGS & CLASSES ---")
    sections = soup.find_all("section")
    print(f"Total sections found: {len(sections)}")
    for i, sec in enumerate(sections, 1):
        classes = sec.get("class", [])
        h2 = sec.find("h2")
        h2_text = h2.text.strip() if h2 else "None"
        print(f"Section {i}: Class={classes}, H2='{h2_text}'")
        
    print("\n--- HEADER/NAV OR OTHER SIGNIFICANT IDS ---")
    # Let's check for langSelector or mobileMenuBtn
    lang_sel = soup.find(id="langSelector")
    print(f"langSelector found: {lang_sel is not None}")
    mobile_btn = soup.find(id="mobileMenuBtn")
    print(f"mobileMenuBtn found: {mobile_btn is not None}")
    
    footer = soup.find("footer")
    print(f"footer tag found: {footer is not None}")

if __name__ == "__main__":
    audit()
