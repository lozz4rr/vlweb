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
@@ -21,8 +21,8 @@ export function SiteFooter() {
</div>
</div>

          {/* 右側：上半部選單 + 下半部品牌介紹（無分隔線） */}
          <div className="flex flex-col justify-between gap-12 lg:col-span-5 lg:pl-6">
          {/* 右側：上半部選單 + 向上靠攏的品牌理念（無多餘拉長空隙與分隔線） */}
          <div className="flex flex-col justify-start gap-8 lg:col-span-5 lg:pl-6">

{/* 右邊上半：HELP 與 VL 導航群組 */}
<div className="flex gap-16 sm:gap-24">
@@ -80,8 +80,8 @@ export function SiteFooter() {
</div>
</div>

            {/* 右邊下半：品牌標語與中文精神（已完全拿掉分隔線） */}
            <div className="pt-4 lg:pt-0">
            {/* 右邊下半：位置往上靠攏，緊接在選單下方 */}
            <div className="pt-2">
<span className="font-mono text-[11px] uppercase tracking-[0.25em] text-cream/40">
VL — 2026
</span>
