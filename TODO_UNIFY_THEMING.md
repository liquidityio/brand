# Unify Theming: Single Source of Truth for All Color Systems

## Problem

The codebase has three disconnected color systems:

1. **Tamagui palettes** (`gui.config.ts`) — hardcoded 12-step hex arrays for neutral + brand
2. **BrandTheme** (`brand.json`) — semantic names (`accent1`, `surface1`, `neutral1`) for white-label overrides
3. **Tailwind tokens** (`tw-config/index.css`) — OKLCH custom properties (`--color-fg`, `--color-bg-base`, etc.)

These don't derive from each other. Changing `brand.json` doesn't affect Tamagui components.
Changing the Tamagui palette doesn't affect Tailwind. The hardcoded palettes in `gui.config.ts`
(48 hex values) are the worst offender.

## Proposed Architecture

Standardize on Tamagui's theme paradigm: a **base palette** + **named children themes**.
All specified in `brand.json`, consumed by both Tamagui and Tailwind.

### Theme Set

| Theme | Purpose | Example seed |
|-------|---------|-------------|
| `neutral` | Default greyscale canvas (bg, text, borders) | `#808080` ⬜ |
| `primary` | Brand primary action (buttons, links) | `#1a2744` 🟦 |
| `secondary` | Brand secondary accent | `#721be4` 🟪 |
| `info` | Informational callouts, tips | `#2563eb` 🔵 |
| `success` | Success states, confirmations | `#16a34a` 🟢 |
| `warning` | Warning states, caution | `#d97706` 🟠 |
| `danger` | Errors, destructive actions | `#dc2626` 🔴 |

Each theme has light + dark variants. Both 12-step palettes (light and dark) for each is auto-generated from the seed color, with optional full-palette override for precise control.

### brand.json Shape

```json
{
  "themes": {
    "neutral":   { "seed": "#808080" }, // these generates both light and dark variants
    "primary":   { "seed": "#1a2744" },
    "secondary": { "seed": "#721be4" },
    "info":      { "seed": "#2563eb" },
    "success":   { "seed": "#16a34a" },
    "warning":   { "seed": "#d97706" },
    "danger":    { "seed": "#dc2626" }
  }
}
```

For fine-grained control, a brand can replace `seed`, with `{ light: [], dark: [] }` or `{ light: {seed: <color>}}`:

```json

// examples
{
  "themes": {
    "primary": {
      "light": ["#f0f3f8", "#dfe5f0", ..., "#0c1322"],
      "dark":  ["#0c1322", "#131d34", ..., "#f0f3f8"]
    }
  }
}

{
  "themes": {
    "primary": {
      "light": { "seed": "#ffeeaa"},
      "dark":  ["#0c1322", "#131d34", ..., "#f0f3f8"]
    }
  }
}


```

### How It Works

**Tamagui** (`gui.config.ts`):
- Reads `brand.json` themes
- Auto-generates 12-step light + dark palettes from each seed
  (using `@hanzogui/theme-builder` `createPalettes`)
- Passes them to `createThemes()` as base + childrenThemes
- Components use: `<Button theme="primary">`, `<Card theme="danger">`, etc.
- No more custom `$brandPrimary` / `$brandPrimaryHover` tokens
- No more hardcoded hex arrays

**Tailwind** (`tw-config/index.css`):
- Derive CSS custom properties from the same palette arrays
- `--color-primary-1` through `--color-primary-12`
- Tailwind v4 `@theme` block picks them up
- Utility classes: `bg-primary-9`, `text-danger-11`, `border-info-6`

**Native screens** (StyleSheet):
- Import palette arrays or semantic values from brand package
- Same values, just accessed differently

### What Gets Removed

- `lightPalette` / `darkPalette` hardcoded arrays in `gui.config.ts`
- `brandLight` / `brandDark` hardcoded arrays in `gui.config.ts`
- Custom `$brandPrimary` / `$brandPrimaryHover` / etc. tokens in `getTheme()`
- `BrandTheme` semantic type (`accent1`, `surface1`, `neutral1`) — replaced by theme names
- Orphaned Tailwind tokens (`--color-fg-quiet`, `--color-bg-underlay`, etc.)

### What Gets Added

- `themes` field in `brand.json` (seed colors per theme)
- Palette auto-generation in `gui.config.ts` from seeds
- Tailwind CSS variable generation from the same palettes
- Neutral palette becomes overridable (warm, cool, or custom)

### Advantages

- **One source of truth** — `brand.json` drives everything
- **Standard Tamagui pattern** — theme wrapping, not custom tokens
- **White-label ready** — swap seeds, entire UI updates
- **Dark mode is structural** — light/dark palettes per theme, not per-component
- **Status colors are first-class** — `<Card theme="danger">` gets free hover/press states
- **Auto-generation** — brands only need to specify 7 seed colors

### Trade-offs

- **Palette auto-generation quality** — HSL interpolation can produce muddy midpoints;
  may need manual tuning for some brand colors (solved by optional full palette override)
- **8 themes × 2 schemes = 16 palettes** — more runtime theme objects (Tamagui handles this fine)
- **Tailwind naming differs from Tamagui** — need a mapping layer
  (`bg-primary` in Tailwind vs `theme="primary"` in Tamagui)
- **Migration** — main app has 57 uses of `$accent1` that become `theme="primary"` wrapping

### Reference

- Tamagui theme docs: children themes + `createThemes()`
- Current gui.config.ts: `pkgs/brand/src/gui-config/gui.config.ts`
- Current brand.json: `pkgs/brand/src/brand/brand.json`
