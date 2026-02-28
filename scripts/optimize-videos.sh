#!/bin/bash
# =============================================================================
# Video Optimization Pipeline for Nimble Needle
# =============================================================================
# Converts raw 4K vertical .mov source files into web-optimized formats:
#   - MP4 (H.264)  : universal browser support
#   - WebM (VP9)   : ~30% smaller, modern browsers
#   - JPEG poster  : lightweight first-frame fallback
#
# Hero variants are trimmed to 15s for tighter background loops.
# All outputs land in public/videos/ and are served via Vercel CDN.
# =============================================================================

set -e

# -- Paths --
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
SOURCE_DIR="$PROJECT_ROOT/videos"
OUTPUT_DIR="$PROJECT_ROOT/public/videos"

# -- Encoding settings --
# CRF controls quality-vs-size tradeoff (lower = bigger + sharper)
H264_CRF=28
VP9_CRF=32
H264_PRESET="slow"    # slower = better compression at same quality
HERO_TRIM_DURATION=15 # seconds to keep for hero background loops
TARGET_WIDTH=720      # 720px wide → 720x1280 at 9:16

# -- Source-to-output name mapping --
# Each entry: "source_filename|output_basename|is_hero"
# is_hero=1 means we also generate a trimmed hero-specific variant
VIDEOS=(
  "PMAX Dress.mov|dress|0"
  "PMAX Tailoring.mov|tailoring|1"
  "PMAX Wedding 1.mov|wedding-1|1"
  "PMAX Wedding 2.mov|wedding-2|0"
)

mkdir -p "$OUTPUT_DIR"

echo "========================================"
echo "  Nimble Needle Video Optimizer"
echo "========================================"
echo ""

for entry in "${VIDEOS[@]}"; do
  IFS='|' read -r source_file output_name is_hero <<< "$entry"
  input_path="$SOURCE_DIR/$source_file"

  if [ ! -f "$input_path" ]; then
    echo "⚠ SKIP: $source_file not found"
    continue
  fi

  echo "▶ Processing: $source_file → $output_name"

  # -- Full-length MP4 (H.264) --
  # -movflags +faststart enables progressive playback (plays before full download)
  echo "  → MP4 (H.264, ${TARGET_WIDTH}p, CRF ${H264_CRF})"
  ffmpeg -y -i "$input_path" \
    -vf "scale=${TARGET_WIDTH}:-2" \
    -c:v libx264 -crf "$H264_CRF" -preset "$H264_PRESET" \
    -an -movflags +faststart \
    "$OUTPUT_DIR/${output_name}-720p.mp4" \
    2>/dev/null

  # -- Full-length WebM (VP9) --
  echo "  → WebM (VP9, ${TARGET_WIDTH}p, CRF ${VP9_CRF})"
  ffmpeg -y -i "$input_path" \
    -vf "scale=${TARGET_WIDTH}:-2" \
    -c:v libvpx-vp9 -crf "$VP9_CRF" -b:v 0 \
    -an \
    "$OUTPUT_DIR/${output_name}-720p.webm" \
    2>/dev/null

  # -- Poster frame (JPEG, grabbed at 1s to skip black frames) --
  echo "  → Poster (JPEG)"
  ffmpeg -y -i "$input_path" \
    -vf "scale=${TARGET_WIDTH}:-2" \
    -ss 00:00:01 -frames:v 1 \
    -q:v 2 \
    "$OUTPUT_DIR/${output_name}-poster.jpg" \
    2>/dev/null

  # -- Hero-trimmed variants (shorter loop for background use) --
  if [ "$is_hero" = "1" ]; then
    echo "  → Hero MP4 (trimmed to ${HERO_TRIM_DURATION}s)"
    ffmpeg -y -i "$input_path" \
      -vf "scale=${TARGET_WIDTH}:-2" \
      -c:v libx264 -crf "$H264_CRF" -preset "$H264_PRESET" \
      -an -movflags +faststart \
      -t "$HERO_TRIM_DURATION" \
      "$OUTPUT_DIR/${output_name}-hero.mp4" \
      2>/dev/null

    echo "  → Hero WebM (trimmed to ${HERO_TRIM_DURATION}s)"
    ffmpeg -y -i "$input_path" \
      -vf "scale=${TARGET_WIDTH}:-2" \
      -c:v libvpx-vp9 -crf "$VP9_CRF" -b:v 0 \
      -an \
      -t "$HERO_TRIM_DURATION" \
      "$OUTPUT_DIR/${output_name}-hero.webm" \
      2>/dev/null
  fi

  echo "  ✓ Done"
  echo ""
done

# -- Print file sizes for verification --
echo "========================================"
echo "  Output Summary"
echo "========================================"
echo ""

total_size=0
for f in "$OUTPUT_DIR"/*; do
  if [ -f "$f" ]; then
    size=$(stat -f%z "$f" 2>/dev/null || stat -c%s "$f" 2>/dev/null)
    size_mb=$(echo "scale=2; $size / 1048576" | bc)
    total_size=$((total_size + size))
    printf "  %-35s %6s MB\n" "$(basename "$f")" "$size_mb"
  fi
done

total_mb=$(echo "scale=2; $total_size / 1048576" | bc)
echo ""
echo "  TOTAL: ${total_mb} MB"
echo "========================================"
