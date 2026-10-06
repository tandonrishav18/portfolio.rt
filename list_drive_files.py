import re
import json

with open("drive_folder.html", "r", encoding="utf-8") as f:
    html = f.read()

ivd_match = re.search(r'window\[\'_DRIVE_ivd\'\]\s*=\s*\'(.*?)\';', html)
if ivd_match:
    ivd_raw = ivd_match.group(1)
    decoded = bytes(ivd_raw, "utf-8").decode("unicode_escape")
    data = json.loads(decoded)
    print(f"Total entries: {len(data)}")
    for idx, item in enumerate(data):
        if isinstance(item, list):
            file_id = item[0]
            folder_id = item[1] if len(item) > 1 else None
            filename = item[2] if len(item) > 2 else "unknown"
            mime = item[3] if len(item) > 3 else "unknown"
            print(f"[{idx+1}] FileID: {file_id} | Name: {filename} | Mime: {mime}")
