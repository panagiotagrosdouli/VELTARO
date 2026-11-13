#!/usr/bin/env python3
from pathlib import Path
import subprocess,sys
root=Path(__file__).resolve().parents[1]
commands=[["python3","tests/check-integrity.py"]]
commands += [["node",str(p.relative_to(root))] for p in sorted((root/"tests").glob("*.mjs")) if p.name!="check-live-pages.mjs"]
failures=[]
for command in commands:
 print("RUN", " ".join(command),flush=True)
 if subprocess.run(command,cwd=root).returncode:failures.append(command)
print("FAILED COMMANDS:",failures)
sys.exit(bool(failures))
