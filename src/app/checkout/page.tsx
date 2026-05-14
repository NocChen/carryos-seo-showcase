'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/hooks/useCart'
import { useToast } from '@/hooks/useToast'
import { CheckoutStep } from '@/lib/types'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { stripePromise } from '@/lib/stripe'
import Link from 'next/link'

function CheckoutLayout({ step, children }: { step: CheckoutStep; children: React.ReactNode }) {
  const items = [
    { id: 'shipping' as const, label: 'Shipping', step: 1 },
    { id: 'payment' as const, label: 'Payment', step: 2 },
    { id: 'confirmation' as const, label: 'Confirm', step: 3 },
  ]

  const currentIndex = items.findIndex((i) => i.id === step)

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <div className="mb-12">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-xs text-text-muted transition-colors hover:text-text-secondary"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Grid
        </Link>

        <div className="flex items-center justify-between">
          {items.map((item, i) => (
            <div key={item.id} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold ${
                  i <= currentIndex ? 'bg-accent text-black' : 'border border-border text-text-muted'
                }`}
              >
                {i < currentIndex ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  item.step
                )}
              </div>
              <span className={`hidden text-xs sm:inline ${i <= currentIndex ? 'text-text-primary' : 'text-text-muted'}`}>
                {item.label}
              </span>
              {i < items.length - 1 && (
                <div className={`mx-2 h-px w-8 sm:mx-4 sm:w-12 ${i < currentIndex ? 'bg-accent' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  )
}

function ShippingForm({ onNext }: { onNext: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const canContinue = name.length > 0 && email.length > 0 && address.length > 0

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">Shipping</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Chen"
            className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@example.com"
            className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent" />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Tech Lane"
            className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">City</label>
          <input className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent" placeholder="San Francisco" />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">ZIP Code</label>
          <input className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent" placeholder="94105" />
        </div>
      </div>
      <button onClick={onNext} disabled={!canContinue}
        className={`flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold ${
          canContinue ? 'bg-accent text-black hover:bg-accent/90' : 'cursor-not-allowed bg-surface-2 text-text-muted'
        }`}>
        Continue to Payment
      </button>
    </div>
  )
}

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '14px',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#f5f5f5',
      '::placeholder': { color: '#666666' },
      iconColor: '#00FFFF',
    },
    invalid: { color: '#ef4444', iconColor: '#ef4444' },
  },
}

function StripePaymentForm({ onNext }: { onNext: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 2999 }),
      })
      const { clientSecret } = await res.json()

      const card = elements.getElement(CardElement)
      if (!card) return

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, { payment_method: { card } })
      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
        addToast(stripeError.message || 'Payment failed', 'error')
      } else {
        addToast('Payment successful!')
        onNext()
      }
    } catch {
      setError('Something went wrong.')
      addToast('Payment failed', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">Payment</h2>
      <div className="mb-6 flex gap-3">
        <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-accent bg-accent/5 px-4 py-3 text-xs font-medium text-accent">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          Credit Card
        </button>
        <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-xs font-medium text-text-secondary">Apple Pay</button>
        <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-4 py-3 text-xs font-medium text-text-secondary">Google Pay</button>
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-text-secondary">Card Details</label>
        <div className="rounded-lg border border-border bg-surface-1 px-4 py-3 transition-colors focus-within:border-accent">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
      </div>
      {error && <div className="rounded-lg border border-error/30 bg-error/5 px-4 py-3 text-xs text-error">{error}</div>}
      <div className="rounded-lg border border-border bg-surface-1 p-4">
        <p className="text-xs text-text-muted">
          🔒 Test mode — use card <span className="font-mono text-text-secondary">4242 4242 4242 4242</span> with any future date and CVC.
        </p>
      </div>
      <button type="submit" disabled={!stripe || loading}
        className={`flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold ${
          stripe && !loading ? 'bg-accent text-black hover:bg-accent/90' : 'cursor-not-allowed bg-surface-2 text-text-muted'
        }`}>
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
            </svg>
            Processing...
          </span>
        ) : 'Review Order'}
      </button>
    </form>
  )
}

function SimulatedPaymentForm({ onNext }: { onNext: () => void }) {
  const { addToast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    addToast('Payment successful!')
    setLoading(false)
    onNext()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-text-primary">Payment</h2>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-text-secondary">Card Number</label>
          <input type="text" placeholder="4242 4242 4242 4242" defaultValue="4242 4242 4242 4242"
            className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">Expiry</label>
            <input type="text" placeholder="MM/YY" defaultValue="12/28"
              className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-secondary">CVC</label>
            <input type="text" placeholder="123" defaultValue="123"
              className="w-full rounded-lg border border-border bg-surface-1 px-4 py-3 font-mono text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-accent" />
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-border bg-surface-1 p-4">
        <p className="text-xs text-text-muted">
          🔒 Simulated checkout — no real payment.
        </p>
      </div>
      <button type="submit" disabled={loading}
        className={`flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold ${
          !loading ? 'bg-accent text-black hover:bg-accent/90' : 'cursor-not-allowed bg-surface-2 text-text-muted'
        }`}>
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
            </svg>
            Processing...
          </span>
        ) : 'Review Order'}
      </button>
    </form>
  )
}

function PaymentForm({ onNext }: { onNext: () => void }) {
  const [hasStripe, setHasStripe] = useState<boolean | null>(null)

  useEffect(() => {
    stripePromise.then((s) => setHasStripe(!!s))
  }, [])

  if (hasStripe === null) {
    return (
      <div className="flex items-center justify-center py-12">
        <svg className="h-6 w-6 animate-spin text-accent" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
          <path d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" fill="currentColor" className="opacity-75" />
        </svg>
      </div>
    )
  }

  if (hasStripe) {
    return (
      <Elements stripe={stripePromise}>
        <StripePaymentForm onNext={onNext} />
      </Elements>
    )
  }

  return <SimulatedPaymentForm onNext={onNext} />
}

function Confirmation({ total, onComplete }: { total: number; onComplete: () => void }) {
  const [orderNumber] = useState(() => Math.random().toString(36).slice(2, 8).toUpperCase())

  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-text-primary">Order Confirmed</h2>
      <p className="text-text-secondary">
        Your payment of <span className="font-semibold text-text-primary">${total.toFixed(2)}</span> has been processed.
      </p>
      <div className="rounded-lg border border-border bg-surface-1 p-6 text-left">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-muted">Order #{orderNumber}</p>
        <p className="text-xs text-text-muted">This is a simulated purchase — no real transaction occurred.</p>
      </div>
      <button onClick={onComplete}
        className="flex h-12 w-full items-center justify-center rounded-full bg-accent text-sm font-semibold text-black hover:bg-accent/90">
        Continue Shopping
      </button>
    </div>
  )
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart()
  const [step, setStep] = useState<CheckoutStep>('shipping')

  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-text-muted">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-30">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <p className="text-lg">Your cart is empty</p>
        <Link href="/" className="text-sm text-accent underline underline-offset-4">Browse products</Link>
      </div>
    )
  }

  const handleNext = () => {
    if (step === 'shipping') setStep('payment')
    else if (step === 'payment') setStep('confirmation')
  }

  const handleComplete = () => {
    clearCart()
    setStep('shipping')
    window.location.href = '/'
  }

  return (
    <CheckoutLayout step={step}>
      {step === 'shipping' && <ShippingForm onNext={handleNext} />}
      {step === 'payment' && <PaymentForm onNext={handleNext} />}
      {step === 'confirmation' && <Confirmation total={total} onComplete={handleComplete} />}
    </CheckoutLayout>
  )
}
