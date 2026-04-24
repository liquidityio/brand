// Tenant brand registry.
//
// Each tenant is a partial OrgConfig that overrides the canonical Liquidity
// org-config.json. Consumers pick a tenant via getTenantBrand(tenantId)
// — typically wired to hostname detection in the SPA.
//
// Adding a tenant: drop a SVG pair into assets/<tenant>/{logo,favicon}.svg,
// add an entry below, bump package version, publish.

import type { OrgConfig } from './types'
import liquidityConfig from './org-config.json'

export type TenantId = 'liquidity' | 'mlc' | 'vcc'

const liquidity: OrgConfig = liquidityConfig as OrgConfig

const mlc: OrgConfig = {
  identity: {
    name: 'Morning Line Club',
    title: 'Morning Line Club',
    description: 'Fractional ownership of thoroughbred horses and music royalties',
    shortName: 'MLC',
    legalEntity: 'Morning Line Club LLC',
    copyrightHolder: 'Morning Line Club LLC',
    appDomain: 'morningline.io',
    helpUrl: 'https://morningline.io/help',
    termsUrl: 'https://morningline.io/terms',
    privacyUrl: 'https://morningline.io/privacy',
    supportEmail: 'support@morningline.io',
    twitter: 'https://x.com/morninglineclub',
    logoUrl: 'assets/mlc/logo.svg',
    faviconUrl: 'assets/mlc/favicon.svg',
  },
  chains: liquidity.chains,
  rpc: liquidity.rpc,
  api: liquidity.api,
  walletConnect: liquidity.walletConnect,
}

const vcc: OrgConfig = {
  identity: {
    name: 'VC Cross',
    title: 'VC Cross',
    description: 'Private capital fundraising — venture, real estate, growth equity',
    shortName: 'VCC',
    legalEntity: 'Venture Cross Capital',
    copyrightHolder: 'Venture Cross Capital',
    appDomain: 'vccross.com',
    helpUrl: 'https://vccross.com/help',
    termsUrl: 'https://vccross.com/terms',
    privacyUrl: 'https://vccross.com/privacy',
    supportEmail: 'support@vccross.com',
    twitter: '',
    logoUrl: 'assets/vcc/logo.svg',
    faviconUrl: 'assets/vcc/favicon.svg',
  },
  chains: liquidity.chains,
  rpc: liquidity.rpc,
  api: liquidity.api,
  walletConnect: liquidity.walletConnect,
}

export const tenants: Record<TenantId, OrgConfig> = { liquidity, mlc, vcc }

/** Pick a tenant config by id; falls back to Liquidity. */
export function getTenantBrand(id: TenantId | string | undefined): OrgConfig {
  if (id === 'mlc' || id === 'vcc') return tenants[id]
  return tenants.liquidity
}

/** Hostname → TenantId. The single canonical detector. */
export function detectTenant(hostname: string | undefined): TenantId {
  if (!hostname) return 'liquidity'
  if (hostname.startsWith('mlc.') || hostname.includes('.mlc.')) return 'mlc'
  if (hostname.startsWith('vcc.') || hostname.includes('.vcc.')) return 'vcc'
  return 'liquidity'
}
