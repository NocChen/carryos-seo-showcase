'use client'

import { BlogGenerator } from '@/components/BlogGenerator'
import { useLanguage } from '@/components/LanguageProvider'

export function SeoShowcaseClient() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen pb-32">
      {/* Header Section */}
      <section className="border-b border-border bg-surface-1 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
            {t('techSeoDemo')}
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
            {t('seoShowcaseTitle')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-text-secondary">
            {t('seoShowcaseDesc')}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="space-y-16">
          
          {/* Section 1: Server-Side Rendering */}
          <section className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-text-primary">{t('ssrTitle')}</h2>
              <p className="text-text-secondary">{t('ssrDesc')}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface-1 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <h3 className="mb-2 font-bold text-text-primary">{t('ssrItem1Title')}</h3>
                <p className="text-sm text-text-secondary">{t('ssrItem1Desc')}</p>
              </div>
              <div className="rounded-xl border border-border bg-surface-1 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-text-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <h3 className="mb-2 font-bold text-text-primary">{t('ssrItem2Title')}</h3>
                <p className="text-sm text-text-secondary">{t('ssrItem2Desc')}</p>
              </div>
            </div>
          </section>

          {/* Section 2: Structured Data */}
          <section className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-text-primary">{t('schemaTitle')}</h2>
              <p className="text-text-secondary">{t('schemaDesc')}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-1 p-6">
              <p className="mb-6 text-sm leading-relaxed text-text-secondary">
                {t('schemaContent')}
              </p>
              <div className="overflow-hidden rounded-lg bg-[#0d1117] p-4 text-xs font-mono text-[#e6edf3]">
                <pre><code>{`{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Alpha 65W GaN Charger",
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": 45,
    "availability": "https://schema.org/InStock"
  }
}`}</code></pre>
              </div>
            </div>
          </section>

          {/* Section 3: AI Content Strategy */}
          <section className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-text-primary">{t('contentTitle')}</h2>
              <p className="text-text-secondary">{t('contentDesc')}</p>
            </div>
            <BlogGenerator />
          </section>

          {/* Section 4: i18n & Crawlability */}
          <section className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-text-primary">{t('i18nTitle')}</h2>
              <p className="text-text-secondary">{t('i18nDesc')}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface-1 p-6">
                <h3 className="mb-2 font-bold text-text-primary">{t('sitemapTitle')}</h3>
                <p className="text-sm mb-4 text-text-secondary">{t('sitemapContent')}</p>
                <a href="/sitemap.xml" target="_blank" className="text-sm text-accent underline underline-offset-4">{t('viewSitemap')}</a>
              </div>
              <div className="rounded-xl border border-border bg-surface-1 p-6">
                <h3 className="mb-2 font-bold text-text-primary">{t('i18nItemTitle')}</h3>
                <p className="text-sm text-text-secondary">{t('i18nItemContent')}</p>
              </div>
            </div>
          </section>

          {/* Section 5: Off-Page Backlink Strategy */}
          <section className="space-y-6">
            <div>
              <h2 className="mb-2 text-2xl font-bold text-text-primary">{t('backlinkTitle')}</h2>
              <p className="text-text-secondary">{t('backlinkDesc')}</p>
            </div>
            <div className="rounded-xl border border-border bg-surface-1 p-6">
              
              <div className="mb-8 flex items-center justify-between rounded-lg border border-border bg-surface-0 p-4">
                <div>
                  <h4 className="font-bold text-text-primary">{t('domainAuthority')}</h4>
                  <p className="text-xs text-text-secondary">{t('daDesc')}</p>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-accent bg-surface-1">
                  <span className="font-bold text-accent">{t('daScore').split('/')[0]}</span>
                </div>
              </div>

              <h3 className="mb-4 font-bold text-text-primary">{t('backlinkStrategy')}</h3>
              <p className="mb-4 text-sm leading-relaxed text-text-secondary">
                {t('backlinkP1')}
              </p>
              <ul className="space-y-4 text-sm text-text-secondary">
                <li className="flex items-start gap-2">
                  <svg className="mt-1 shrink-0 text-accent" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong className="text-text-primary">{t('bl1')}</strong> {t('bl1d')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-1 shrink-0 text-accent" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong className="text-text-primary">{t('bl2')}</strong> {t('bl2d')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="mt-1 shrink-0 text-accent" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  <span><strong className="text-text-primary">{t('bl3')}</strong> {t('bl3d')}</span>
                </li>
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
