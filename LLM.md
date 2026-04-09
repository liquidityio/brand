# @liquidityio/brand

Canonical home of the `@liquidityio/brand` package. Published to npm.

## Install

```bash
npm install @liquidityio/brand
# or
pnpm add @liquidityio/brand
```

Current version: `1.1.1`

## Contents

- `src/` -- brand config, loader, types (built with tsup)
- `gui-config/` -- `gui.config.ts` (@hanzo/gui Tamagui config)
- `components/` -- styled brand components
- `tw-config/` -- Tailwind CSS theme (`index.css`)
- `assets/logo/` -- logos
- `brand.json` -- brand metadata

## Exports

```typescript
import { brand } from '@liquidityio/brand'
import guiConfig from '@liquidityio/brand/gui-config'
import { BrandComponent } from '@liquidityio/brand/components'
import '@liquidityio/brand/tw-config'
import brandJson from '@liquidityio/brand/brand.json'
import { loadBrand } from '@liquidityio/brand/loader'
```

## Build

```bash
pnpm build   # tsup: cjs + esm + dts
```

## Publish

```bash
npm publish
```

## Consumers

- `~/work/liquidity/exchange/` (via `pkgs/brand` re-export or npm)
- `~/work/liquidity/id/` (npm)
- `~/work/liquidity/superadmin/` (npm)
