import { createHanzoguiConfig, type ThemesConfig } from '@hanzo/theming/hanzogui-config'
import themesJson from './themes.json'
import { bodyFont, headingFont, monoFont } from './fonts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hanzoguiConfig: any = createHanzoguiConfig({
  themes: themesJson.themes as ThemesConfig,
  fonts: { body: bodyFont, heading: headingFont, mono: monoFont },
})
