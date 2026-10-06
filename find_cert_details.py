import re

with open("drive_folder.html", "r", encoding="utf-8") as f:
    html = f.read()

# Look for each filename and nearby Drive ID
target_files = [
    'CN-certificate .pdf',
    'IMG_7963.JPG',
    'SAP .pdf',
    'Ibm skill-build .pdf',
    'Dbms certificate .png',
    'Nptel ml.pdf',
    'forage_certificate.pdf',
    'Algo un-cert.png'
]

print("Target files found in HTML:")
for fn in target_files:
    pos = 0
    print(f"\n--- Looking for {fn} ---")
    while True:
        idx = html.find(fn, pos)
        if idx == -1:
            break
        context = html[max(0, idx-300):min(len(html), idx+300)]
        # find drive IDs in context
        ids = re.findall(r'[a-zA-Z0-9_-]{28,35}', context)
        print(f"Context around {fn}:")
        print(context)
        print(f"IDs in context: {ids}")
        pos = idx + len(fn)

# Also check for any other file names (like 9th file)
# Search for .pdf, .jpg, .png, .jpeg in entire html
all_matches = re.findall(r'(\[[^\]]*?\.(?:pdf|png|jpg|jpeg|JPG|PNG)[^\]]*?\])', html)
print("\nJSON blocks with extensions:")
for b in all_matches[:20]:
    print(b)
