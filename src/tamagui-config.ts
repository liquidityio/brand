import { createTamaguiConfig, type ThemesConfig } from '@hanzo/branding/tg-config'
import brandJson from './brand.json'
import { bodyFont, headingFont, monoFont } from './fonts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tamaguiConfig: any = createTamaguiConfig({
  themes: brandJson.themes as ThemesConfig,
  fonts: { body: bodyFont, heading: headingFont, mono: monoFont },
})
