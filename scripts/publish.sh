#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./publish.sh              # bump patch (default), then publish
#   ./publish.sh patch
#   ./publish.sh minor
#   ./publish.sh major
#   ./publish.sh 5.0.0        # exact version
#   ./publish.sh 5.0.0-rc.1   # pre-release / RC
#   ./publish.sh current      # publish current version in package.json (no bump)

VERSION="${1:-patch}"

# Clean tree check
if [ -n "$(git status --porcelain)" ]; then
  echo "error: working tree is dirty — commit or stash first" >&2
  exit 1
fi

# Bump unless 'current'
if [ "$VERSION" != "current" ]; then
  npm version "$VERSION" --no-git-tag-version
fi

NAME=$(node -p "require('./package.json').name")
NEW_VERSION=$(node -p "require('./package.json').version")

# Refuse if already published
if npm view "$NAME@$NEW_VERSION" version >/dev/null 2>&1; then
  echo "error: $NAME@$NEW_VERSION is already published" >&2
  exit 1
fi

echo "Publishing $NAME@$NEW_VERSION"

# Build
npm run build

# Commit (only if we bumped) + tag
if [ "$VERSION" != "current" ]; then
  git add package.json
  git commit -m "v$NEW_VERSION"
fi
git tag "v$NEW_VERSION"

# Publish
npm publish --access public

echo ""
echo "Published $NAME@$NEW_VERSION"
echo ""
echo "Don't forget: git push && git push origin v$NEW_VERSION"
