'use client'

import { useState } from 'react'
import Image from 'next/image'

export function SiteFooter() {
  const [activeModal, setActiveModal] = useState<'size' | 'shipping' | 'contact' | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('paiwanlegacy@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <footer className="border-t border-[#1e1c1a]/15 bg-[#1e1c1a] text-[#efe8da]">
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-12 md:pt-20">
          <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-8">
            
            {/* 左側：兩行大字 */}
            <div className="pointer-events-none flex select-none flex-col justify-between lg:col-span-7">
              <div className="flex flex-col font-display text-[clamp(4.2rem,12vw,10.5rem)] font-extrabold uppercase leading-none tracking-tight text-[#efe8da]/15">
                <span className="block">VISUAL</span>
                <span className="block mt-1">LEGACY</span>
              </div>
              
              <div className="hidden pt-8 font-mono text-[10px] tracking-[0.25em] text-[#efe8da]/40 lg:block">
                © {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.
              </div>
            </div>

            {/* 右側：選單與品牌理念 */}
            <div className="flex flex-col justify-start gap-10 lg:col-span-5 lg:pl-6">
              {/* HELP 區塊：移除 VL，三欄等寬平均分配右上空間 */}
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#efe8da]/40">
                  HELP
                </span>
                <div className="mt-4 grid grid-cols-3 gap-4 border-b border-[#efe8da]/10 pb-6 font-mono text-xs tracking-wider">
                  <div>
                    <button
                      type="button"
                      onClick={() => setActiveModal('size')}
                      className="text-left text-[#efe8da]/80 transition-colors hover:text-[#efe8da]"
                    >
                      Size Guide
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setActiveModal('shipping')}
                      className="text-left text-[#efe8da]/80 transition-colors hover:text-[#efe8da]"
                    >
                      Shipping
                    </button>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => setActiveModal('contact')}
                      className="text-left text-[#efe8da]/80 transition-colors hover:text-[#efe8da]"
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>

              {/* 品牌理念說明 */}
              <div className="pt-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#efe8da]/40">
                  VL — 2026
                </span>
                <h3 className="mt-2 font-display text-xl font-extrabold uppercase tracking-tight text-[#efe8da] sm:text-2xl">
                  MADE TODAY. TRADITION TOMORROW.
                </h3>
                <p className="mt-2 text-sm tracking-widest text-[#efe8da]/70">
                  現代的創作就是未來的傳統
                </p>
              </div>

              <div className="block border-t border-[#efe8da]/10 pt-6 font-mono text-[10px] tracking-widest text-[#efe8da]/40 lg:hidden">
                <span>© {new Date().getFullYear()} VL — VISUAL LEGACY. ALL RIGHTS RESERVED.</span>
              </div>
            </div>

          </div>
        </div>
      </footer>

      {/* 彈出視窗（Modal）層 */}
      {activeModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setActiveModal(null)}
        >
          <div 
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-none border border-[#efe8da]/20 bg-[#1e1c1a] p-6 text-[#efe8da] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 右上角關閉按鈕 */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-xl leading-none text-[#efe8da]/60 transition-colors hover:text-[#efe8da]"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* 1. Size Guide 彈窗 */}
            {activeModal === 'size' && (
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4af37]">HELP</p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-wide">SIZE GUIDE</h3>
                <div className="relative mt-4 aspect-[4/5] w-full overflow-hidden border border-[#efe8da]/10 bg-[#f4efe6]">
                  <Image
                    src="/images/size-guide.jpg"
                    alt="VL Boxy Fit T-Shirt Size Guide"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}

            {/* 2. Shipping 彈窗 */}
            {activeModal === 'shipping' && (
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4af37]">HELP</p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-wide">SHIPPING</h3>
                <div className="mt-6 space-y-4 font-mono text-sm">
                  <div className="border border-[#efe8da]/15 bg-[#252220] p-4">
                    <p className="font-bold text-[#efe8da]">超商取貨（7-11 / 全家）</p>
                    <p className="mt-1 text-base text-[#d4af37]">運費 NT$ 50</p>
                    <p className="mt-2 text-xs text-[#efe8da]/60">寄出後約 2–3 個工作天送達指定門市。</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Contact 彈窗 */}
            {activeModal === 'contact' && (
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#d4af37]">HELP</p>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-wide">CONTACT US</h3>
                <div className="mt-6 space-y-4 text-sm">
                  <p className="text-sm leading-relaxed text-[#efe8da]/80">
                    若有訂單相關疑問或其他需求，歡迎來信或IG與我們聯繫：
                  </p>
                  
                  {/* Email 欄位與複製按鈕 */}
                  <div className="flex items-center justify-between border border-[#efe8da]/20 bg-[#252220] px-4 py-3">
                    <span className="font-mono text-xs text-[#efe8da] sm:text-sm">paiwanlegacy@gmail.com</span>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="ml-3 border border-[#efe8da]/30 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#efe8da] transition-colors hover:bg-[#efe8da] hover:text-[#1e1c1a]"
                    >
                      {copied ? 'COPIED!' : 'COPY'}
                    </button>
                  </div>

                  {/* 動作按鈕區 */}
                  <div className="grid grid-cols-1 gap-2 pt-2 sm:grid-cols-2">
                    <a
                      href="mailto:paiwanlegacy@gmail.com"
                      className="block w-full border border-[#efe8da] py-3 text-center font-mono text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[#efe8da] hover:text-[#1e1c1a]"
                    >
                      開啟郵件寄信 →
                    </a>
                    <a
                      href="https://www.instagram.com/vl_works/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full border border-[#efe8da]/40 py-3 text-center font-mono text-xs uppercase tracking-[0.2em] text-[#efe8da]/90 transition-colors hover:border-[#efe8da] hover:bg-[#efe8da] hover:text-[#1e1c1a]"
                    >
                      INSTAGRAM 私訊 →
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
