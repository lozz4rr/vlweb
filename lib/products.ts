export type GraphicTag = 'vulung' | 'kadjiadji' | 'sun' | 'logo'

export type ProductColor = { name: string; hex: string }

export type Product = {
  id: string
  name: string
  subtitle: string
  nameZh: string
  price: number
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
    id: 'vulung-land-of-origin',
    name: 'VULUNG',
    subtitle: 'Land of Origin Tee',
    nameZh: '百步蛇 — 起源之地',
    price: 700,
    fit: 'Relaxed Boxy Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Burgundy 酒紅', hex: '#7a2e2a' },
      { name: 'Mustard 芥末黃', hex: '#c9952e' },
      { name: 'Ink Black 墨黑', hex: '#1e1c1a' },
    ],
    print: '絹印 Screen Print',
    description:
      'Retro American graphic tee featuring the Paiwan hundred-pacer snake (Vulung) — guardian of ancestors and the land we come from.',
    graphics: ['vulung'],
    images: { front: '/images/vulung-front.png', back: '/images/vulung-back.png' },
    releasedAt: '2026-09-20',
    sold: 412,
    isNew: true,
  },
  {
    id: 'kadjiadji-butterfly',
    name: 'KADJIADJI',
    subtitle: 'Butterfly Tee',
    nameZh: '蝴蝶',
    price: 700,
    fit: 'Relaxed Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Mustard 芥末黃', hex: '#c9952e' },
      { name: 'Earth Brown 土棕', hex: '#6b4a33' },
      { name: 'Ink Black 墨黑', hex: '#1e1c1a' },
    ],
    print: '絹印 Screen Print',
    description:
      'Inspired by Kadjiadji (Butterfly), combining retro illustration and bold typography for a light, artistic vibe.',
    graphics: ['kadjiadji'],
    images: { front: '/images/kadjiadji-front.png', back: '/images/kadjiadji-back.png' },
    releasedAt: '2026-08-12',
    sold: 268,
  },
  {
    id: 'vulung-sun-tradition-tomorrow',
    name: 'VULUNG / SUN',
    subtitle: 'Tradition Tomorrow Tee',
    nameZh: '百步蛇與太陽',
    price: 700,
    fit: 'Heavyweight Boxy Fit',
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Sun Orange 日橘', hex: '#c8662d' },
      { name: 'Burgundy 酒紅', hex: '#7a2e2a' },
      { name: 'Cream 米白', hex: '#efe8da' },
    ],
    print: '絹印 Screen Print',
    description:
      '70s vintage graphic design featuring a snake wrapping around the sun — the origin story, printed for tomorrow.',
    graphics: ['vulung', 'sun'],
    images: { front: '/images/sun-front.png', back: '/images/sun-back.png' },
    releasedAt: '2026-09-28',
    sold: 356,
    isNew: true,
  },
  {
    id: 'vl-logo',
    name: 'VL',
    subtitle: 'Visual Legacy Logo Tee',
    nameZh: '品牌標誌',
    price: 700,
    fit: 'Relaxed Boxy Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Earth Brown 土棕', hex: '#6b4a33' },
      { name: 'Burgundy 酒紅', hex: '#7a2e2a' },
      { name: 'Ink Black 墨黑', hex: '#1e1c1a' },
    ],
    print: '絹印 Screen Print',
    description: 'The everyday essential with a subtle screen-printed brand wordmark.',
    graphics: ['logo'],
    images: { front: '/images/logo-front.png', back: '/images/logo-back.png' },
    releasedAt: '2026-06-01',
    sold: 590,
  },
]

export function formatPrice(value: number) {
  return `NT$ ${value.toLocaleString('en-US')}`
}
