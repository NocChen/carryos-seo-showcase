'use client'

import Link from 'next/link'
import { Product } from '@/lib/types'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { ProductImage } from './ProductImage'
import { useRef, useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addToast } = useToast()
  const { t } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)
  const [touchX, setTouchX] = useState(0)
  const [swiping, setSwiping] = useState(false)
  const [swipeOffset, setSwipeOffset] = useState(0)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    addToast(`${t(`prod_${product.slug}_name`)} ${t('addedToCart')}`)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchX(e.touches[0].clientX)
    setSwiping(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!swiping) return
    const diff = e.touches[0].clientX - touchX
    if (diff < 0) setSwipeOffset(Math.max(diff, -80))
  }

  const handleTouchEnd = () => {
    if (swipeOffset < -50) {
      addItem(product)
      addToast(`${t(`prod_${product.slug}_name`)} ${t('addedToCart')}`)
    }
    setSwiping(false)
    setSwipeOffset(0)
  }

  return (
    <div
      ref={cardRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface-1 transition-all hover:border-accent/30"
      style={{ transform: `translateX(${swipeOffset}px)`, transition: swiping ? 'none' : 'transform 0.3s ease' }}
    >
      <div
        className={`absolute right-0 top-0 z-20 flex h-full w-20 items-center justify-center bg-accent transition-opacity duration-300 ${
          swipeOffset < -30 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </div>

      <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] overflow-hidden">
        <ProductImage product={product} className="h-full w-full" />
        {product.compareAtPrice && (
          <div className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase text-black">
            Sale
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={handleAdd}
            className="translate-y-2 rounded-full bg-accent px-6 py-2.5 text-xs font-semibold text-black opacity-0 shadow-lg transition-all hover:bg-accent/90 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {t('quickAdd')}
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-text-muted">
            {t(product.category)}
          </span>
          <div className="flex gap-1">
            <span className="text-xs text-text-muted">{product.weight}</span>
          </div>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold text-text-primary transition-colors hover:text-accent">
            {t(`prod_${product.slug}_name`)}
          </h3>
        </Link>

        <p className="text-xs leading-relaxed text-text-secondary line-clamp-2">
          {t(`prod_${product.slug}_tagline`)}
        </p>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-text-primary">${product.price}</span>
            {product.compareAtPrice && (
              <span className="text-sm text-text-muted line-through">${product.compareAtPrice}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-secondary transition-all hover:border-accent hover:bg-accent hover:text-black"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
