import urllib.request
import re
import json

folder_id = "1cAzYRkD3vgHtIajVSfz98952lGZDDo57"
url = f"https://drive.google.com/drive/folders/{folder_id}"

req = urllib.request.Request(
    url,
    headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    }
)

try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        with open("drive_folder.html", "w", encoding="utf-8") as f:
            f.write(html)
        print("Wrote drive_folder.html, length:", len(html))
except Exception as e:
    print("Error:", e)
