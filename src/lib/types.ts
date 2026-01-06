export interface Website {
  id: string
  tokenId: string
  title: string
  description: string
  query: string
  content: string
  url: string
  ownerWallet: string
  value: number
  createdAt: number
  lastModified: number
  pages: Page[]
}

export interface Page {
  id: string
  title: string
  content: string
  createdAt: number
}

export interface Token {
  id: string
  websiteId: string
  websiteUrl: string
  ownerWallet: string
  value: number
  createdAt: number
  metadata: {
    title: string
    description: string
    query: string
  }
}

export interface Wallet {
  address: string
  balance: number
  tokens: Token[]
  createdAt: number
}

export interface MarketplaceListing {
  id: string
  website: Website
  token: Token
  price: number
  seller: string
  listedAt: number
}

export type ViewMode = 'home' | 'website' | 'wallet' | 'marketplace' | 'builder'
