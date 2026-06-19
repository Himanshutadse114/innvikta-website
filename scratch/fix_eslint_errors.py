def main():
    page_path = r"c:\Users\ADMIN\Downloads\next-js-website - Copy (1)\next-js-website - Copy\app\page.js"
    
    with open(page_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Replace unescaped single quotes/apostrophes
    content = content.replace("user's", "user&apos;s")
    
    # Fix target="_blank" without rel="noopener noreferrer"
    content = content.replace('target="_blank"', 'target="_blank" rel="noopener noreferrer"')
    
    with open(page_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    print("ESLint fixes applied successfully to app/page.js.")

if __name__ == "__main__":
    main()
