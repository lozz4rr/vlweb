import { Hero } from '@/components/hero'
import { Lookbook } from '@/components/lookbook'
import { MiniCart } from '@/components/mini-cart'
import { NewDrop } from '@/components/new-drop'
import { OurStory } from '@/components/our-story'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { VulungBanner } from '@/components/vulung-banner'

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <NewDrop />
        <VulungBanner />
        <OurStory />
        <Lookbook />
      </main>
      <SiteFooter />
      <MiniCart />
    </>
  )
}
