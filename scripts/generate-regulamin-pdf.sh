#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC_DIR="$ROOT_DIR/public"
STATIC_DIR="$ROOT_DIR/static"
OUTPUT_MAIN="$STATIC_DIR/regulamin-fitssey.pdf"
OUTPUT_HASHED="$STATIC_DIR/7f6be9c90163dd9d443da8e8f644472a1ebb2072.pdf"
PORT="${REGULAMIN_PDF_PORT:-8008}"
URL="http://127.0.0.1:${PORT}/regulamin/"
CHROME_BIN="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

if [[ ! -x "$CHROME_BIN" ]]; then
  echo "Google Chrome not found at: $CHROME_BIN"
  echo "Set CHROME_BIN env var and adjust this script if needed."
  exit 1
fi

cd "$ROOT_DIR"

echo "Building Hugo site..."
hugo

echo "Starting temporary server on port ${PORT}..."
python3 -m http.server "$PORT" --directory "$PUBLIC_DIR" >/tmp/regulamin-pdf-server.log 2>&1 &
SERVER_PID=$!
trap 'kill "$SERVER_PID" >/dev/null 2>&1 || true' EXIT

# Give the server a moment to start.
sleep 1

echo "Generating PDF from ${URL}..."
"$CHROME_BIN" \
  --headless=new \
  --disable-gpu \
  --no-pdf-header-footer \
  --run-all-compositor-stages-before-draw \
  --virtual-time-budget=8000 \
  --print-to-pdf="$OUTPUT_MAIN" \
  "$URL" >/tmp/regulamin-pdf-chrome.log 2>&1

cp "$OUTPUT_MAIN" "$OUTPUT_HASHED"

echo "Generated: $OUTPUT_MAIN"
echo "Updated:   $OUTPUT_HASHED"
ls -lh "$OUTPUT_MAIN" "$OUTPUT_HASHED"
