import type { RuntimeConfig } from './brand-types'
import brandJson from './brand.json'

/** The full brand runtime config for Liquidity. */
export const brand: RuntimeConfig = brandJson

/** Brand identity config (shorthand for brand.brand) */
export const brandConfig = brand.brand as Required<typeof brand.brand>

export default brand
