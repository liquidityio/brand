// ============================================================
// @hanzo/gui configuration — Liquidity.io brand theme
// ============================================================
//
// HOW THIS WORKS
// --------------
// @hanzo/gui's theme system is built on 12-step color palettes.
// Each step has a role:
//
//   Steps 1–3   →  backgrounds (base, raised, subtle)
//   Steps 4–6   →  borders, separators, muted UI
//   Steps 7–9   →  interactive states, quiet text
//   Steps 10–12 →  foreground text (quiet → primary → strongest)
//
// Components like Button, Input, Card reference these steps
// internally for their default/hover/press/focus states.
// By providing your brand's color scale as a 12-step palette,
// every component "just works" with correct interactive states.
//
// The config also defines:
//   - tokens: named constants for size, space, radius
//   - fonts:  font families with size/weight/lineHeight scales
//   - media:  responsive breakpoints
//   - shorthands: prop abbreviations (p → padding, bg → backgroundColor)
//
// USAGE
// -----
//   import config from './gui.config'
//   import { GuiProvider } from '@hanzo/gui'
//
//   <GuiProvider config={config} defaultTheme="light">
//     <App />
//   </GuiProvider>
//
// Then in components:
//   <YStack p="$4" gap="$3" bg="$background">
//     <Text color="$color" fontSize="$4">Hello</Text>
//     <Button>Continue</Button>
//   </YStack>
//
// ============================================================

import { createFont, createGui } from '@hanzo/gui'
import { createThemes } from '@hanzogui/theme-builder'
import { shorthands as baseShorthands } from '@hanzogui/shorthands/v4'
import { getDefaultGuiConfig } from '@hanzogui/config-default'

// Extract media and tokens from the default config
const _defaultConfig = getDefaultGuiConfig('web')
const { media } = _defaultConfig
const defaultTokens = _defaultConfig.tokens

// ────────────────────────────────────────────────────────────
// 1. COLOR PALETTES
// ────────────────────────────────────────────────────────────
//
// The brand config (index.css) defines colors in OKLCH, but @hanzo/gui
// palettes use hex/hsl strings. We convert your astra (light)
// and umbra (dark) scales into 12-step arrays.
//
// Where your scale has gaps (e.g. astra jumps from 400 to 700),
// we interpolate intermediate values to fill out all 12 steps.

// Light palette: lightest (#1) → darkest (#12)
// Maps from your astra scale + interpolated midpoints
const lightPalette = [
  '#ffffff',             // 1  — astra-0:    bg-base (white)
  '#fcfcfb',             // 2  — astra-100:  bg-raised
  '#f9f8f6',             // 3  — astra-200:  bg-underlay
  '#f2f0ec',             // 4  — astra-300:  offset, subtle bg
  '#ddd9d3',             // 5  — astra-400:  subtle borders
  '#cec9c2',             // 6  — interpolated: medium border
  '#bfbab2',             // 7  — interpolated: muted element
  '#b0aaa1',             // 8  — astra-700:  backdrop
  '#8a8780',             // 9  — interpolated: quiet text
  '#5c5a55',             // 10 — interpolated: secondary text
  '#1f1d18',             // 11 — astra-1000: primary text (fg)
  '#141210',             // 12 — astra-2000: darkest
]

// Dark palette: darkest (#1) → lightest (#12)
// Maps from your umbra scale + interpolated midpoints
const darkPalette = [
  '#000000',             // 1  — umbra-0:    pure black
  '#2f2d2a',             // 2  — umbra-100:  bg-base (dark)
  '#363432',             // 3  — umbra-200:  bg-raised
  '#3d3b38',             // 4  — umbra-300:  offset
  '#44423f',             // 5  — umbra-400:  subtle borders
  '#555350',             // 6  — interpolated: medium border
  '#666461',             // 7  — interpolated: muted
  '#777573',             // 8  — interpolated: quiet text
  '#999896',             // 9  — interpolated: secondary text
  '#b5b4b2',             // 10 — interpolated: brighter text
  '#d4d3d2',             // 11 — umbra-1000: primary text (fg)
  '#e8e8e7',             // 12 — interpolated: lightest text
]

// ────────────────────────────────────────────────────────────
// 2. BRAND ACCENT (bar-fill: #1a2744)
// ────────────────────────────────────────────────────────────
//
// Your primary action color is a dark navy. We create a 12-step
// palette for it so it can be used as a children theme:
//
//   <Theme name="brand">
//     <Button>Continue</Button>  ← automatically uses navy bg
//   </Theme>
//
// The palette goes from lightest tint (#1) to darkest shade (#12).

