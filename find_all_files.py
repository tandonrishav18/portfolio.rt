import re
import json

with open("drive_folder.html", "r", encoding="utf-8") as f:
    html = f.read()

# Let us find every file structure in the html
# Pattern: [["<drive_id>",["1cAzYRkD3vgHtIajVSfz98952lGZDDo57"],"filename"
matches = re.findall(r'\["([a-zA-Z0-9_-]{28,35})",\["1cAzYRkD3vgHtIajVSfz98952lGZDDo57"\],"([^"]+)"', html)
print(f"Direct matches count: {len(matches)}")
for m in matches:
    print(m)

# Also check without escaped quotes
matches2 = re.findall(r'([a-zA-Z0-9_-]{28,35}).*?1cAzYRkD3vgHtIajVSfz98952lGZDDo57.*?([a-zA-Z0-9_ -]+\.(?:png|jpg|jpeg|pdf|webp))', html, re.IGNORECASE)
print(f"Matches2 count: {len(matches2)}")
for m in set(matches2):
    print(m)
