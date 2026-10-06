import re
import json

with open("drive_folder.html", "r", encoding="utf-8") as f:
    html = f.read()

# In Google Drive, window['_DRIVE_ivd'] contains the folder item list
# Let's extract the ivd block
ivd_match = re.search(r'window\[\'_DRIVE_ivd\'\]\s*=\s*\'(.*?)\';', html)
if ivd_match:
    ivd_raw = ivd_match.group(1)
    # decode \x escapes
    decoded = bytes(ivd_raw, "utf-8").decode("unicode_escape")
    try:
        data = json.loads(decoded)
        print("Successfully parsed ivd json!")
        for item in data:
            if isinstance(item, list) and len(item) > 2:
                file_id = item[0]
                name = item[2]
                mime = item[3] if len(item) > 3 else "unknown"
                print(f"File: ID={file_id}, Name={name}, Mime={mime}")
    except Exception as e:
        print("JSON load error:", e)
        # Search using regex in decoded string
        matches = re.findall(r'\["([a-zA-Z0-9_-]{28,35})",\["[^"]*"\],"([^"]+)"', decoded)
        print("Regex matches in decoded ivd:", len(matches))
        for m in matches:
            print(m)
else:
    print("ivd not found, searching with regex in raw html")
    matches = re.findall(r'\\x22([a-zA-Z0-9_-]{28,35})\\x22,\x5b\\x22[^\\]*\\x22\x5d,\\x22([^\\]+)\\x22', html)
    print("Matches:", len(matches))
    for m in matches:
        print(m)
