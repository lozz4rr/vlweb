export type GraphicTag = 'vulung' | 'kadjiadji' | 'sun' | 'logo' | 'VULUNG' | 'KADJIADJI' | 'SUN' | 'LOGO'

export interface ProductColor {
  name: string
  hex: string
}

export interface Product {
  id: string
  name: string
  subtitle: string
  price: number
  originalPrice?: number
  isNew?: boolean
  fit: string
  description: string
  colors: ProductColor[]
  sizes: string[]
  images: {
    front: string
    back?: string
  }
  graphics: GraphicTag[]
  sold: number
  releasedAt: string
}

export function formatPrice(price: number): string {
  return `NT$ ${price.toLocaleString()}`
}

export const products: Product[] = [
  {
    id: 'vulung',
    name: 'vulung／百步蛇',
    subtitle: '百步蛇與太陽',
    price: 680,
    originalPrice: 750,
    isNew: true,
    fit: 'HEAVYWEIGHT BOXY FIT',
    description:
      '取自排灣文化中的百步蛇與太陽意象，以潮流風格重新詮釋。\n讓來自根源的故事走進日常，繼續被看見。\n\nInspired by the hundred-pacer viper and sun motifs in Paiwan culture, reimagined through a contemporary streetwear style. Bringing stories from our roots into everyday life, so they continue to be seen.',
    colors: [
      { name: 'White 白', hex: '#efe8da' },
      { name: 'Black 黑', hex: '#1e1c1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: {
      front: '/images/products/vulung-front.jpg',
      back: '/images/products/vulung-back.jpg',
    },
    graphics: ['vulung', 'sun'],
    sold: 120,
    releasedAt: '2026-10-01',
  },
  {
    id: 'kadjiadji',
    name: 'kadjiadji／蝴蝶',
    subtitle: '蝴蝶',
    price: 680,
    originalPrice: 750,
    isNew: true,
    fit: 'RELAXED FIT',
    description:
      '從排灣文化的蝴蝶圖紋出發，轉化為當代服飾語言。\n把文化穿進生活，也讓故事在新的世代持續流動。\n\nDrawing from butterfly motifs in Paiwan culture, the design transforms tradition into a contemporary visual language. Made to be worn today, while carrying its story into a new generation.',
    colors: [
      { name: 'White 白', hex: '#efe8da' },
      { name: 'Black 黑', hex: '#1e1c1a' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    images: {
      front: '/images/products/kadjiadji-front.jpg',
      back: '/images/products/kadjiadji-back.jpg',
    },
    graphics: ['kadjiadji'],
    sold: 95,
    releasedAt: '2026-10-01',
  },
]
