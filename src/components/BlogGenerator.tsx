'use client'

import { useState } from 'react'
import { useLanguage } from '@/components/LanguageProvider'

const SEO_TOPICS = [
  {
    title: 'Top 5 Tech EDC Items for Digital Nomads in 2024',
    keyword: 'tech edc digital nomad',
    cluster: 'Remote Work Gear',
    content: `
      ## The Rise of the Digital Nomad
      As remote work becomes the norm, having the right tech everyday carry (EDC) is no longer a luxury—it's a necessity.
      
      ### 1. High-Capacity Power Banks
      When you're working from a café in Bali or a train in Europe, power is everything. Look for GaN technology for faster charging in a smaller footprint.
      
      ### 2. Universal Adapters
      Don't get caught without a charge. A reliable universal adapter is the unsung hero of any digital nomad's pack.
      
      ### 3. Compact Mechanical Keyboards
      Typing on a laptop all day? Your wrists will thank you for investing in a low-profile mechanical keyboard.
      
      *Optimized for long-tail keywords to capture high-intent search traffic within the "Remote Work Gear" cluster.*
    `
  },
  {
    title: 'How to Optimize Your Backpack Weight for Everyday Carry',
    keyword: 'lightweight edc backpack',
    cluster: 'Carry Optimization',
    content: `
      ## Why Weight Matters
      Your spine health is critical. An overloaded backpack can lead to chronic pain. Let's optimize your EDC for weight without sacrificing utility.
      
      ### The Minimalist Approach
      Do you really need three charging cables? Consolidate. Use a single high-quality multi-cable.
      
      ### Titanium Over Steel
      When choosing tools, opt for titanium. It's incredibly strong but significantly lighter than stainless steel.
      
      *This post targets informational queries, establishing CARRYOS as an authority in the "Carry Optimization" space.*
    `
  },
  {
    title: 'GaN Chargers vs. Silicon: Why You Need to Upgrade',
    keyword: 'gan charger benefits edc',
    cluster: 'Power & Charging',
    content: `
      ## The Power Revolution
      Gallium Nitride (GaN) is changing the game for EDC enthusiasts. But why is it better than traditional silicon?
      
      ### Heat Dissipation
      GaN components are more efficient, meaning less energy is lost to heat. This allows chargers to be much smaller.
      
      ### Multi-Device Charging
      A single 65W GaN charger can power your laptop, phone, and earbuds simultaneously.
      
      *A targeted comparison post designed to rank for specific product-feature queries, driving traffic directly to our Power category.*
    `
  }
]

export function BlogGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [blog, setBlog] = useState<typeof SEO_TOPICS[0] | null>(null)
  const { t } = useLanguage()

  const handleGenerate = () => {
    setIsGenerating(true)
    setBlog(null)
    
    // Simulate AI generation time
    setTimeout(() => {
      setBlog((prev) => {
        let nextIndex = Math.floor(Math.random() * SEO_TOPICS.length)
        // If we picked the same one and there are other options, try again once
        if (prev && SEO_TOPICS[nextIndex].title === prev.title && SEO_TOPICS.length > 1) {
          nextIndex = (nextIndex + 1) % SEO_TOPICS.length
        }
        return SEO_TOPICS[nextIndex]
      })
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="rounded-2xl border border-border bg-surface-1 p-6 sm:p-8">
      <div className="mb-6">
        <h3 className="mb-2 text-xl font-bold text-text-primary">{t('aiContentGen')}</h3>
        <p className="text-sm leading-relaxed text-text-secondary">
          <strong className="text-accent">{t('recruiterNote')}</strong> {t('blogGenDesc')}
        </p>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 font-semibold text-black transition-all hover:bg-accent/90 disabled:opacity-70 sm:w-auto"
      >
        {isGenerating ? (
          <>
            <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('generating')}
          </>
        ) : (
          <>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            {t('generateBtn')}
          </>
        )}
      </button>

      {blog && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-text-secondary">
              {t('cluster')}: <span className="text-accent">{blog.cluster}</span>
            </span>
            <span className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs font-medium text-text-secondary">
              {t('targetKw')}: <span className="text-accent">{blog.keyword}</span>
            </span>
          </div>
          
          <div className="rounded-xl bg-surface-0 p-6 shadow-sm ring-1 ring-border">
            <h4 className="mb-4 text-2xl font-bold text-text-primary">{blog.title}</h4>
            <div 
              className="prose prose-invert max-w-none text-text-secondary prose-h2:text-xl prose-h2:text-text-primary prose-h3:text-lg prose-h3:text-text-primary prose-p:leading-relaxed prose-em:text-accent prose-em:not-italic prose-em:font-medium"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br/>').replace(/## (.*?)\n/g, '<h2>$1</h2>').replace(/### (.*?)\n/g, '<h3>$1</h3>') }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
