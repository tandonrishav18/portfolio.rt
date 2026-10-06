import subprocess
import glob

files = sorted(glob.glob("public/cert_*.png"))
for f in files:
    res = subprocess.run(["file", f], capture_output=True, text=True)
    print(res.stdout.strip())