const brandLight: Record<string, string> = {
  brand1:  '#f0f3f8',   // very light navy tint
  brand2:  '#dfe5f0',
  brand3:  '#c5d0e4',
  brand4:  '#a8b8d6',
  brand5:  '#8a9ec5',
  brand6:  '#6d84b4',
  brand7:  '#516ba0',
  brand8:  '#3a5289',
  brand9:  '#2a3d6a',
  brand10: '#1a2744',   // ← your bar-fill
  brand11: '#131d34',
  brand12: '#0c1322',
}

const brandDark: Record<string, string> = {
  brand1:  '#0c1322',
  brand2:  '#131d34',
  brand3:  '#1a2744',   // ← your bar-fill
  brand4:  '#2a3d6a',
  brand5:  '#3a5289',
  brand6:  '#516ba0',
  brand7:  '#6d84b4',
  brand8:  '#8a9ec5',
  brand9:  '#a8b8d6',
  brand10: '#c5d0e4',
  brand11: '#dfe5f0',
  brand12: '#f0f3f8',
}

// ────────────────────────────────────────────────────────────
// 3. SHORTHANDS
// ────────────────────────────────────────────────────────────
//
// The base v4 shorthands cover padding, margin, position, and
// a few others. We extend them with common props that the base
// set is missing — width, height, flex, border sides, etc.
//
// With onlyAllowShorthands: true, you MUST use the shorthand
// when one exists. This keeps code consistent:
//   ✅  <View w={100} />
//   ❌  <View width={100} />   ← TypeScript error

const shorthands = {
  ...baseShorthands,

  // Dimensions
  w: 'width',
  h: 'height',

  // Flex
  f: 'flex',
  fb: 'flexBasis',
  fd: 'flexDirection',
  fw: 'flexWrap',

  // Border — width
  bw: 'borderWidth',
  btw: 'borderTopWidth',
  bbw: 'borderBottomWidth',
  blw: 'borderLeftWidth',
  brw: 'borderRightWidth',

  // Border — color
  bc: 'borderColor',
  btc: 'borderTopColor',
  bbc: 'borderBottomColor',
  blc: 'borderLeftColor',
  brc: 'borderRightColor',

  // Overflow
  ov: 'overflow',

  // Opacity
  op: 'opacity',

  // Display / position (position already uses full name)
  pos: 'position',
} as const

// ────────────────────────────────────────────────────────────
// 4. TOKENS
// ────────────────────────────────────────────────────────────
//
// @hanzo/gui has two separate token sets that control spacing:
//
//   size  — component dimensions (Button height, Input height).
//           Non-linear because a "default" button needs to be
//           ~44px for proper touch targets, not 16px.
//           Use with: <Button size="$md" />, <Input size="$sm" />
//
//   space — layout spacing (padding, margin, gap).
//           Linear 4px grid, just like Tailwind:
//           $1 = 4px, $2 = 8px, ... $4 = 16px, etc.
//           Use with: <YStack p="$4" gap="$3" />
//
// They're separate because a button's *height* and its
// *internal padding* are different concerns at different scales.

// Component sizes: non-linear scale for component dimensions.
// The numeric keys ($1–$20) are the standard @hanzo/gui convention.
// The named keys ($xs–$xl) are aliases for readability.
const size = {
  $0: 0,
  '$0.25': 2,
  '$0.5': 4,
  '$0.75': 8,
  $1: 20,
  '$1.5': 24,
  $2: 28,
  '$2.5': 32,
  $3: 36,
  '$3.5': 40,
  $4: 44,
  $true: 44,       // REQUIRED — marks the default size
  '$4.5': 48,
  $5: 52,
  $6: 64,
  $7: 74,
  $8: 84,
  $9: 94,
  $10: 104,
  $11: 124,
  $12: 144,

  // Named aliases — same values as the numeric keys above.
  // Use whichever reads better in context:
  //   <Button size="$md" />  is the same as  <Button size="$4" />
  $xs: 28,         // = $2
  $sm: 36,         // = $3
  $md: 44,         // = $4 / $true
  $lg: 52,         // = $5
  $xl: 64,         // = $6
}

