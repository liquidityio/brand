# @liquidityio/brand

Brand assets, GUI config, and components for Liquidity. Published to npm.

## Install

```bash
npm install @liquidityio/brand
```

## Exports

```typescript
// Brand config (brand.json) + utilities
import { brand, brandConfig, guiConfig } from '@liquidityio/brand'
import { loadBrand, getBrandUrl } from '@liquidityio/brand'

// Components
import { PrimaryButton, GhostButton, OutlineButton } from '@liquidityio/brand/components'
import { ToggleSwitch, InfoBox, StyledCard } from '@liquidityio/brand/components'

// @hanzo/gui config (Tamagui palettes, tokens, themes, fonts)
import guiConfig from '@liquidityio/brand/gui-config'

// Tailwind CSS v4 theme (OKLCH tokens, spacing, typography)
import '@liquidityio/brand/tw-config'

// Raw brand data
import brandJson from '@liquidityio/brand/brand.json'

// Runtime loader (fetches /brand.json, injects CSS vars)
import { loadBrand } from '@liquidityio/brand/loader'

// Logo assets
// @liquidityio/brand/assets/logo/logo.svg
// @liquidityio/brand/assets/logo/favicon.svg
// @liquidityio/brand/assets/logo/wordmark.svg
```

## Structure

```
src/
├── brand/          # brand.json, types, loader, runtime config
├── components/     # PrimaryButton, GhostButton, OutlineButton,
│                   # ToggleSwitch, InfoBox, StyledCard, LiquidityIcon
├── gui-config/     # gui.config.ts (@hanzo/gui Tamagui config)
├── tw-config/      # index.css (Tailwind v4 theme)
├── gui-types.ts    # Tamagui type augmentation
└── index.ts        # Main entry (re-exports all of the above)
assets/
└── logo/           # SVG logos (logo, logo-mono, logo-white, wordmark, favicon)
```

## Build

```bash
npm run build    # tsup: cjs + esm + .d.ts → dist/
npm run tc       # typecheck only
npm run dev      # watch mode
```

## Publish

```bash
./publish.sh            # bump patch  (1.1.1 → 1.1.2)
./publish.sh minor      # bump minor  (1.1.1 → 1.2.0)
./publish.sh major      # bump major  (1.1.1 → 2.0.0)
./publish.sh 3.0.0      # exact version
```

The script builds, bumps version in `package.json`, commits as `v{version}`, tags, and publishes to npm. It refuses to run on a dirty working tree. Push is left to you:

```bash
git push && git push --tags
```

Or use `npm run release` as an alias for `./publish.sh`.

## Consumers

- `liquidityio/exchange` — securities exchange frontend
- `liquidityio/id` — auth + onboarding app
- `liquidityio/superadmin` — operator admin panel
