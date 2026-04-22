/** Brand identity — name, domains, social, assets. */
export interface BrandIdentity {
  name: string
  title: string
  description: string
  shortName: string
  labsName: string
  legalEntity: string
  walletName: string
  protocolName: string
  copyrightHolder: string

  // Domains
  appDomain: string
  docsDomain: string
  infoDomain: string
  gatewayDomain: string
  wsDomain: string

  // Links
  helpUrl: string
  termsUrl: string
  privacyUrl: string
  downloadUrl: string

  // Contact
  complianceEmail: string
  supportEmail: string

  // Social
  twitter: string
  farcaster: string
  linkedin: string
  tiktok: string
  github: string
  discord: string

  // Assets
  logoUrl: string
  faviconUrl: string
}

/** Full org config — the shape of liquidity-org-config.json. */
export interface OrgConfig {
  identity: Partial<BrandIdentity>
  chains: {
    defaultChainId: number
    supported: number[]
  }
  rpc: Record<string, string>
  api: {
    graphql: string
    gateway: string
    insights: string
  }
  iam?: {
    provider: string
    clientId: string
  }
  walletConnect: {
    projectId: string
  }
}