// Layout spacing: linear 4px grid.
// $1 = 4px, $2 = 8px, ... exactly like Tailwind's p-1, p-2, etc.
// Negative values are included for negative margins.
const space = {
  $0: 0,
  '$0.5': 2,
  $1: 4,
  '$1.5': 6,
  $2: 8,
  '$2.5': 10,
  $3: 12,
  '$3.5': 14,
  $4: 16,
  $true: 16,       // REQUIRED — marks the default spacing
  '$4.5': 18,
  $5: 20,
  $6: 24,
  $7: 28,
  $8: 32,
  $9: 36,
  $10: 40,
  $11: 44,
  $12: 48,
  $14: 56,
  $16: 64,
  $20: 80,
  $24: 96,

  // Named aliases — parallel to the size aliases, for getSpace() lookups in
  // component variants (e.g. Input's paddingHorizontal uses getSpace(size)).
  $xs: 8,
  $sm: 12,
  $md: 16,
  $lg: 20,
  $xl: 24,

  // Negative values for negative margins
  '-$0.5': -2,
  '-$1': -4,
  '-$1.5': -6,
  '-$2': -8,
  '-$2.5': -10,
  '-$3': -12,
  '-$3.5': -14,
  '-$4': -16,
  '-$4.5': -18,
  '-$5': -20,
  '-$6': -24,
  '-$7': -28,
  '-$8': -32,
  '-$9': -36,
  '-$10': -40,
  '-$11': -44,
  '-$12': -48,
}

const tokens = {
  size,
  space,
  radius: defaultTokens.radius,   // default @hanzo/gui radius scale (0–12, sensible as-is)
  zIndex: defaultTokens.zIndex,   // default @hanzo/gui z-index scale (0–5 → 0–500)
}

// ────────────────────────────────────────────────────────────
// 4. THEMES
// ────────────────────────────────────────────────────────────
//
// createV5Theme() takes the palettes and generates:
//   - light / dark base themes
//   - children themes: light_brand, dark_brand, light_blue, etc.
//   - grandchildren: light_brand_surface1, light_brand_accent, etc.
//
// Each theme contains keys like:
//   background, backgroundHover, backgroundPress, backgroundFocus,
//   color, colorHover, colorPress, colorFocus,
//   borderColor, borderColorHover, ...
//
// Components read these automatically for their states.

const themes = createThemes({
  base: {
    palette: { light: lightPalette, dark: darkPalette },
  },
  childrenThemes: {
    brand: { palette: { light: Object.values(brandLight), dark: Object.values(brandDark) } },
  },
  // Override hover/press directions for our design:
  //   - border hover should darken (not lighten)
  //   - background hover should be more visible
  // Override interactive state directions for outline-style buttons:
  //   Light: hover/press darken.  Dark: hover/press lighten.
  // Both palettes are ordered so that +index = toward the text end,
  // which is darker in light mode and lighter in dark mode.
  getTheme: ({ palette }) => {
    if (!palette || palette.length < 12) return {} as Record<string, string>
    const bgIdx = 7 // PALETTE_BACKGROUND_OFFSET
    const borderIdx = bgIdx + 2
    return {
      backgroundHover: palette[bgIdx + 1] as string,
      backgroundPress: palette[bgIdx + 2] as string,
      borderColorHover: palette[borderIdx + 1] as string,
      borderColorPress: palette[borderIdx + 2] as string,
      // Brand primary action color — available as $brandPrimary in all themes
      brandPrimary: '#1a2744',
      brandPrimaryHover: '#243561',
      brandPrimaryPress: '#3a5289',
      brandPrimaryTrack: '#6d84b4',
      brandDisabled: '#585858',
      brandPrimaryText: '#ffffff',
      toggleTrackOff: '#b7b7b7',
      toggleBorderOff: '#424f60',
    }
  },
})

// ────────────────────────────────────────────────────────────
// 6. FONTS
// ────────────────────────────────────────────────────────────
//
// @hanzo/gui fonts define a scale of sizes, line heights, weights,
// and letter spacing — all keyed by the same numeric steps as
// size tokens ($1, $2, $3, etc.).
//
// When you write <Text fontSize="$4" />, @hanzo/gui looks up
// size step 4 in the font definition. Same for lineHeight
// and weight at that step.
//
// Your design system uses three font families:
//   pplxSans      → body text (default)
//   pplxSansMono  → code / monospace
//   pplxSerif     → serif (available but not currently used)

