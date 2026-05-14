'use client'

import { useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { products, categories, useCases } from '@/lib/products'
import { ProductCard } from './ProductCard'
import { useLanguage } from '@/components/LanguageProvider'

export function ProductGrid() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { t } = useLanguage()

  const activeCategory = searchParams.get('category') || 'all'
  const activeUseCase = searchParams.get('useCase') || 'all'

  const setParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === 'all') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    const qs = params.toString()
    router.push(qs ? `/?${qs}` : '/', { scroll: false })
  }

  const filtered = useMemo(() => {
    let result = products
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory)
    }
    if (activeUseCase !== 'all') {
      result = result.filter((p) => p.useCase === activeUseCase)
    }
    return result
  }, [activeCategory, activeUseCase])

  return (
    <section id="products" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-text-primary">
            {t('gridTitle')}
          </h2>
          <p className="text-sm text-text-secondary">
            {filtered.length} {t('gridSubtitle')}
          </p>
        </div>

        <div id="categories" className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setParam('category', cat.id)}
              className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-accent text-black'
                  : 'border border-border bg-surface-1 text-text-secondary hover:border-text-muted hover:text-text-primary'
              }`}
            >
              <span>{cat.icon}</span>
              {t(cat.id)}
            </button>
          ))}
        </div>

        <div className="mb-12 flex flex-wrap gap-2">
          {useCases.map((uc) => (
            <button
              key={uc.id}
              onClick={() => setParam('useCase', uc.id)}
              className={`rounded-full px-3 py-1 text-[10px] uppercase tracking-wider transition-all ${
                activeUseCase === uc.id
                  ? 'bg-surface-2 text-accent'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {t(uc.id === 'all' ? 'all' : uc.id === 'commuter' ? 'theCommuter' : uc.id === 'minimalist' ? 'theMinimalist' : 'theCreator')}
            </button>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-text-muted">
            <p className="text-lg">{t('noProducts')}</p>
            <button
              onClick={() => router.push('/')}
              className="mt-4 text-sm text-accent underline underline-offset-4"
            >
              {t('clearFilters')}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
