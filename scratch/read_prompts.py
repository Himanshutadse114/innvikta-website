import json
import sys
with open(r'C:\Users\ADMIN\.gemini\antigravity-ide\brain\e42ebfd1-fba8-4f25-b173-9a37411f039b\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        if '"type":"USER_INPUT"' in line:
            data = json.loads(line)
            content = data['content']
            if '<USER_REQUEST>' in content:
                req = content.split('<USER_REQUEST>')[1].split('</USER_REQUEST>')[0].strip()
                print(f"Step {data['step_index']}: {req}")
