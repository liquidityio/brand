/**
 * @liquidityio/brand - Brand assets and configuration for Liquidity
 */

// Brand runtime config (brand.json) — single source of truth
export { brand } from './brand'
export type { BrandConfig, BrandTheme, RuntimeConfig } from './brand-types'
export { loadBrand, getBrandUrl, getDocsUrl, getGatewayUrl, getWsUrl, getRpcUrl } from './loader'
