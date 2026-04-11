/**
 * @liquidityio/brand - Brand assets and configuration for Liquidity
 */

// Brand runtime config (brand.json) — single source of truth
export { brand } from './brand'
export type { BrandConfig, BrandTheme, RuntimeConfig } from './brand-types'
export { loadBrand, getBrandUrl, getDocsUrl, getGatewayUrl, getWsUrl, getRpcUrl } from './loader'

// GUI configuration — re-export from gui-config
export { default as guiConfig } from '../gui-config/gui.config'

// UI components — re-export from components
export { PrimaryButton, GhostButton, ToggleSwitch } from '../components/index'

// InfoBox — stub (not yet implemented, provides a no-op placeholder)
export { default as InfoBox } from './info-box'
