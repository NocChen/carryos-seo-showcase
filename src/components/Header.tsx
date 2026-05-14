'use client'

import Link from 'next/link'
import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/components/LanguageProvider'

export function Header() {
  const { itemCount, openCart } = useCart()
  const router = useRouter()
  const { language, setLanguage, t } = useLanguage()

  const handleNav = (category: string) => {
    if (window.location.pathname !== '/') {
      router.push(`/?category=${category}`)
      return
    }
    router.push(`/?category=${category}`, { scroll: false })
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-surface-0/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tighter text-text-primary">
            CARRY
          </span>
          <span className="text-2xl font-light tracking-tighter text-accent">
            OS
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/seo-showcase" className="text-sm font-medium text-accent transition-colors hover:text-accent/80">
            {t('seoShowcase')}
          </Link>
          <button
            onClick={() => handleNav('power')}
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            {t('power')}
          </button>
          <button
            onClick={() => handleNav('carry')}
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            {t('carry')}
          </button>
          <button
            onClick={() => handleNav('utility')}
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            {t('utility')}
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-1 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-text-secondary hover:text-text-primary"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {language === 'en' ? 'ZH' : 'EN'}
          </button>
          
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition-all hover:border-accent hover:text-accent"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="hidden sm:inline">{t('cart')}</span>
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-black">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
