'use client';

import React, { useRef } from 'react';

// Hapus import cn yang tidak digunakan
// import { cn } from '~/lib/utils';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion';

// ─── Data Stats ───────────────────────────────────────────────────────────────
const stats = [
  {
    label: 'Semester',
    value: 'Semester 6',
    emoji: '🎓',
    sub: 'Telkom University Surabaya',
    color: 'from-emerald-400 to-teal-300',
  },
  {
    label: 'Major',
    value: 'Software Engineering',
    emoji: '🎯',
    sub: 'Coding Enthusiast',
    color: 'from-teal-400 to-green-300',
  },
  {
    label: 'Experience ',
    value: '2+ organization and coding',
    emoji: '⏳',
    sub: 'learning by doing',
    color: 'from-green-400 to-emerald-300',
  },
  {
    label: 'Status',
    value: 'Active',
    emoji: '🟢',
    sub: 'open to work and internship',
    color: 'from-emerald-300 to-teal-400',
  },
];

// ─── Data Tech Stack ───────────────────────────────────────────────────────────
const techStack = [
  'Java', 'HTML5', 'CSS', 'JavaScript', 'TypeScript',
  'Dart', 'C#', 'Flutter', 'Next.js', 'Express.js',
  'NestJS', 'Vue.js', 'JavaFX', 'SolidJS', 'MongoDB',
  'Alpine.js', 'Filament', 'Laravel', 'PHP', 'MySQL',
  'Blender', 'Figma', 'Git', 'MySql', 'Postman',
];

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({
  item,
  index,
}: {
  item: (typeof stats)[0];
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      className='group relative overflow-hidden rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]'
      style={{
        border: '1px solid var(--card-border)',
        background: 'var(--card-bg)',
      }}
    >
      {/* Mouse spotlight */}
      <motion.div
        className='pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100'
        style={{
          background: useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(16,185,129,0.08), transparent 80%)`,
        }}
      />
      {/* Watermark emoji */}
      <div className='absolute -bottom-3 -right-3 select-none text-[4.5rem] opacity-[0.04] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.08]'>
        {item.emoji}
      </div>
      <div className='relative z-10 flex h-full flex-col justify-between'>
        <div className='mb-3 flex items-start justify-between'>
          <div className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br ${item.color} bg-opacity-15`}>
            <span className='text-lg'>{item.emoji}</span>
          </div>
          <div className='font-mono text-[10px] uppercase tracking-wider text-white/30'>
            {item.label}
          </div>
        </div>
        <div>
          <div className='mb-0.5 font-elgocAlt text-3xl font-bold tracking-tight text-white group-hover:text-emerald-300 transition-colors'>
            {item.value}
          </div>
          <div className='text-xs font-medium text-white/45 group-hover:text-white/65 transition-colors'>
            {item.sub}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export const AboutAchievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id='about'
      className='relative flex min-h-screen w-full items-center overflow-hidden px-6 py-24 md:px-12'
      style={{ background: 'var(--section-bg)' }}
    >
      {/* Background code watermark */}
      <div className='pointer-events-none absolute inset-0 select-none overflow-hidden font-mono text-xs leading-6 opacity-[0.015]'>
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className='whitespace-nowrap'>
            {`const dev = { name: "Rizky", role: "Engineer", vision: "Impact" }; `.repeat(10)}
          </div>
        ))}
      </div>

      {/* Glow decorations */}
      <div className='pointer-events-none absolute right-[-10%] top-[-15%] h-[500px] w-[500px] rounded-full bg-emerald-500/8 blur-[130px]' />
      <div className='pointer-events-none absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-teal-600/8 blur-[130px]' />

      {/* Grid layout */}
      <div className='relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16'>

        {/* ── Left column: Narrative ── */}
        <div className='flex flex-col justify-center lg:col-span-7'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='mb-6 flex items-center gap-3'
          >
            <div className='h-[2px] w-10 bg-gradient-to-r from-emerald-500 to-teal-400' />
            <span className='font-mono text-sm uppercase tracking-widest text-emerald-400'>
              01. About Me
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='mb-8 font-elgocAlt text-4xl font-bold leading-tight text-white md:text-6xl'
          >
            Crafting logic
            <br />
            <span className='bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300 bg-clip-text text-transparent'>
              into reality.
            </span>
          </motion.h2>

          <div className='max-w-2xl space-y-5 text-base leading-relaxed text-white/50'>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Hi, I&apos;m{' '}
              <strong className='text-white'>Muhammad Rizky Febriyanto</strong>.
              Currently a 5th&#8209;semester student majoring in{' '}
              <span className='cursor-default border-b border-emerald-500/30 pb-0.5 text-emerald-400 transition-colors hover:border-emerald-400'>
                Software Engineering
              </span>{' '}
              at Telkom University.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              My journey isn&apos;t just about code; it&apos;s about solving real-world
              problems. I am{' '}
              <span className='mx-1 inline-flex items-center justify-center rounded-full border border-emerald-500/25 bg-emerald-500/12 px-3 py-0.5 align-middle text-xs font-bold text-emerald-400'>
                active
              </span>{' '}
              in campus organizations, currently serving as the{' '}
              <span className='font-medium text-white'>
                Chair of the Software Engineering Student Association
              </span>
              .
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              Beyond the screen, I explore new perspectives. A quote that drives me:
              <br />
              <span className='mt-3 block border-l-2 border-emerald-500/30 pl-4 italic text-white/65'>
                &quot;Jika tidak lebih baik, lebih baik tidak&quot;
              </span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className='mt-10 w-fit rotate-[-2deg] cursor-default text-2xl text-white/25 transition-colors hover:text-white/50'
          >
            ~ Rizky Feb.
          </motion.div>
        </div>

        {/* ── Right column: Stats + Tech Stack ── */}
        <div className='flex flex-col gap-5 lg:col-span-5'>
          {/* Bento Stats Grid */}
          <div className='grid grid-cols-2 gap-3'>
            {stats.map((stat, i) => (
              <StatCard key={i} item={stat} index={i} />
            ))}
          </div>

          {/* Tech Stack Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6'
          >
            <div className='absolute inset-0 bg-gradient-to-br from-emerald-500/4 to-teal-500/4 opacity-50 transition-opacity duration-500 group-hover:opacity-100' />
            <div className='relative z-10'>
              <h3 className='mb-5 flex items-center gap-3 text-base font-semibold text-white'>
                <span className='relative flex h-2.5 w-2.5'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
                  <span className='relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500' />
                </span>
                Current Stack
              </h3>
              <div className='flex flex-wrap gap-1.5'>
                {techStack.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.02 }}
                    viewport={{ once: true }}
                    className='cursor-default rounded-lg border border-white/6 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/50 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-300 hover:shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};