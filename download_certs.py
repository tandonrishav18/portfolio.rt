import urllib.request
import re

files_info = [
    ("1B6jV8_d8iL-x77K5L0q5vh6fV-L4RJXJ", "IMG_7963.JPG"),
    ("1aYiP2juN08-0SeTOp2m2wRUtDAYEiYGB", "SAP.pdf"),
    ("1wMYn9bperzupvCQ-fjcvYy-FDNVzvQMy", "Ibm_skill_build.pdf"),
    ("1VlHWCb7u85PLnPa4JPb2LtcqhfY6Ku67", "Dbms_certificate.png"),
    ("1dv78qbLCPSfbQBl-25z42tgWHJqoYv1H", "Nptel_ml.pdf"),
    ("1MIia_zl5Z7sE-Kp66j05cb-7CKnqXo2Y", "Algo_un_cert.png"),
    ("1YNsaI9ItLu_S1I2b1FsNgzLxD_yrOqx8", "CN_certificate.pdf"),
    ("1MQgsnqyq3ZWt5wwF8e5wNMNMmFmMFw5o", "forage_certificate.pdf"),
    ("1rzOwEqYicnPvP6TZ76Io7wZ9Q3Vrl_fU", "ds_certificate.pdf"),
]

print(f"Total files: {len(files_info)}")

for idx, (fid, name) in enumerate(files_info):
    print(f"\n--- Checking File [{idx+1}]: {name} (ID: {fid}) ---")
    
    # Try fetching thumbnail or export / direct preview
    urls_to_try = [
        f"https://drive.google.com/thumbnail?id={fid}&sz=w1600",
        f"https://lh3.googleusercontent.com/d/{fid}=w1600",
        f"https://drive.google.com/uc?export=download&id={fid}"
    ]
    
    downloaded = False
    for url in urls_to_try:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=10) as resp:
                data = resp.read()
                content_type = resp.headers.get("Content-Type", "")
                if len(data) > 2000 and ("image" in content_type or "octet-stream" in content_type or "pdf" in content_type):
                    out_path = f"public/cert_{idx+1}_{fid}.png"
                    # If it is image or we save it
                    with open(out_path, "wb") as f:
                        f.write(data)
                    print(f"Success from {url}! Saved to {out_path}, size: {len(data)}, type: {content_type}")
                    downloaded = True
                    break
                else:
                    print(f"URL {url} returned size {len(data)}, type {content_type}")
        except Exception as e:
            print(f"Failed {url}: {e}")
