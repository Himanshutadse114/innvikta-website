import re
from bs4 import BeautifulSoup

def clean_html_for_comparison(html_str):
    # Convert React className to class, self-closing tags to regular, etc.
    html_str = html_str.replace("className=", "class=")
    html_str = html_str.replace("activeFaq === 0 ? 'active' : ''", "active")
    html_str = html_str.replace("activeFaq === 1 ? 'active' : ''", "active")
    html_str = html_str.replace("activeFaq === 2 ? 'active' : ''", "active")
    html_str = html_str.replace("activeFaq === 3 ? 'active' : ''", "active")
    html_str = html_str.replace("{activeFaq === 0}", "true")
    html_str = html_str.replace("{activeFaq === 1}", "true")
    html_str = html_str.replace("{activeFaq === 2}", "true")
    html_str = html_str.replace("{activeFaq === 3}", "true")
    html_str = html_str.replace("src={", "src=\"")
    html_str = html_str.replace("href={", "href=\"")
    # remove inline React styles
    html_str = re.sub(r'style=\{\{[^}]*\}\}', '', html_str)
    return html_str

def main():
    original_html_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\Insat\index.html"
    react_page_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\app\solutions\insat\page.js"
    
    with open(original_html_path, "r", encoding="utf-8") as f:
        orig_html = f.read()
        
    with open(react_page_path, "r", encoding="utf-8") as f:
        react_code = f.read()
        
    # Extract the returned JSX from page.js
    # We look for the main return statement
    match = re.search(r'return\s*\(\s*(<div className="insat-page">.*)\s*\);\s*\}', react_code, re.DOTALL)
    if not match:
        print("Could not find JSX return in page.js!")
        return
        
    react_jsx = match.group(1)
    react_jsx_cleaned = clean_html_for_comparison(react_jsx)
    
    soup_orig = BeautifulSoup(orig_html, "html.parser")
    soup_react = BeautifulSoup(react_jsx_cleaned, "html.parser")
    
    orig_sections = soup_orig.find_all("section")
    react_sections = soup_react.find_all("section")
    
    print(f"Original sections count: {len(orig_sections)}")
    print(f"React sections count: {len(react_sections)}")
    
    for i in range(max(len(orig_sections), len(react_sections))):
        print(f"\n================ SECTION {i+1} ================")
        if i < len(orig_sections):
            o_sec = orig_sections[i]
            o_class = o_sec.get("class", [])
            print(f"[Original] Class: {o_class}")
        else:
            print("[Original] MISSING")
            
        if i < len(react_sections):
            r_sec = react_sections[i]
            r_class = r_sec.get("class", [])
            print(f"[React   ] Class: {r_class}")
        else:
            print("[React   ] MISSING")
            
        if i < len(orig_sections) and i < len(react_sections):
            # Compare some key elements
            o_h2 = o_sec.find_all("h2")
            r_h2 = r_sec.find_all("h2")
            print(f"[Original] H2 count: {len(o_h2)}, Texts: {[h.text.strip() for h in o_h2]}")
            print(f"[React   ] H2 count: {len(r_h2)}, Texts: {[h.text.strip() for h in r_h2]}")
            
            o_imgs = o_sec.find_all("img")
            r_imgs = r_sec.find_all("img")
            print(f"[Original] Img count: {len(o_imgs)}, Srcs: {[img.get('src') for img in o_imgs]}")
            print(f"[React   ] Img count: {len(r_imgs)}, Srcs: {[img.get('src') for img in r_imgs]}")
            
            o_svgs = o_sec.find_all("svg")
            r_svgs = r_sec.find_all("svg")
            print(f"[Original] SVG count: {len(o_svgs)}")
            print(f"[React   ] SVG count: {len(r_svgs)}")

if __name__ == "__main__":
    main()
