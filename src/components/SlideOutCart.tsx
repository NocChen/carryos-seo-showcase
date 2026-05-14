'use client'

import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { ShippingProgressBar } from './ShippingProgressBar'
import { ProductImage } from './ProductImage'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export function SlideOutCart() {
  const { items, isOpen, closeCart, subtotal, shipping, total, removeItem, updateQuantity, itemCount } = useCart()
  const { addToast } = useToast()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Desktop: slide-out */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] hidden h-full w-[420px] flex-col border-l border-border bg-surface-0 sm:flex"
          >
            <CartContent
              items={items}
              itemCount={itemCount}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              closeCart={closeCart}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
              addToast={addToast}
            />
          </motion.div>

          {/* Mobile: bottom sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[70] flex max-h-[85vh] flex-col rounded-t-2xl border border-border bg-surface-0 sm:hidden"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-surface-3" />
            </div>
            <CartContent
              items={items}
              itemCount={itemCount}
              subtotal={subtotal}
              shipping={shipping}
              total={total}
              closeCart={closeCart}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
              addToast={addToast}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function CartContent({
  items, itemCount, subtotal, shipping, total,
  closeCart, removeItem, updateQuantity, addToast,
}: {
  items: ReturnType<typeof useCart>['items']
  itemCount: number
  subtotal: number
  shipping: number
  total: number
  closeCart: () => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, qty: number) => void
  addToast: (msg: string, type?: 'success' | 'error' | 'info') => void
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Cart</h2>
          <p className="text-xs text-text-muted">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
        </div>
        <button
          onClick={closeCart}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-secondary transition-all hover:border-text-muted hover:text-text-primary"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-text-muted">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-30">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p className="text-sm">Your cart is empty</p>
            <button onClick={closeCart} className="mt-4 text-xs text-accent underline underline-offset-4">
              Continue shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4 p-6">
            <ShippingProgressBar />

            {items.map((item) => (
              <div key={item.product.id} className="flex gap-4 rounded-lg border border-border bg-surface-1 p-3">
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <ProductImage product={item.product} className="h-full w-full" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="text-sm font-medium text-text-primary">{item.product.name}</h3>
                      <button
                        onClick={() => {
                          removeItem(item.product.id)
                          addToast(`${item.product.name} removed from cart`, 'info')
                        }}
                        className="text-text-muted transition-colors hover:text-error"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-text-muted">${item.product.price}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-border text-xs text-text-secondary"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-sm text-text-primary">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded border border-border text-xs text-text-secondary"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-medium text-text-primary">
                      ${(item.product.price * item.quantity).toFixed(0)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="border-t border-border p-6">
          <div className="mb-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="text-text-primary">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Shipping</span>
              <span className="text-text-primary">
                {shipping === 0 ? <span className="text-success">Free</span> : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
              <span className="text-text-primary">Total</span>
              <span className="text-text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            onClick={closeCart}
            className="flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-black transition-all hover:bg-accent/90 hover:shadow-[0_0_30px_-5px_var(--color-accent)]"
          >
            Checkout — ${total.toFixed(2)}
          </Link>

          <button
            onClick={closeCart}
            className="mt-2 flex h-10 w-full items-center justify-center text-xs text-text-muted transition-colors hover:text-text-secondary"
          >
            Continue shopping
          </button>
        </div>
      )}
    </>
  )
}
