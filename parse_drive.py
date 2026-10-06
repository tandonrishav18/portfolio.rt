import re

with open("drive_folder.html", "r", encoding="utf-8") as f:
    html = f.read()

# Look for patterns
# Google Drive folders embed item lists in JS variables or JSON
# e.g. [null,"1...", "title.png", "image/png"]
items = re.findall(r'\["([a-zA-Z0-9_-]{28,40})",\["([^"]+)"', html)
print("Items with filenames pattern 1:", len(items))
for item in items:
    print(item)

# Try another regex for file metadata
matches = re.findall(r'\["([a-zA-Z0-9_-]{28,40})",null,null,null,null,null,null,null,null,null,\["([^"]+)"', html)
print("Pattern 2:", len(matches))

# Look for all occurrences of image file extensions
img_names = re.findall(r'[\'"]([^\'"]+\.(?:png|jpg|jpeg|pdf|webp))[\'"]', html, re.IGNORECASE)
print("Image filenames found:", set(img_names))

# Print all 33-char drive IDs
all_ids = set(re.findall(r'["\']([a-zA-Z0-9_-]{33})["\']', html))
print("All 33-char IDs found:", len(all_ids))
for i in list(all_ids)[:20]:
    print(i)
