#!/bin/bash
set -e

KMUX_REPO=/home/ubuntu/projects/kmux
DOCS_SRC=$KMUX_REPO/docs
DOCS_DEST=./src/data/docs

echo "📚 Syncing documentation from kmux repo..."

# Create destination if it doesn't exist
mkdir -p $DOCS_DEST

# Copy generated JSON
if [ -f "$DOCS_SRC/cli-reference.json" ]; then
  cp $DOCS_SRC/cli-reference.json $DOCS_DEST/
  echo "✓ Copied cli-reference.json"
else
  echo "⚠️  cli-reference.json not found. Run 'make docs' in kmux repo first."
  exit 1
fi

# Copy manual markdown
if [ -f "$DOCS_SRC/getting-started.md" ]; then
  cp $DOCS_SRC/getting-started.md $DOCS_DEST/
  echo "✓ Copied getting-started.md"
else
  echo "⚠️  getting-started.md not found."
  exit 1
fi

echo "✅ Docs synced successfully!"
