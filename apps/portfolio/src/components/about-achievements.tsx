'use client';

import React, { useRef } from 'react';

import { data } from '~/lib/data';
import { cn } from '~/lib/utils';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';

// --- DATA STATS (Tetap Data Kamu) ---
const stats = [
  { label: 'Semester', value: '5th', emoji: '🎓', sub: 'Telkom Univ' },
  { label: 'Focus', value: 'RPL', emoji: '🎯', sub: 'Software Eng.' },
  { label: 'Experience', value: '3+', emoji: '⏳', sub: 'Years Coding' },
  { label: 'Projects', value: '10+', emoji: '💻', sub: 'Completed' },
  { label: 'Main Tech', value: 'Flutter', emoji: '📱', sub: '& Laravel' },
  { label: 'Status', value: 'Active', emoji: '🟢', sub: 'Open to Work' },
];

// --- COMPONENTS KECIL ---

// 1. Card Effect untuk Stats (Glowing Border saat hover)
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
      className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-5 backdrop-blur-sm transition-colors hover:bg-white/[0.05]'
    >
      <motion.div
        className='pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100'
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(56, 189, 248, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className='relative flex items-center justify-between'>
        <div>
          <div className='mb-1 font-elgocAlt text-3xl font-bold text-white'>
            {item.value}
          </div>
          <div className='text-sm font-medium text-gray-400'>{item.label}</div>
          <div className='mt-1 text-xs text-gray-600'>{item.sub}</div>
        </div>
        <div className='scale-90 text-4xl grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0'>
          {item.emoji}
        </div>
      </div>
    </motion.div>
  );
};

export const AboutAchievements = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect untuk background text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section
      ref={containerRef}
      id='about'
      className='relative flex min-h-screen w-full items-center overflow-hidden bg-[#0b0b0d] px-6 py-24 md:px-12'
    >
      {/* 1. BACKGROUND ELEMENT (Code Pattern) */}
      <div className='pointer-events-none absolute inset-0 select-none overflow-hidden font-mono text-sm leading-6 opacity-[0.03]'>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className='whitespace-nowrap'>
            {`const developer = { name: "Rizky", skill: "Flutter", passion: "Infinite" }; `.repeat(
              5
            )}
          </div>
        ))}
      </div>

      {/* 2. DEKORASI GRADIENT */}
      <div className='pointer-events-none absolute right-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[120px]' />
      <div className='pointer-events-none absolute bottom-[-10%] left-[-5%] h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[100px]' />

      {/* 3. GRID LAYOUT UTAMA */}
      <div className='relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20'>
        {/* KOLOM KIRI: NARASI (Lebih Lebar) */}
        <div className='flex flex-col justify-center lg:col-span-7'>
          {/* Header Kecil */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='mb-6 flex items-center gap-3'
          >
            <span className='h-[1px] w-12 bg-blue-500/50'></span>
            <span className='font-mono text-sm uppercase tracking-widest text-blue-400'>
              01. About Me
            </span>
          </motion.div>

          {/* Judul Besar */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='mb-8 font-elgocAlt text-4xl font-bold leading-tight text-white md:text-5xl lg:text-7xl'
          >
            Crafting Code. <br />
            <span className='bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
              Building Future.
            </span>
          </motion.h2>

          {/* Narasi Bio */}
          <div className='max-w-2xl space-y-6 text-lg leading-relaxed text-gray-400'>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm <strong className='text-white'>M Rizky Febriyanto</strong>
              . Currently a 5th-semester student majoring in{' '}
              <span className='border-b border-blue-500/30 text-white'>
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
              My journey isn't just about writing lines of code; it's about
              solving real-world problems. I specialize in building
              high-performance mobile apps with{' '}
              <strong className='text-sky-400'>Flutter</strong> and robust
              backends using <strong className='text-red-400'>Laravel</strong>.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              When I'm not debugging, I explore the world of{' '}
              <span className='text-orange-400'>3D Arts in Blender</span> or
              designing intuitive user interfaces. I believe that great software
              is a mix of logic and creativity.
            </motion.p>
          </div>

          {/* Signature / Hiasan Bawah */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className='font-handwriting mt-12 rotate-[-2deg] text-3xl text-gray-500'
          >
            Rizky Feb.
          </motion.div>
        </div>

        {/* KOLOM KANAN: STATS GRID (Bento Style) */}
        <div className='flex flex-col justify-center lg:col-span-5'>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {stats.map((stat, i) => (
              <StatCard key={i} item={stat} index={i} />
            ))}
          </div>

          {/* Kotak Tambahan (Tech Stack Visual) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className='mt-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent p-6'
          >
            <h3 className='mb-4 flex items-center gap-2 font-medium text-white'>
              <span className='h-2 w-2 animate-pulse rounded-full bg-green-500'></span>
              Current Stack
            </h3>
            <div className='flex flex-wrap gap-2'>
              {[
                'Flutter',
                'Dart',
                'Laravel',
                'PHP',
                'MySQL',
                'Blender',
                'Figma',
                'Git',
              ].map((tag) => (
                <span
                  key={tag}
                  className='cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300 transition-colors hover:border-blue-500/50 hover:text-blue-400'
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
