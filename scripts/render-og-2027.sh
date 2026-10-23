#!/usr/bin/env bash
# BuriKaigi 2027 の OG 画像（public/images/2027/ogp.png, 1200x630）を撮影する。
#
# 使い方:
#   pnpm build && pnpm preview   # 別のターミナルで起動しておく（既定 http://localhost:4321）
#   scripts/render-og-2027.sh [ベースURL]
#
# /og/2027/ をヘッドレス Chrome で開き、Web フォントと画像の読み込みを待ってから撮影する。
set -euo pipefail

base_url="${1:-http://localhost:4321}"
out="$(cd "$(dirname "$0")/.." && pwd)/public/images/2027/ogp.png"
chrome="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

"$chrome" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --window-size=1200,630 \
  --virtual-time-budget=5000 \
  --screenshot="$out" \
  "$base_url/og/2027/"

echo "wrote $out"
