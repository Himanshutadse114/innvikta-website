import re

def main():
    html_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\Insat\index.html"
    
    with open(html_path, "r", encoding="utf-8") as f:
        html = f.read()
        
    main_match = re.search(r"<main[^>]*>(.*?)</main>", html, re.DOTALL)
    if not main_match:
        print("Could not find <main> block")
        return
        
    body = main_match.group(1)
    
    # Use word boundary \b to prevent matching prefixes like "linearGradient" with "line"
    def close_tag(tag_name):
        nonlocal body
        pattern = rf"<({tag_name})\b([^>]*)(?<!/)>"
        body = re.sub(pattern, rf"<\1\2 />", body)
        
    for t in ["img", "br", "source", "line", "circle", "path", "rect", "stop"]:
        close_tag(t)
        
    body = re.sub(r'\bclass="', 'className="', body)
    
    def style_replacer(match):
        style_str = match.group(1)
        pairs = [p.strip() for p in style_str.split(";") if p.strip()]
        js_pairs = []
        for p in pairs:
            if ":" not in p:
                continue
            k, v = p.split(":", 1)
            k = k.strip()
            v = v.strip()
            k_camel = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            js_pairs.append(f"{k_camel}: \"{v}\"")
        return "style={{" + ", ".join(js_pairs) + "}}"
        
    body = re.sub(r'style="([^"]*)"', style_replacer, body)
    
    attr_map = {
        "stroke-width": "strokeWidth",
        "stroke-linecap": "strokeLinecap",
        "stroke-linejoin": "strokeLinejoin",
        "stroke-dasharray": "strokeDasharray",
        "stroke-dashoffset": "strokeDashoffset",
        "transform-box": "transformBox",
        "transform-origin": "transformOrigin",
        "font-size": "fontSize",
        "font-weight": "fontWeight",
        "font-family": "fontFamily",
        "viewbox": "viewBox",
        "crossorigin": "crossOrigin",
        "autoplay": "autoPlay",
        "playsinline": "playsInline",
        "loop": "loop",
        "muted": "muted",
        "fill-opacity": "fillOpacity",
        "stop-color": "stopColor",
    }
    
    for html_attr, jsx_attr in attr_map.items():
        body = re.sub(rf'\b{html_attr}=', f'{jsx_attr}=', body)
        
    body = re.sub(r"<!--.*?-->", "", body)
    
    body = body.replace('src="assets/', 'src="/insat/')
    body = body.replace('href="demo/index.html"', 'href="/demo"')
    body = body.replace('href="contact-us/index.html"', 'href="/contact"')
    body = body.replace('href="invoice-financing/index.html"', 'href="/solutions/insat"')
    body = body.replace('href="protection/index.html"', 'href="/solutions/insat"')
    body = body.replace('href="risk-scoring/index.html"', 'href="/solutions/insat"')
    body = body.replace('href="customers/malt/index.html"', 'href="/solutions/insat"')
    body = body.replace('href="testimonials/2/index.html"', 'href="/solutions/insat"')
    
    temp_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\styles\temp_jsx_body.txt"
    with open(temp_path, "w", encoding="utf-8") as f:
        f.write(body)
        
    print("JSX body conversion complete with \b boundary fixes.")

if __name__ == "__main__":
    main()
