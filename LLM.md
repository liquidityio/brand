# @liquidityio/brand

Canonical home of the `@liquidityio/brand` package. Published to npm. Thin wrapper over [`@hanzo/theming`](https://github.com/hanzoai/theming) — this package just provides Liquidity-specific data (identity, theme seeds, fonts, assets).

## Install

```bash
pnpm add @liquidityio/brand
```

## Contents

- `src/liquidity-org-config.json` — identity + runtime config (domains, chains, RPC, API, IAM, WalletConnect)
- `src/themes.json` — 7 theme seeds (neutral, primary, secondary, info, success, warning, danger)
- `src/fonts.ts` — pplxSans font definitions
- `src/hanzogui-config.ts` — calls `createHanzoguiConfig` with our seeds and fonts
- `src/tw-liquidity.css` — bundled CSS for apps (tailwind + additions + palettes + semantic)
- `src/liquidity-tw-additions.css` — org-specific non-color TW tokens
- `src/brand-palettes.css` — generated at prebuild time by `generate-palettes` (gitignored)
- `assets/logo/` — SVG logos

## Exports

```typescript
import { config, brandIdentity, hanzoguiConfig } from '@liquidityio/brand'
import type { BrandIdentity, OrgConfig } from '@liquidityio/brand'
import orgConfig from '@liquidityio/brand/liquidity-org-config.json'
import themes from '@liquidityio/brand/themes.json'
import '@liquidityio/brand/tw-liquidity.css'
// assets: '@liquidityio/brand/assets/logo/logo.svg' (etc.)
```

## Build

```bash
pnpm build   # prebuild: generate-palettes --brandFile src/themes.json  → tsup cjs+esm+dts
pnpm tc      # typecheck
pnpm dev     # watch mode
```

## Publish

```bash
pnpm pub               # bump patch + publish
pnpm pub minor
pnpm pub 4.1.0
```

## Consumers

- `liquidityio/exchange` — securities exchange frontend
- `liquidityio/onboarding` — auth + onboarding app
- `liquidityio/superadmin` — operator admin panel
