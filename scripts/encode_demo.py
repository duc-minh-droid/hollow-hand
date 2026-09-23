"""Turn screencast frames (docs/media/frames) into docs/media/demo.mp4 and demo.gif.

Screencast frames arrive only when the page changes, so each frame is held for the time
until the next one (ffmpeg concat demuxer with per-frame durations).
Needs: pip install imageio-ffmpeg
"""
import json
import subprocess
from pathlib import Path

import imageio_ffmpeg

FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
FRAMES = Path("docs/media/frames")
OUT = Path("docs/media")

index = json.loads((FRAMES / "index.json").read_text())
lines = []
for cur, nxt in zip(index, index[1:] + [None]):
    dur = (nxt["t"] - cur["t"]) if nxt else 0.5
    dur = max(0.01, min(dur, 2.0))  # cap long holds so the video never stalls
    lines.append(f"file '{cur['file']}'\nduration {dur:.4f}")
lines.append(f"file '{index[-1]['file']}'")
(FRAMES / "list.txt").write_text("\n".join(lines))

def ff(*args):
    subprocess.run([FFMPEG, "-y", "-loglevel", "error", *args], check=True)

ff("-f", "concat", "-safe", "0", "-i", str(FRAMES / "list.txt"), "-ss", "0.6",
   "-vf", "fps=30,scale=1280:-2:flags=lanczos,format=yuv420p",
   "-c:v", "libx264", "-preset", "slow", "-crf", "23", "-movflags", "+faststart",
   str(OUT / "demo.mp4"))

# GIF for the README: shorter, smaller, palette-optimised.
ff("-i", str(OUT / "demo.mp4"), "-ss", "8", "-t", "18",
   "-vf", "fps=9,scale=640:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=64:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle",
   str(OUT / "demo.gif"))

for f in ("demo.mp4", "demo.gif"):
    print(f, round((OUT / f).stat().st_size / 1e6, 2), "MB")
