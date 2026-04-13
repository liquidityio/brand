import type { OrgConfig } from './types'
import brandJson from './brand.json'

export const config: OrgConfig = brandJson as OrgConfig
export const brandIdentity = config.identity as Required<typeof config.identity>

export { tamaguiConfig } from './tamagui-config'
export type { BrandIdentity, OrgConfig } from './types'
