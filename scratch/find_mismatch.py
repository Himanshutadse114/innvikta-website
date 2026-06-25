def check_tags(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()
    
    import re
    # We exclude '/' from the attributes part to avoid capturing it there
    tag_regex = re.compile(r'<(/?[a-zA-Z0-9_\-]+)(?:\s+[^/>]*?)?(/?)>')
    
    stack = []
    lines = content.split('\n')
    
    for line_idx, line in enumerate(lines):
        line_num = line_idx + 1
        for match in tag_regex.finditer(line):
            tag_name = match.group(1)
            is_self_closing = match.group(2) == '/'
            
            if tag_name.startswith('!') or tag_name.startswith('?'):
                continue
                
            if is_self_closing:
                continue
                
            if tag_name.startswith('/'):
                name = tag_name[1:]
                if not stack:
                    print(f"Line {line_num}: Extra closing tag </{name}>")
                    continue
                last_name, last_line = stack.pop()
                if last_name != name:
                    print(f"Line {line_num}: Mismatch! Closed </{name}> but expected </{last_name}> (opened at line {last_line})")
                    stack.append((last_name, last_line))
            else:
                stack.append((tag_name, line_num))
                
    if stack:
        print("Unclosed tags remaining on stack:")
        for name, line in stack:
            print(f"  <{name}> opened at line {line}")

check_tags('app/resources/simulation-roi/page.js')
