'use client';

import React, { useRef } from 'react';

import { cn } from '~/lib/utils';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion';

// --- DATA STATS ---
const stats = [
  {
    label: 'Semester',
    value: '5th',
    emoji: '🎓',
    sub: 'Telkom Univ',
    color: 'from-blue-400 to-cyan-300',
  },
  {
    label: 'Focus',
    value: 'RPL',
    emoji: '🎯',
    sub: 'Software Eng.',
    color: 'from-purple-400 to-pink-300',
  },
  {
    label: 'Experience',
    value: '1+',
    emoji: '⏳',
    sub: 'Years Coding',
    color: 'from-amber-300 to-orange-400',
  },
  {
    label: 'Status',
    value: 'Active',
    emoji: '🟢',
    sub: 'Open to Work',
    color: 'from-green-400 to-emerald-300',
  },
];

// --- DATA TECH STACK ---
const techStack = [
  'Java',
  'HTML5',
  'CSS',
  'JavaScript',
  'TypeScript',
  'Dart',
  'C#',
  'Flutter',
  'Next.js',
  'Express.js',
  'NestJS',
  'Angular',
  'Vue.js',
  'JavaFX',
  'SolidJS',
  'Alpine.js',
  'Filament',
  'Laravel',
  'PHP',
  'MySQL',
  'Blender',
  'Figma',
  'Git',
];

// --- COMPONENTS KECIL ---

// 1. New & Improved StatCard
const StatCard = ({
  item,
  index,
}: {
  item: (typeof stats)[0];
  index: number;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
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
      className='group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-6 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-900/20'
    >
      {/* Mouse Follow Gradient Effect */}
      <motion.div
        className='pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100'
        style={{
          background: useMotionTemplate`
            radial-gradient(
              350px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Decorative Background Icon (Watermark Effect) */}
      <div className='absolute -bottom-4 -right-4 select-none text-[5rem] opacity-[0.03] grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.07] group-hover:grayscale-0'>
        {item.emoji}
      </div>

      <div className='relative z-10 flex h-full flex-col justify-between'>
        {/* Top Section: Icon & Label */}
        <div className='mb-4 flex items-start justify-between'>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${item.color} bg-opacity-20 bg-clip-border shadow-inner`}
          >
            <span className='text-xl drop-shadow-md'>{item.emoji}</span>
          </div>
          <div className='text-right'>
            <div className='font-mono text-xs uppercase tracking-wider text-white/40'>
              {item.label}
            </div>
          </div>
        </div>

        {/* Bottom Section: Value & Sub */}
        <div>
          <div className='mb-1 font-elgocAlt text-4xl font-bold tracking-tight text-white transition-all group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 group-hover:bg-clip-text group-hover:text-transparent'>
            {item.value}
          </div>
          <div className='text-sm font-medium text-white/50 transition-colors group-hover:text-white/80'>
            {item.sub}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const AboutAchievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id='about'
      className='relative flex min-h-screen w-full items-center overflow-hidden bg-[#0b0b0d] px-6 py-24 md:px-12'
    >
      {/* 1. BACKGROUND DECORATION */}
      <div className='pointer-events-none absolute inset-0 select-none overflow-hidden font-mono text-sm leading-6 opacity-[0.02]'>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className='whitespace-nowrap'>
            {`const dev = { name: "Rizky", role: "Engineer", vision: "Impact" }; `.repeat(
              10
            )}
          </div>
        ))}
      </div>
      <div className='pointer-events-none absolute right-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-blue-600/10 blur-[130px]' />
      <div className='pointer-events-none absolute bottom-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[130px]' />

      {/* 2. GRID LAYOUT */}
      <div className='relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16'>
        {/* --- KOLOM KIRI: NARASI --- */}
        <div className='flex flex-col justify-center lg:col-span-7'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='mb-6 flex items-center gap-3'
          >
            <div className='h-[2px] w-10 bg-gradient-to-r from-blue-500 to-purple-500'></div>
            <span className='font-mono text-sm uppercase tracking-widest text-blue-400'>
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
            <span className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
              into reality.
            </span>
          </motion.h2>

          <div className='max-w-2xl space-y-6 text-lg leading-relaxed text-gray-400'>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm{' '}
              <strong className='text-white'>Muhammad Rizky Febriyanto</strong>.
              Currently a 5th-semester student majoring in{' '}
              <span className='cursor-default border-b border-blue-500/30 pb-0.5 text-blue-300 transition-colors hover:border-blue-400'>
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
              My journey isn't just about code; it's about solving real-world
              problems. I am{' '}
              <span className='mx-1 inline-flex items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 px-3 py-0.5 align-middle text-sm font-bold text-green-400'>
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
              Beyond the screen, I explore new perspectives. A quote that drives
              me:
              <br />
              <span className='mt-4 block border-l-2 border-white/20 pl-4 italic text-white/80'>
                "Jika tidak lebih baik, lebih baik tidak"
              </span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className='font-handwriting mt-12 w-fit rotate-[-2deg] cursor-pointer text-3xl text-gray-500 transition-colors hover:text-white'
          >
            ~ Rizky Feb.
          </motion.div>
        </div>

        {/* --- KOLOM KANAN: STATS & STACK --- */}
        <div className='flex flex-col gap-6 lg:col-span-5'>
          {/* Bento Stats Grid */}
          <div className='grid grid-cols-2 gap-4'>
            {stats.map((stat, i) => (
              <StatCard key={i} item={stat} index={i} />
            ))}
          </div>

          {/* Tech Stack Container - Re-designed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className='group relative overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-6 sm:p-8'
          >
            {/* Subtle Gradient Background for Tech Stack */}
            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-50 transition-opacity duration-500 group-hover:opacity-100' />

            <div className='relative z-10'>
              <h3 className='mb-6 flex items-center gap-3 text-lg font-semibold text-white'>
                <span className='relative flex h-3 w-3'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75'></span>
                  <span className='relative inline-flex h-3 w-3 rounded-full bg-green-500'></span>
                </span>
                Current Stack
              </h3>

              <div className='flex flex-wrap gap-2'>
                {techStack.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + idx * 0.02 }}
                    viewport={{ once: true }}
                    className='cursor-default rounded-lg border border-white/5 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-white hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]'
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
