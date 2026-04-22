import type { OrgConfig } from './types'
import orgConfig from './org-config.json'

export const config: OrgConfig = orgConfig as OrgConfig
export const brandIdentity = config.identity as Required<typeof config.identity>

export { hanzoguiConfig } from './hanzogui-config'
export type { BrandIdentity, OrgConfig } from './types'
