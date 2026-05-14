'use client'

import { useCart } from '@/hooks/useCart'

export function ShippingProgressBar() {
  const { freeShippingRemaining, subtotal } = useCart()

  const progress = Math.min(100, (subtotal / 75) * 100)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        {freeShippingRemaining > 0 ? (
          <span className="text-text-muted">
            <span className="text-accent">${freeShippingRemaining.toFixed(0)}</span> away from free shipping
          </span>
        ) : (
          <span className="text-success">You qualify for free shipping!</span>
        )}
      </div>
      <div className="h-1 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, progress)}%` }}
        />
      </div>
    </div>
  )
}
