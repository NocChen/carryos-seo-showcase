export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  price: number
  compareAtPrice?: number
  category: 'power' | 'carry' | 'utility'
  useCase: 'commuter' | 'minimalist' | 'creator'
  materials: string[]
  weight: string
  dimensions: string
  features: string[]
  images: string[]
  inStock: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export type CheckoutStep = 'shipping' | 'payment' | 'confirmation'
