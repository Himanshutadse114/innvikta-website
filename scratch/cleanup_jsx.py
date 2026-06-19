import re

def main():
    temp_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\styles\temp_jsx_body.txt"
    
    with open(temp_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Remove duplicate closing tags for self-closed tags
    tags = ["path", "line", "circle", "rect", "stop", "source", "img", "br"]
    for tag in tags:
        # Match <tag ... /> ... </tag> and replace with <tag ... />
        # We can use sub with regex
        pattern = rf"(<{tag}\b[^>]*/>)\s*</{tag}>"
        content = re.sub(pattern, r"\1", content)
        
    # Also double check any remaining </stop> or </path> or </line> or </circle> or </rect> that might not have been matched
    # For example, if there is `<path ... /> </path>` with space, the above handles it.
    
    with open(temp_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("JSX duplicate closing tags cleaned successfully.")

if __name__ == "__main__":
    main()
