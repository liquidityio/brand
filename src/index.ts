import type { OrgConfig } from './types'
import orgConfig from './org-config.json'

export const config: OrgConfig = orgConfig as OrgConfig
export const brandIdentity = config.identity as Required<typeof config.identity>

export { hanzoguiConfig } from './hanzogui-config'
export { tenants, getTenantBrand, detectTenant } from './tenants'
export type { TenantId } from './tenants'
export type { BrandIdentity, OrgConfig } from './types'
