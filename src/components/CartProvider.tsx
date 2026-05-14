'use client'

import { CartProvider as Provider } from '@/hooks/useCart'
import { ToastProvider } from '@/hooks/useToast'

export function CartProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </Provider>
  )
}
