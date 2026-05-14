import { Metadata } from 'next'
import { getProductBySlug, products } from '@/lib/products'
import ProductClient from './ProductClient'
import Link from 'next/link'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  // Extract slug - In Next.js 15+, params is a Promise
  const { slug } = await params;
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Product Not Found | CARRYOS' }

  return {
    title: `${product.name} | CARRYOS — Curated Tech EDC`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: [
        {
          url: product.images?.[0] || '',
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.tagline,
      images: [product.images?.[0] || ''],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug)
  
  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-text-muted">
        <p className="text-lg">Product not found</p>
        <Link href="/" className="text-sm text-accent underline underline-offset-4">
          Back to Grid
        </Link>
      </div>
    )
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  // Generate JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images?.[0] || '',
    description: product.description,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: 'CARRYOS'
    },
    offers: {
      '@type': 'Offer',
      url: `https://carryos.com/products/${product.slug}`,
      priceCurrency: 'USD',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    }
  }

  return (
    <>
      {/* Inject Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient product={product} related={related} />
    </>
  )
}
