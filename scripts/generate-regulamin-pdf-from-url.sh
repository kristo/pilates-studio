#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
STATIC_DIR="$ROOT_DIR/static"
OUTPUT_MAIN="$STATIC_DIR/regulamin-fitssey.pdf"
OUTPUT_HASHED="$STATIC_DIR/7f6be9c90163dd9d443da8e8f644472a1ebb2072.pdf"
URL="${REGULAMIN_PDF_URL:-https://pure-shape.pl/regulamin/}"
CHROME_BIN="${CHROME_BIN:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

if [[ ! -x "$CHROME_BIN" ]]; then
  echo "Google Chrome not found at: $CHROME_BIN"
  echo "Set CHROME_BIN environment variable to your Chrome executable path."
  exit 1
fi

echo "Generating PDF from production URL: $URL"
"$CHROME_BIN" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=10000 \
  --print-to-pdf="$OUTPUT_MAIN" \
  "$URL" >/tmp/regulamin-pdf-prod-chrome.log 2>&1

cp "$OUTPUT_MAIN" "$OUTPUT_HASHED"

echo "Generated: $OUTPUT_MAIN"
echo "Updated:   $OUTPUT_HASHED"
ls -lh "$OUTPUT_MAIN" "$OUTPUT_HASHED"
