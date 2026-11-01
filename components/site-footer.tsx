'use client'

import Link from 'next/link'

export function SiteFooter() {
return (
<footer className="border-t border-border/20 bg-ink text-cream">
<div className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-12 md:pt-20">
<div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-8">

          {/* 左側：兩行 VISUAL LEGACY，恢復一開始的緊湊字距與字型質感 (text-cream/15) */}
          {/* 左側：加大版的兩行 VISUAL LEGACY，維持緊湊字距與原本的微透質感 */}
<div className="select-none pointer-events-none lg:col-span-7 flex flex-col justify-between">
            <div className="font-display font-extrabold uppercase leading-[0.78] tracking-tight text-cream/15 text-[clamp(4.8rem,13vw,10.5rem)]">
            <div className="font-display font-extrabold uppercase leading-[0.74] tracking-tight text-cream/15 text-[clamp(5.5rem,15vw,13.5rem)]">
<div>VISUAL</div>
<div>LEGACY</div>
</div>

{/* 桌面端左下方微型版權標註 */}
<div className="hidden lg:block pt-8 text-[10px] tracking-[0.25em] text-cream/40">
© {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.
</div>
</div>

          {/* 右側：上半部選單 + 下半部品牌介紹（無分隔線） */}
          <div className="flex flex-col justify-between gap-12 lg:col-span-5 lg:pl-6">
          {/* 右側：上半部選單 + 向上靠攏的品牌理念（無多餘拉長空隙與分隔線） */}
          <div className="flex flex-col justify-start gap-8 lg:col-span-5 lg:pl-6">

{/* 右邊上半：HELP 與 VL 導航群組 */}
<div className="flex gap-16 sm:gap-24">
{/* HELP */}
<div>
<span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
HELP
</span>
<ul className="mt-4 space-y-2.5 text-xs tracking-wider">
<li>
<Link href="#help" className="text-cream/80 transition-colors hover:text-cream">
Size Guide
</Link>
</li>
<li>
<Link href="#help" className="text-cream/80 transition-colors hover:text-cream">
Shipping
</Link>
</li>
<li>
<Link href="#help" className="text-cream/80 transition-colors hover:text-cream">
Contact
</Link>
</li>
</ul>
</div>

{/* VL */}
<div>
<span className="font-mono text-xs uppercase tracking-[0.25em] text-cream/40">
VL
</span>
<ul className="mt-4 space-y-2.5 text-xs tracking-wider">
<li>
<Link href="#about" className="text-cream/80 transition-colors hover:text-cream">
About
</Link>
</li>
<li>
<Link href="#story" className="text-cream/80 transition-colors hover:text-cream">
Story
</Link>
</li>
<li>
<a
href="https://instagram.com"
target="_blank"
rel="noopener noreferrer"
className="text-cream/80 transition-colors hover:text-cream"
>
Instagram
</a>
</li>
</ul>
</div>
</div>

            {/* 右邊下半：品牌標語與中文精神（已完全拿掉分隔線） */}
            <div className="pt-4 lg:pt-0">
            {/* 右邊下半：位置往上靠攏，緊接在選單下方 */}
            <div className="pt-2">
<span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/40">
VL — 2026
</span>
<h3 className="mt-2 font-display text-xl font-extrabold uppercase tracking-tight text-cream sm:text-2xl">
MADE TODAY. TRADITION TOMORROW.
</h3>
<p className="mt-2 font-serif-tc text-sm tracking-widest text-cream/70">
現代的創作就是未來的傳統
</p>
</div>

{/* 行動裝置端版權標註 */}
<div className="block lg:hidden border-t border-cream/10 pt-6 text-[10px] tracking-widest text-cream/40">
<span>© {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.</span>
</div>

</div>

</div>
</div>
</footer>
)
}
