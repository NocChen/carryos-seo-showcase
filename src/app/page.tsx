import { Suspense } from 'react'
import { Hero } from '@/components/Hero'
import { ProductGrid } from '@/components/ProductGrid'

function GridFallback() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <div className="mb-2 h-8 w-48 animate-pulse rounded bg-surface-2" />
          <div className="h-4 w-24 animate-pulse rounded bg-surface-2" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-xl border border-border bg-surface-1">
              <div className="aspect-[4/3] animate-pulse bg-surface-2" />
              <div className="space-y-3 p-4">
                <div className="h-3 w-16 animate-pulse rounded bg-surface-2" />
                <div className="h-4 w-36 animate-pulse rounded bg-surface-2" />
                <div className="h-3 w-48 animate-pulse rounded bg-surface-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<GridFallback />}>
        <ProductGrid />
      </Suspense>
    </>
  )
}
