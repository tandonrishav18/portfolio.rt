# Project Memory & Instructions

## Checkpoint Reference
- **Checkpoint Commit & Tag**: `#CHECKPOINT` (commit `e257db9`)
- **Key Features in Checkpoint**:
  - Exact typography layout in `WhatIBringSection.tsx` with dynamic coordinate tracking on letter `I`.
  - 3D Physics Lanyard with custom rope joint lengths (`0.82`), realistic physics, drag & drop, and auto-alignment directly touching the bottom of letter `I` with negligible margin.
  - Custom badge backside image preserved in `public/lanyard-back.png` and hooked to `backImage="/lanyard-back.png"`.
  - All assets, Pegboard, DecryptedText, and interactive sections completely intact and verified.

Whenever the user says **"revert to checkpoint"** or **"go back to checkpoint"**, immediately restore the repository state to `#CHECKPOINT` (`git checkout CHECKPOINT -- .` or `git reset --hard CHECKPOINT`) and ensure all files match this state with zero changes lost.
