'use client'

import { useLanguage } from '@/components/LanguageProvider'
import { motion } from 'framer-motion'

const resumeData = {
  en: {
    name: 'Hazel (NocChen)',
    title: 'AI Automation & Operations Specialist',
    tags: ['Bilingual (EN/ZH)', 'AI Workflows', 'SEO & Marketing', 'Product Development'],
    summary: 'With 3 years of cross-platform social media operations and product development experience, alongside 2 years of deep experience in deploying AI workflow automation. I excel at deeply integrating cutting-edge LLMs (e.g., GPT-4, Claude) and image generation technologies (Midjourney, Stable Diffusion) into commercial SOPs. Possessing strong cross-cultural communication and project execution skills, I have repeatedly reduced customer acquisition costs and significantly shortened product development cycles for enterprises by deploying AI Agent automation systems and optimizing content strategies.',
    experienceTitle: 'Work Experience',
    educationTitle: 'Education',
    otherProjectsTitle: 'Other Projects',
    experiences: [
      {
        company: 'Shenzhen Chuanqi Innovation Co., Ltd',
        role: 'Operations / AI Automation Lead',
        period: 'Aug 2023 - Jun 2025',
        bullets: [
          'Content Marketing & SEO Optimization: Led SEO optimization for the company website (icdrex.com). Used AI to batch-generate high-quality chip/consumer electronics industry blogs, trend analysis reports, and podcast scripts. Successfully drove core keyword rankings up, securing over 3000 organic search clicks in a single month.',
          'AI Automated Lead Generation: Independently deployed an AI Agent-based automated overseas customer search and inquiry response system, dramatically increasing lead acquisition rates and reducing manual customer service costs.',
          'Virtual IP & Cost Reduction: Leveraged AI image and text generation technologies to incubate and operate virtual personas, automating the production of social media marketing materials and significantly lowering Customer Acquisition Cost (CAC).',
          'Internal Training: Spearheaded internal AI technology training, automating routine workflows to elevate overall team delivery efficiency.'
        ]
      },
      {
        company: 'Wenshan Qidan Sanqi Network Co., Ltd',
        role: 'E-commerce Operations / Product Manager',
        period: 'Jun 2022 - Jul 2023',
        bullets: [
          'AI-Driven Product Development: Utilized ChatGPT combined with Stable Diffusion to establish a "Concept Design to Prototype Rendering" automated SOP. Successfully shortened the development cycle of new products like "Sanqi Flower Herbal Tea" by a full month, rapidly providing product departments with finalized packaging design prototypes.',
          'Automated Market Research: Built a standardized data processing workflow using GPT-4 to fully automate competitor tracking and target audience persona analysis, providing precise data support for new product pricing and selling point extraction.',
          'Organizational Efficiency & Executive Assistance: Built an internal enterprise AI knowledge base and completed staff training; assisted the CEO in efficiently handling cross-departmental coordination, meeting brief extraction, and presentation generation, ensuring rapid top-down execution of core business initiatives.'
        ]
      },
      {
        company: 'Yunnan Tuoben E-commerce Co., Ltd',
        role: 'E-commerce Operations / Product Development',
        period: 'Nov 2020 - Jun 2022',
        bullets: [
          'Traffic & Conversion Dual Growth: Stabilized the live stream conversion ROI at 3 through refined content strategy iteration and paid traffic (Qianchuan/DOU+) optimization. Achieved 400k GMV in a single node during the "March 3" campaign.',
          'Team Management & Coordination: Fully supervised and coordinated the daily operations of a 10+ person TikTok e-commerce team, managing the full lifecycle from event planning and creative shooting to post-production execution.',
          'Supply Chain & Product Design: Determined product specifications based on deep market research, led product packaging design, and seamlessly integrated with the supply chain to ensure mass production quality and delivery times.'
        ]
      }
    ],
    education: {
      school: 'United World College Changsha China',
      year: 'Graduated 2019',
      major: 'Major: Economics, Drama, Advanced Mathematics'
    },
    otherProjects: [
      {
        title: 'International Drama Incubation Camp - Teaching Assistant',
        desc: 'Managed camp operations and cross-lingual assistance across Shanghai, Kunming, and Thailand stops, ensuring smooth collaboration among multinational art teams.'
      },
      {
        title: 'Little Big Light Int\'l Film Festival / Huawei France Startup Summit Doc - Assistant Director',
        desc: 'Participated in the preparation and on-site scheduling of the Shenzhen station documentary, assisting the director in filming and narrative framework construction.'
      },
      {
        title: 'Creator Manager',
        desc: 'Provided creator management and content strategy optimization services for top Swedish YouTubers.'
      }
    ]
  },
  zh: {
    name: 'Hazel (NocChen)',
    title: 'AI 自动化与运营专家',
    tags: ['中英双母语', 'AI 工作流自动化', 'SEO 与内容营销', '产品开发'],
    summary: '拥有 3 年跨平台社媒运营与产品开发经验，以及 2 年深度 AI 工作流自动化落地经验。擅长将前沿大语言模型（如 GPT-4、Claude）与图像生成技术（Midjourney、Stable Diffusion）深度整合进商业化 SOP 中。具备极强的跨文化沟通与项目落地能力，曾多次通过部署 AI Agent 自动化系统与优化内容策略，为企业大幅降低获客成本并显著缩短产品研发周期。',
    experienceTitle: '工作经历',
    educationTitle: '教育背景',
    otherProjectsTitle: '其他项目经历',
    experiences: [
      {
        company: '深圳传祺科创有限公司',
        role: '运营 / AI自动化主管',
        period: '2023.08 - 2025.06',
        bullets: [
          '内容营销与 SEO 优化： 负责公司官网 (icdrex.com) 的 SEO 优化，利用 AI 批量生成高质量的芯片/消费电子行业 Blog、趋势分析报告及 Podcast 脚本。成功带动网站核心关键词排名攀升，单月斩获超过 3000 的自然搜索点击量。',
          'AI 自动化获客体系搭建： 独立部署基于 AI Agent 的境外自动化客户搜寻与问询响应系统，大幅提高潜在客户线索获取率并有效降低人工客服成本。',
          '虚拟 IP 与降本增效： 运用 AI 图像与文本生成技术进行虚拟人设账号孵化与运营，自动化产出新媒体营销物料，大幅降低单客获取成本 (CAC)。',
          '内部赋能： 主导公司内部的 AI 技术培训，将常规工作流程自动化，整体提升团队交付效率。'
        ]
      },
      {
        company: '文山七丹三七网络有限公司',
        role: '电商运营/产品经理',
        period: '2022.06 - 2023.07',
        bullets: [
          'AI 驱动的产品研发： 运用 ChatGPT 结合 Stable Diffusion 建立“概念设计-原型渲染”自动化 SOP。成功将“三七花凉茶饮”等新产品的开发周期缩短了整整一个月，并快速为产品部门提供最终被采纳的包装设计原型。',
          '市场调研自动化： 利用 GPT-4 构建标准化的数据处理工作流，实现竞品追踪、目标受众画像分析的全面自动化，为新品定价和卖点提炼提供精准的数据支撑。',
          '组织提效与高管协助： 搭建企业内部 AI 知识库并完成全员培训；协助 CEO 高效处理跨部门协调、会议简报提取与演示文稿生成，确保核心商业举措的快速下达与执行。'
        ]
      },
      {
        company: '云南拓奔电子商务有限公司',
        role: '电商运营/产品开发',
        period: '2020.11 - 2022.06',
        bullets: [
          '流量与转化双线增长： 通过精细化的内容策略迭代与投流（千川/DOU+）优化，将直播间成交模型 ROI 稳定在 3，并在“三月三”活动期间单节点斩获 40万 GMV。',
          '团队管理与统筹： 全权监督并协调 10 人以上抖音电商团队的日常运营，负责从活动策划、创意拍摄到后期执行的全链路管理。',
          '供应链对接与产品设计： 基于深度市场调研确定产品规格与分量，主导产品外包装设计，并无缝对接供应链确保量产质量与交期。'
        ]
      }
    ],
    education: {
      school: 'United World College Changsha China',
      year: '2019年 毕业',
      major: '主修：经济，戏剧，高等数学'
    },
    otherProjects: [
      {
        title: '国际戏剧孵化营 助教',
        desc: '负责上海、昆明、泰国三站的营期运营与跨语言协助，保障跨国艺术团队的顺畅协作。'
      },
      {
        title: 'Little Big Light 国际电影艺术节 / 华为法国创业峰会纪录片 副导演',
        desc: '参与深圳站纪录片的筹备与现场调度，协助导演完成影片拍摄与叙事框架构建。'
      },
      {
        title: 'Creator Manager',
        desc: '曾为瑞典头部 YouTuber 提供创作者管理与内容策略优化服务。'
      }
    ]
  }
}

