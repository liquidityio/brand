/**
 * @liquidityio/brand - Brand assets and configuration for Liquidity
 */

// Tamagui type augmentation — registers shorthands for all consumers
import './gui-types'

// Brand runtime config (brand.json) — single source of truth
export {
  brand,
  brandConfig,
  type BrandConfig,
  type BrandTheme,
  type RuntimeConfig,
} from './brand'

export {
  loadBrand,
  getBrandUrl,
  getDocsUrl,
  getGatewayUrl,
  getWsUrl,
  getRpcUrl,
} from './brand'

// Components
export {
  PrimaryButton,
  GhostButton,
  ToggleSwitch,
  InfoBox,
} from './components'

// GUI config
export { default as guiConfig } from './gui-config/gui.config'
