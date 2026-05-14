'use client'

import { useEffect, useRef } from 'react'
import { useLanguage } from '@/components/LanguageProvider'

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useLanguage()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initParticles = () => {
      particles = Array.from({ length: 40 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 255, 255, 0.3)'
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x
          const dy = particles[j].y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.08 * (1 - dist / 150)})`
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(draw)
    }

    resize()
    initParticles()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden border-b border-border">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-surface-0/80 via-surface-0/50 to-surface-0 z-[1]" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-accent-dim)_0%,_transparent_70%)] opacity-15 z-[1]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/50 px-4 py-1.5 text-xs text-text-muted backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          {t('newDrop')}
        </div>

        <h1 className="mb-4 text-5xl font-bold tracking-tight text-text-primary sm:text-7xl">
          {t('yourPocket')}
          <span className="bg-gradient-to-r from-accent via-accent/80 to-accent/60 bg-clip-text text-transparent">
            {t('upgraded')}
          </span>
        </h1>

        <p className="mx-auto mb-8 max-w-xl text-lg leading-relaxed text-text-secondary">
          {t('heroDesc')}
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="/resume"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-8 text-sm font-semibold text-black transition-all hover:bg-accent/90 hover:shadow-[0_0_30px_-5px_var(--color-accent)]"
          >
            {t('exploreGrid')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a
            href="#categories"
            className="inline-flex h-12 items-center rounded-full border border-border px-8 text-sm font-medium text-text-secondary transition-all hover:border-text-muted hover:text-text-primary"
          >
            {t('browseUseCase')}
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-0 to-transparent z-[1]" />
    </section>
  )
}
