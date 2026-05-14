'use client'

import { useLanguage } from '@/components/LanguageProvider'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="text-lg font-bold tracking-tighter text-text-primary">CARRY</span>
              <span className="text-lg font-light tracking-tighter text-accent">OS</span>
            </div>
            <p className="text-sm leading-relaxed text-text-muted">
              Curated tech EDC gear for the discerning carry enthusiast.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">{t('categories')}</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>{t('power')}</li>
              <li>{t('carry')}</li>
              <li>{t('utility')}</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-muted">{t('info')}</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>{t('shipping')}</li>
              <li>{t('warranty')}</li>
              <li>{t('contact')}</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between border-t border-border pt-6 sm:flex-row">
          <div className="text-xs text-text-muted">
            CarryOS — Mock Storefront. Not a real store.
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs text-text-muted sm:mt-0">
            <span>{t('createdBy')}: <span className="font-medium text-text-primary">Hazel</span></span>
            <span>{t('wechat')}: <span className="font-medium text-text-primary">shashalatte</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
