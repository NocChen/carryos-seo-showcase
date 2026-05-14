import { Metadata } from 'next'
import { SeoShowcaseClient } from './SeoShowcaseClient'

export const metadata: Metadata = {
  title: 'SEO Showcase | Technical SEO Demonstration',
  description: 'An interactive dashboard demonstrating technical SEO, structured data, content clustering, and off-page backlink capabilities built directly into CARRYOS.',
  keywords: ['SEO Showcase', 'Technical SEO Specialist', 'E-commerce SEO', 'Backlink Strategy'],
}

export default function SeoShowcasePage() {
  return <SeoShowcaseClient />
}
