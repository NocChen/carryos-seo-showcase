'use client'

import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { ProductCard } from '@/components/ProductCard'
import { ProductImage } from '@/components/ProductImage'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/components/LanguageProvider'

export default function ProductClient({ product, related }: { product: any, related: any[] }) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const { t } = useLanguage()
  const [quantity, setQuantity] = useState(1)
  const [isSticky, setIsSticky] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!product) {
    return null
  }

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addItem(product)
    addToast(`${quantity} × ${t(`prod_${product.slug}_name`)} ${t('addedToCart')}`)
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-text-secondary"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Grid
        </Link>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-48">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="overflow-hidden rounded-2xl">
              <ProductImage product={product} className="aspect-[4/3] w-full" />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`overflow-hidden rounded-lg transition-all ${
                    selectedImage === i ? 'ring-2 ring-accent' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <ProductImage product={product} className="aspect-square w-full" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-widest text-text-muted">
                  {t(product.category)}
                </span>
                <span className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-widest text-text-muted">
                  {t(product.useCase === 'commuter' ? 'theCommuter' : product.useCase === 'minimalist' ? 'theMinimalist' : 'theCreator')}
                </span>
                {product.inStock && (
                  <span className="flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-[10px] text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    In Stock
                  </span>
                )}
              </div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
                {t(`prod_${product.slug}_name`)}
              </h1>
              <p className="text-lg text-text-secondary">{t(`prod_${product.slug}_tagline`)}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-text-primary">${product.price}</span>
              {product.compareAtPrice && (
                <span className="text-xl text-text-muted line-through">${product.compareAtPrice}</span>
              )}
            </div>

            <p className="leading-relaxed text-text-secondary">
              {product.description}
            </p>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">Specifications</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-surface-1 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">Weight</p>
                  <p className="font-mono text-sm text-text-primary">{product.weight}</p>
                </div>
                <div className="rounded-lg border border-border bg-surface-1 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-text-muted">Dimensions</p>
                  <p className="font-mono text-sm text-text-primary">{product.dimensions}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">Materials</h3>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-[10px] text-accent"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-text-muted">Features</h3>
              <ul className="space-y-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-accent">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-12 w-12 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
                <span className="w-10 text-center font-mono text-sm text-text-primary">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-12 w-12 items-center justify-center text-text-secondary transition-colors hover:text-text-primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
              <button
                onClick={handleAdd}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-black transition-all hover:bg-accent/90 hover:shadow-[0_0_30px_-5px_var(--color-accent)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add to Cart — ${(product.price * quantity).toFixed(0)}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-32">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-text-primary">Complete the Kit</h2>
              <p className="text-sm text-text-secondary">More from {product.category}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className={`fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface-0/90 backdrop-blur-xl transition-all duration-300 ${
          isSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 overflow-hidden rounded-lg">
              <ProductImage product={product} className="h-full w-full" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-text-primary">{t(`prod_${product.slug}_name`)}</p>
              <p className="text-lg font-bold text-text-primary">${product.price}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-lg border border-border bg-surface-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center text-text-secondary"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
              <span className="w-8 text-center font-mono text-sm text-text-primary">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-10 w-10 items-center justify-center text-text-secondary"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex h-10 items-center gap-2 rounded-full bg-accent px-6 text-xs font-semibold text-black transition-all hover:bg-accent/90"
            >
              Add to Cart — ${(product.price * quantity).toFixed(0)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
