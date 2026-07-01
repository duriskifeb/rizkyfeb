'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getAssetPath } from '~/lib/utils';

// ─── Static particle data (deterministic — no hydration mismatch) ─────────────
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  size: (i % 3) + 1,
  x: ((i * 37 + 13) % 97) + 1.5,
  y: ((i * 53 + 7) % 94) + 3,
  duration: 7 + (i % 7) * 1.5,
  delay: (i % 9) * 0.8,
  opacity: 0.06 + (i % 6) * 0.04,
}));

export const Header = () => {
  return (
    <section
      id='home'
      className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-24'
      style={{ background: 'var(--section-bg)' }}
    >
      {/* ── CSS Particle Field ── */}
      <div className='pointer-events-none absolute inset-0 z-0 overflow-hidden'>
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className='absolute rounded-full animate-particle-float'
            style={{
              background: 'var(--particle-color)',
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* ── Radial glow ── */}
      <div className='pointer-events-none absolute left-1/2 top-1/2 z-0 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/8 blur-[160px]' />
      <div className='pointer-events-none absolute left-[30%] bottom-[20%] z-0 h-[400px] w-[400px] rounded-full bg-teal-600/10 blur-[120px]' />

      {/* ── Decorative sparkles ── */}
      <span className='pointer-events-none absolute top-32 left-14 select-none text-3xl text-white/15'>✦</span>
      <span className='pointer-events-none absolute top-44 right-16 select-none text-xl text-white/10'>✦</span>
      <span className='pointer-events-none absolute bottom-32 left-1/4 select-none text-2xl text-white/10'>✦</span>

      {/* ── Main Content ── */}
      <div className='relative z-10 mx-auto flex w-full flex-col items-center text-center'>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/6 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 backdrop-blur-sm'
        >
          <span className='relative flex h-1.5 w-1.5 shrink-0'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
            <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400' />
          </span>
          Software Engineering Enthusiast, Journaling, Reading and Writing.
        </motion.div>

        {/* ── Marquee Background & Image Placeholder ── */}
        <div className='relative flex min-h-[300px] w-[calc(100%+2rem)] -mx-4 items-center justify-center overflow-hidden py-10 md:min-h-[400px]'>

          {/* Background Marquee Text */}
          <div className='absolute inset-0 z-0 flex flex-col justify-center gap-2 md:gap-4'>
            {/* Top row - scrolls RIGHT (marquee-reverse) */}
            <div className='flex w-max animate-marquee-reverse select-none whitespace-nowrap opacity-20'>
              {Array(20)
                .fill('duriskifeb')
                .map((text, i) => (
                  <span
                    key={i}
                    className='mx-4 font-elgocAlt text-[4rem] font-bold tracking-tight text-white md:mx-6 md:text-[7rem]'
                  >
                    {text}
                  </span>
                ))}
            </div>

            {/* Bottom row - scrolls LEFT (marquee) */}
            <div className='flex w-max animate-marquee select-none whitespace-nowrap opacity-20'>
              {Array(20)
                .fill('duriskifeb')
                .map((text, i) => (
                  <span
                    key={i}
                    className='mx-4 font-elgocAlt text-[4rem] font-bold tracking-tight text-white md:mx-6 md:text-[7rem]'
                  >
                    {text}
                  </span>
                ))}
            </div>
          </div>

          {/* Foreground Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='relative z-10 flex h-64 w-48 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition-transform hover:scale-105 hover:border-emerald-400/30 md:h-80 md:w-60'
          >
            <Image
              src={getAssetPath("/images/homepage.png")}
              fill
              className="object-cover"
              alt="Profile"
              priority
            />
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className='mb-10 max-w-md text-base leading-relaxed text-white/50 md:text-lg'
        >
          Crafting logic into beautiful digital reality. Focused on web development, modern UI/UX, and building high&#8209;quality applications.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className='flex flex-wrap items-center justify-center gap-3'
        >
          <Link
            href="/experience"
            className='rounded-full border border-white/18 bg-white/8 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 active:scale-95'
          >
            View My Work
          </Link>
          <Link
            href="/gallery"
            className='rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#024538] shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all hover:bg-white/90 active:scale-95'
          >
            Gallery Me
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
