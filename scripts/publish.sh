#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./publish.sh          # bump patch (1.1.1 → 1.1.2)
#   ./publish.sh 2.0.0    # set exact version
#   ./publish.sh minor     # bump minor (1.1.1 → 1.2.0)
#   ./publish.sh major     # bump major (1.1.1 → 2.0.0)

VERSION="${1:-patch}"

# Ensure clean working tree
if [ -n "$(git status --porcelain)" ]; then
  echo "error: working tree is dirty — commit or stash first" >&2
  exit 1
fi

# Build first
echo "Building..."
npm run build

# Bump version — npm version handles patch/minor/major keywords
# and also accepts an explicit semver like 2.0.0
npm version "$VERSION" --no-git-tag-version

NEW_VERSION=$(node -p "require('./package.json').version")
echo "Publishing @liquidityio/brand@$NEW_VERSION"

# Commit, tag, publish
git add package.json
git commit -m "v$NEW_VERSION"
git tag "v$NEW_VERSION"
npm publish --access public

echo ""
echo "Published @liquidityio/brand@$NEW_VERSION"
echo "Run 'git push && git push --tags' to push to origin."
