export type GraphicTag = 'vulung' | 'kadjiadji'

export type ProductColor = { name: string; hex: string }

export type Product = {
  id: string
  name: string
  subtitle: string
  nameZh: string
  price: number
  originalPrice?: number
  fit: string
  sizes: string[]
  colors: ProductColor[]
  print: string
  description: string
  graphics: GraphicTag[]
  images: { front: string; back: string }
  releasedAt: string
  sold: number
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: 'vulung',
    name: 'vulung／百步蛇',
    subtitle: '百步蛇與太陽',
    nameZh: 'vulung／百步蛇',
    price: 680,
    originalPrice: 750,
    fit: 'Heavyweight Boxy Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black 黑', hex: '#1e1c1a' },
      { name: 'White 白', hex: '#f8f8f8' },
    ],
    print: '絹印 Screen Print',
    description: `取自排灣文化中的百步蛇與太陽意象，以潮流風格重新詮釋。  
讓來自根源的故事走進日常，繼續被看見。

Inspired by the hundred-pacer viper and sun motifs in Paiwan culture, reimagined through a contemporary streetwear style. Bringing stories from our roots into everyday life, so they continue to be seen.`,
    graphics: ['vulung'],
    images: { front: '/images/product-1.png', back: '/images/product-1.png' },
    releasedAt: '2026-09-20',
    sold: 412,
    isNew: true,
  },
  {
    id: 'kadjiadji',
    name: 'kadjiadji／蝴蝶',
    subtitle: '蝴蝶',
    nameZh: 'kadjiadji／蝴蝶',
    price: 680,
    originalPrice: 750,
    fit: 'Relaxed Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Black 黑', hex: '#1e1c1a' },
      { name: 'White 白', hex: '#f8f8f8' },
    ],
    print: '絹印 Screen Print',
    description: `從排灣文化的蝴蝶圖紋出發，轉化為當代服飾語言。  
把文化穿進生活，也讓故事在新的世代持續流動。

Drawing from butterfly motifs in Paiwan culture, the design transforms tradition into a contemporary visual language. Made to be worn today, while carrying its story into a new generation.`,
    graphics: ['kadjiadji'],
    images: { front: '/images/kadjiadji-front.png', back: '/images/kadjiadji-back.png' },
    releasedAt: '2026-08-12',
    sold: 268,
    isNew: true,
  },
]

export function formatPrice(value: number) {
  return `NT$ ${value.toLocaleString('en-US')}`
}
