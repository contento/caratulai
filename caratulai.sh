#!/bin/bash
# caratulai — convenient CLI wrapper for the alien image generator
# Usage: ./caratulai.sh generate star water travel --profile sagan
#        ./caratulai.sh generate star water travel --model-set lmstudio --profile sagan
#        ./caratulai.sh generate --from-text "A starry ocean"
#        ./caratulai.sh generate --from-image ./photo.jpg --profile contento
#        ./caratulai.sh palettes
#        ./caratulai.sh --build generate star water travel

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if --build flag is passed
BUILD=false
if [[ "$1" == "--build" ]]; then
  BUILD=true
  shift
fi

# Build if flag is set, if dist doesn't exist, or if any source is newer than the dist
DIST_INDEX="$SCRIPT_DIR/packages/cli/dist/index.js"
NEEDS_BUILD=false
if [[ "$BUILD" == "true" ]] || [[ ! -f "$DIST_INDEX" ]]; then
  NEEDS_BUILD=true
elif find "$SCRIPT_DIR/packages" -name "*.ts" -newer "$DIST_INDEX" | grep -q .; then
  NEEDS_BUILD=true
fi

if [[ "$NEEDS_BUILD" == "true" ]]; then
  echo "Building caratulai..." >&2
  cd "$SCRIPT_DIR"
  pnpm build > /dev/null 2>&1
fi

# Run the CLI
node "$SCRIPT_DIR/packages/cli/dist/index.js" "$@"