export function ResumeClient() {
  const { language } = useLanguage()
  const data = resumeData[language]

  return (
    <div className="min-h-screen bg-surface-0 pb-20 pt-8">
      <div className="mx-auto max-w-4xl px-6">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 border-b border-border pb-8"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary sm:text-6xl">
            {data.name}
          </h1>
          <p className="mb-6 text-xl font-medium text-accent">
            {data.title}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {data.tags.map((tag, i) => (
              <span key={i} className="rounded-full bg-surface-1/50 border border-border px-4 py-1.5 text-sm text-text-secondary backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-base leading-relaxed text-text-secondary">
            {data.summary}
          </p>
        </motion.div>

        {/* Experience Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="mb-8 flex items-center gap-4 text-2xl font-semibold text-text-primary">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-1 text-accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </span>
            {data.experienceTitle}
          </h2>
          <div className="space-y-12 pl-4 border-l border-border/50">
            {data.experiences.map((exp, i) => (
              <div key={i} className="relative pl-6">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
                <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-semibold text-text-primary">{exp.company}</h3>
                  <span className="text-sm font-medium text-text-muted">{exp.period}</span>
                </div>
                <p className="mb-4 text-base font-medium text-text-secondary">{exp.role}</p>
                <ul className="space-y-3">
                  {exp.bullets.map((bullet, j) => {
                    const parts = bullet.split('：')
                    return (
                      <li key={j} className="text-sm leading-relaxed text-text-secondary flex items-start">
                        <span className="mr-2 mt-1.5 block h-1 w-1 min-w-[4px] rounded-full bg-text-muted" />
                        <span>
                          {parts.length > 1 ? (
                            <>
                              <strong className="text-text-primary">{parts[0]}：</strong>
                              {parts[1]}
                            </>
                          ) : (
                            bullet
                          )}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          {/* Education Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 flex items-center gap-4 text-2xl font-semibold text-text-primary">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-1 text-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </span>
              {data.educationTitle}
            </h2>
            <div className="rounded-2xl border border-border bg-surface-1/30 p-6 backdrop-blur-sm">
              <h3 className="mb-2 text-lg font-semibold text-text-primary">{data.education.school}</h3>
              <p className="mb-2 text-sm text-accent">{data.education.year}</p>
              <p className="text-sm text-text-secondary">{data.education.major}</p>
            </div>
          </motion.div>

          {/* Other Projects Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-8 flex items-center gap-4 text-2xl font-semibold text-text-primary">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-1 text-accent">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </span>
              {data.otherProjectsTitle}
            </h2>
            <div className="space-y-6">
              {data.otherProjects.map((project, i) => (
                <div key={i} className="rounded-2xl border border-border bg-surface-1/30 p-6 backdrop-blur-sm">
                  <h3 className="mb-2 text-base font-semibold text-text-primary">{project.title}</h3>
                  <p className="text-sm leading-relaxed text-text-secondary">{project.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