const bodyFont = createFont({
  family: '"pplxSans", ui-sans-serif, system-ui, -apple-system, sans-serif',

  // Size scale: keyed $1–$16, with $true marking the default.
  // These are font sizes in px. Components use $4/true as body text.
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,      // body default
    true: 14,
    5: 15,
    6: 16,
    7: 18,
    8: 20,
    9: 24,
    10: 30,
    11: 36,
    12: 44,
    13: 52,
    14: 62,
    15: 74,
    16: 88,
  },

  // Line height per size step
  lineHeight: {
    1: 16,
    2: 18,
    3: 19,
    4: 21,
    true: 21,
    5: 22,
    6: 24,
    7: 27,
    8: 30,
    9: 34,
    10: 42,
    11: 50,
    12: 60,
    13: 70,
    14: 82,
    15: 98,
    16: 116,
  },

  // Your design system collapses weights to 3 tiers:
  //   400 (thin–normal), 500 (medium–semibold), 550 (bold–black)
  weight: {
    1: '400',    // default body weight
    6: '500',    // medium — used at larger sizes
  },

  letterSpacing: {
    1: 0.15,
    4: 0.1,
    true: 0.1,
    6: 0,
    8: -0.35,
    12: -0.75,
  },
})

const headingFont = createFont({
  family: '"pplxSans", ui-sans-serif, system-ui, -apple-system, sans-serif',
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    true: 18,
    5: 20,
    6: 24,
    7: 30,
    8: 36,
    9: 44,
    10: 52,
    11: 62,
    12: 74,
  },
  lineHeight: {
    1: 16,
    2: 18,
    3: 22,
    4: 24,
    true: 24,
    5: 26,
    6: 30,
    7: 36,
    8: 44,
    9: 52,
    10: 62,
    11: 74,
    12: 86,
  },
  weight: {
    1: '500',    // your semibold tier
    6: '550',    // your bold tier
  },
  letterSpacing: {
    1: 0.2,
    4: 0,
    6: -0.2,
    8: -0.5,
    12: -1,
  },
})

const monoFont = createFont({
  family: '"pplxSansMono", ui-monospace, monospace',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 15,
    6: 16,
    7: 18,
    8: 20,
    9: 24,
    10: 30,
  },
  lineHeight: {
    1: 18,
    2: 20,
    3: 22,
    4: 24,
    true: 24,
    5: 26,
    6: 28,
    7: 30,
    8: 34,
    9: 40,
    10: 48,
  },
  weight: {
    1: '400',
  },
  letterSpacing: {
    4: 0,
  },
})

// ────────────────────────────────────────────────────────────
// 7. SETTINGS
// ────────────────────────────────────────────────────────────
//
// Key settings explained:
//
//   defaultFont: 'body'
//     Text components use the body font unless you specify
//     fontFamily="$heading" or fontFamily="$mono".
//
//   fastSchemeChange: true
//     Enables fast light↔dark toggling without re-rendering
//     the entire tree. Uses CSS class swap under the hood.
//
//   shouldAddPrefersColorThemes: true
//     Auto-generates @media (prefers-color-scheme) CSS rules
//     so the app respects system dark mode preference.
//
//   allowedStyleValues: 'somewhat-strict-web'
//     In dev, warns if you pass raw CSS values where tokens
//     should be used. Helps catch mistakes like p={16}
//     instead of p="$4".
//
//   onlyAllowShorthands: true
//     Enforces shorthand props (p, m, bg, etc.) rather than
//     allowing both padding and p. Keeps code consistent.

const settings = {
  defaultFont: 'body' as const,
  fastSchemeChange: true,
  shouldAddPrefersColorThemes: true,
  allowedStyleValues: 'somewhat-strict-web' as const,
  onlyAllowShorthands: true,
  styleCompat: 'react-native' as const,
}

// ────────────────────────────────────────────────────────────
// 8. CREATE THE CONFIG
// ────────────────────────────────────────────────────────────
//
// createGui() validates everything and returns the config
// object that GuiProvider needs. It:
//   - Checks that tokens have $true keys
//   - Compiles themes into optimized CSS
//   - Sets up the responsive media query system
//   - Returns a getCSS() function for SSR

const config = createGui({
  themes,
  tokens,
  fonts: {
    body: bodyFont,
    heading: headingFont,
    mono: monoFont,
  },
  media,
  shorthands,
  selectionStyles: (theme) =>
    theme.color5
      ? { backgroundColor: theme.color5, color: theme.color11 }
      : null,
  settings,
})

// Type augmentation — makes TypeScript aware of your custom
// config so token autocomplete works in styled() and props.
export type AppConfig = typeof config

declare module '@hanzo/gui' {
  interface GuiCustomConfig extends AppConfig {}
}

export default config
