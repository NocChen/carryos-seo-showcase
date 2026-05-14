'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'zh'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    seoShowcase: 'SEO Showcase',
    power: 'Power',
    carry: 'Carry',
    utility: 'Utility',
    cart: 'Cart',
    categories: 'Categories',
    info: 'Info',
    shipping: 'Shipping & Returns',
    warranty: 'Warranty',
    contact: 'Contact',
    resume: 'Resume',
    createdBy: 'Created by',
    wechat: 'WeChat',
    all: 'All',
    theCommuter: 'The Commuter',
    theMinimalist: 'The Minimalist',
    theCreator: 'The Creator',
    gridTitle: 'The Grid',
    gridSubtitle: 'products',
    quickAdd: 'Quick Add',
    addedToCart: 'added to cart',
    noProducts: 'No products match this filter.',
    clearFilters: 'Clear filters',
    
    // Hero
    newDrop: 'Hazel (NocChen) — 2026 Portfolio',
    yourPocket: 'AI Automation & ',
    upgraded: 'SEO Expert',
    heroDesc: 'This site is a fully functional Next.js e-commerce demo built to showcase my technical SEO, AI workflow automation, and cross-platform operations capabilities.',
    exploreGrid: 'View My Resume',
    browseUseCase: 'Explore Tech Demo',

    // Blog Generator
    aiContentGen: 'AI Content Clustering Generator',
    recruiterNote: 'Recruiter Note:',
    blogGenDesc: 'This tool demonstrates a programmatic approach to SEO. By generating targeted content clusters around specific long-tail keywords, we can rapidly build topical authority and capture niche search traffic.',
    generating: 'Generating SEO Content...',
    generateBtn: 'Generate Targeted SEO Blog',
    cluster: 'Cluster',
    targetKw: 'Target KW',

    // SEO Showcase Page
    techSeoDemo: 'Technical SEO Demonstration',
    seoShowcaseTitle: 'SEO Showcase',
    seoShowcaseDesc: 'This dashboard outlines the specific, technical SEO implementations built into this e-commerce platform. It goes beyond basic meta tags to demonstrate a deep understanding of modern search engine optimization.',
    
    ssrTitle: '1. Server-Side Rendering & Core Web Vitals',
    ssrDesc: 'Built on Next.js App Router for optimal indexability.',
    ssrItem1Title: 'SSR Product Pages',
    ssrItem1Desc: 'Product pages are rendered on the server before reaching the client, ensuring search engine bots immediately parse the fully hydrated HTML, crucial for e-commerce indexing.',
    ssrItem2Title: 'LCP Optimization',
    ssrItem2Desc: 'Images utilize the native `next/image` component for automatic WebP conversion, lazy loading, and exact sizing, directly improving the Largest Contentful Paint metric.',

    schemaTitle: '2. JSON-LD Structured Data',
    schemaDesc: 'Communicating directly with search engine algorithms.',
    schemaContent: 'If you inspect the source of any product page, you will find dynamically generated `application/ld+json` scripts. This Schema.org `Product` markup provides Google with explicit details like price, availability, and SKUs to enable Rich Snippets in SERPs.',

    contentTitle: '3. Content Clustering & Automation',
    contentDesc: 'Targeting long-tail keywords programmatically.',

    i18nTitle: '4. Crawlability & Internationalization',
    i18nDesc: 'Ensuring the site structure is sound globally.',
    sitemapTitle: 'Automated Sitemaps',
    sitemapContent: 'The `sitemap.xml` and `robots.txt` are dynamically generated to adapt as the product catalog grows, ensuring perfect crawl budgets.',
    viewSitemap: 'View Sitemap',
    i18nItemTitle: 'i18n Implementation',
    i18nItemContent: 'The site features a dynamic language toggle (EN/ZH). In a full production environment, this pairs with `hreflang` tags to serve localized content to specific regional search engines.',

    // Backlink section
    backlinkTitle: '5. Off-Page SEO & Backlink Strategy',
    backlinkDesc: 'Demonstrating authority building and outreach strategy.',
    domainAuthority: 'Domain Authority Score',
    daScore: '58/100',
    daDesc: 'Target DA for competitive EDC search terms.',
    backlinkStrategy: 'Our Link Building Strategy',
    backlinkP1: 'Securing high-quality backlinks is critical. We utilize a multi-pronged approach:',
    bl1: 'Digital PR & Tech Reviewers:',
    bl1d: ' Sending review units to YouTubers and tech blogs (e.g., MKBHD, The Verge) in exchange for do-follow links.',
    bl2: 'Broken Link Building:',
    bl2d: ' Identifying dead links on popular EDC forums and offering our guides as replacements.',
    bl3: 'Guest Posting:',
    bl3d: ' Writing authoritative articles on travel and remote work platforms.',

    // Products
    'prod_titan-gan-charger-65w_name': 'Titan GaN Charger 65W',
    'prod_titan-gan-charger-65w_tagline': 'Aerospace-grade power in your palm',
    'prod_carbon-power-bank-10k_name': 'Carbon Power Bank 10K',
    'prod_carbon-power-bank-10k_tagline': 'Ultralight 10,000mAh wrapped in forged carbon',
    'prod_loop-cable-3-in-1_name': 'Loop Cable 3-in-1',
    'prod_loop-cable-3-in-1_tagline': 'Magnetic self-stowing cable that disappears',
    'prod_mag-dock-traveler_name': 'MagDock Traveler',
    'prod_mag-dock-traveler_tagline': '3-in-1 wireless charging station',
    'prod_vegan-leather-cardholder_name': 'Veil Cardholder',
    'prod_vegan-leather-cardholder_tagline': 'Slim RFID-blocking cardholder',
    'prod_organizer-pouch_name': 'Grid Organizer Pouch',
    'prod_organizer-pouch_tagline': 'Modular cable organiser',
    'prod_sling-pack-mini_name': 'Sling Pack Mini',
    'prod_sling-pack-mini_tagline': '3L crossbody pack',
    'prod_titanium-key-organizer_name': 'Titanium KeyBar',
    'prod_titanium-key-organizer_tagline': 'Zero-rattle key management',
    'prod_precision-multi-tool_name': 'Precision Bit Driver',
    'prod_precision-multi-tool_tagline': '20 precision bits',
    'prod_edc-flashlight-ti_name': 'Pulse EDC Light',
    'prod_edc-flashlight-ti_tagline': '1000-lumen titanium flashlight',
    'prod_field-notes-cover-ti_name': 'Field Cover Titanium',
    'prod_field-notes-cover-ti_tagline': 'Pocket notebook armor',
    'prod_cable-organizer-clips_name': 'Cable Catch Set',
    'prod_cable-organizer-clips_tagline': 'Magnetic cable clips',
  },
  zh: {
    seoShowcase: 'SEO 展示',
    power: '电源',
    carry: '携带',
    utility: '实用工具',
    cart: '购物车',
    categories: '产品分类',
    info: '信息',
    shipping: '运输与退货',
    warranty: '保修',
    contact: '联系我们',
    resume: '个人简历',
    createdBy: '创建者',
    wechat: '微信',
    all: '全部',
    theCommuter: '通勤者',
    theMinimalist: '极简主义者',
    theCreator: '创作者',
    gridTitle: '产品矩阵',
    gridSubtitle: '个产品',
    quickAdd: '快速添加',
    addedToCart: '已加入购物车',
    noProducts: '没有匹配该过滤条件的产品。',
    clearFilters: '清除过滤器',

    // Hero
    newDrop: 'Hazel (NocChen) — 2026 作品集',
    yourPocket: 'AI 自动化与 ',
    upgraded: 'SEO 专家',
    heroDesc: '这是一个功能完备的 Next.js 电商演示网站，专为展示我的技术 SEO、AI 工作流自动化以及跨平台运营能力而构建。',
    exploreGrid: '查看我的简历',
    browseUseCase: '探索技术演示',

    // Blog Generator
    aiContentGen: 'AI 内容聚类生成器',
    recruiterNote: '招聘官注：',
    blogGenDesc: '此工具展示了编程式 SEO 方法。通过围绕特定长尾关键词生成目标内容集群，我们可以快速建立主题权威并捕获长尾搜索流量。',
    generating: '正在生成 SEO 内容...',
    generateBtn: '生成目标 SEO 博客',
    cluster: '聚类',
    targetKw: '目标关键词',

    // SEO Showcase Page
    techSeoDemo: '技术 SEO 演示',
    seoShowcaseTitle: 'SEO 展示',
    seoShowcaseDesc: '此面板概述了此电商平台内置的特定技术 SEO 实现。它不仅限于基本的元标签，还展示了对现代搜索引擎优化的深刻理解。',
    
    ssrTitle: '1. 服务端渲染 & 核心网页指标',
    ssrDesc: '基于 Next.js App Router 构建以优化索引。',
    ssrItem1Title: 'SSR 产品页',
    ssrItem1Desc: '产品页面在到达客户端之前在服务器上呈现，确保搜索引擎爬虫立即解析完全注水的 HTML，这对于电子商务索引至关重要。',
    ssrItem2Title: 'LCP 优化',
    ssrItem2Desc: '图片使用原生的 `next/image` 组件进行自动 WebP 转换、懒加载和精确尺寸调整，直接改善了最大内容绘制（LCP）指标。',

    schemaTitle: '2. JSON-LD 结构化数据',
    schemaDesc: '直接与搜索引擎算法通信。',
    schemaContent: '如果你检查任何产品页面的源代码，你会发现动态生成的 `application/ld+json` 脚本。这种 Schema.org 的 `Product` 标记为 Google 提供了价格、可用性和 SKU 等明确细节，以在搜索结果页面中启用丰富摘要。',

    contentTitle: '3. 内容聚类与自动化',
    contentDesc: '以编程方式定位长尾关键词。',

    i18nTitle: '4. 爬虫抓取与国际化',
    i18nDesc: '确保全球网站结构健全。',
    sitemapTitle: '自动化站点地图',
    sitemapContent: '`sitemap.xml` 和 `robots.txt` 会随着产品目录的增长而动态生成，确保完美的抓取预算。',
    viewSitemap: '查看站点地图',
    i18nItemTitle: '多语言实现 (i18n)',
    i18nItemContent: '该站点具有动态语言切换（中/英）功能。在完整的生产环境中，这将与 `hreflang` 标签配合使用，将本地化内容提供给特定的区域搜索引擎。',

    // Backlink section
    backlinkTitle: '5. 站外 SEO 与外链策略',
    backlinkDesc: '展示权威建设和拓展策略。',
    domainAuthority: '域名权威 (DA) 得分',
    daScore: '58/100',
    daDesc: '针对竞争性 EDC 搜索词的目标 DA。',
    backlinkStrategy: '我们的外链建设策略',
    backlinkP1: '获取高质量的反向链接至关重要。我们采用多管齐下的方法：',
    bl1: '数字公关和科技评测：',
    bl1d: '向 YouTube 博主和科技博客发送评测产品以换取 do-follow 链接。',
    bl2: '死链建设：',
    bl2d: '识别流行 EDC 论坛上的失效链接，并提供我们的指南作为替代。',
    bl3: '客座文章：',
    bl3d: '在旅行和远程工作平台上撰写权威文章。',

    // Products
    'prod_titan-gan-charger-65w_name': 'Titan 65W 氮化镓充电器',
    'prod_titan-gan-charger-65w_tagline': '掌心间的航空级动力',
    'prod_carbon-power-bank-10k_name': 'Carbon 10K 碳纤维移动电源',
    'prod_carbon-power-bank-10k_tagline': '超轻 10,000mAh 锻造碳纤维外壳',
    'prod_loop-cable-3-in-1_name': 'Loop 三合一充电线',
    'prod_loop-cable-3-in-1_tagline': '磁吸自动收纳，即刻隐形',
    'prod_mag-dock-traveler_name': 'MagDock 旅行充电站',
    'prod_mag-dock-traveler_tagline': '三合一折叠无线充电器',
    'prod_vegan-leather-cardholder_name': 'Veil 素皮卡包',
    'prod_vegan-leather-cardholder_tagline': '超薄 RFID 屏蔽卡包',
    'prod_organizer-pouch_name': 'Grid 收纳包',
    'prod_organizer-pouch_tagline': '模块化线缆收纳方案',
    'prod_sling-pack-mini_name': 'Sling Pack Mini 胸包',
    'prod_sling-pack-mini_tagline': '3L 容量斜跨包',
    'prod_titanium-key-organizer_name': 'Titanium 钛金属钥匙整理器',
    'prod_titanium-key-organizer_tagline': '无晃动噪音的钥匙管理',
    'prod_precision-multi-tool_name': '精修螺丝刀套装',
    'prod_precision-multi-tool_tagline': '20 枚精密批头',
    'prod_edc-flashlight-ti_name': 'Pulse 钛金属手电',
    'prod_edc-flashlight-ti_tagline': '1000 流明 AAA 电池大小',
    'prod_field-notes-cover-ti_name': 'Field Cover 钛金属笔记套',
    'prod_field-notes-cover-ti_tagline': '口袋笔记本的钛金护甲',
    'prod_cable-organizer-clips_name': '磁吸理线夹套装',
    'prod_cable-organizer-clips_tagline': '随处可贴的磁吸理线器',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLang = localStorage.getItem('carryos-lang') as Language
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('carryos-lang', lang)
  }

  const t = (key: string) => {
    // @ts-expect-error - key type is dynamic
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: (key: string) => {
        // @ts-expect-error - key type is dynamic
        return translations['en'][key] || key
      }
    }
  }
  return context
}
