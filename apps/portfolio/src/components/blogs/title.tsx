'use client';

import React from 'react';
import { motion } from 'framer-motion';

import { data } from '~/lib/data';

interface BlogTitleProps {
  scrollProgress: number;
}

export const BlogTitle = ({ scrollProgress }: BlogTitleProps) => {
  return (
    <div className='flex w-full basis-full flex-col justify-between gap-12 sm:px-4 lg:basis-2/5 pb-12 sm:pb-0'>
      {/* Title */}
      <motion.div
        className='text-center font-elgocAlt text-[4rem] font-medium sm:text-start sm:text-[8rem] lg:text-[12rem]'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {data.articles.title}
      </motion.div>

      {/* Clean & Minimal Description */}
      <motion.div
        className='relative max-w-2xl space-y-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        {/* Large decorative quote */}
        <div className='absolute -left-4 -top-2 hidden text-6xl font-serif text-white/5 sm:block lg:-left-8 lg:-top-4 lg:text-9xl'>
          &ldquo;
        </div>

        <div className='relative space-y-5'>
          {/* Main paragraph */}
          <motion.p
            className='font-beatriceMedium text-lg leading-[1.9] text-white/75 sm:text-xl lg:text-2xl'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            While I&apos;ve shifted my focus to{' '}
            <span className='relative inline-block font-semibold text-white'>
              building systems
              <motion.span
                className='absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-blue-400/60 via-purple-400/60 to-pink-400/60'
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              />
            </span>{' '}
            and creating, here&apos;s a curated collection of my previous writing.
          </motion.p>

          {/* Feature cards in grid */}
          <motion.div
            className='grid grid-cols-1 gap-3 sm:grid-cols-3'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { text: 'Web3 Protocols', color: 'from-blue-400 to-cyan-400' },
              { text: 'Tutorials', color: 'from-purple-400 to-pink-400' },
              { text: 'Project Breakdowns', color: 'from-pink-400 to-orange-400' },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                className='group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10'
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className={`h-0.5 w-full bg-gradient-to-r ${item.color} mb-2 rounded-full`} />
                <p className='text-sm font-medium text-white/70 sm:text-base'>{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Closing statement */}
          <motion.p
            className='font-beatriceMedium text-base leading-relaxed text-white/60 sm:text-lg lg:text-xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Each piece represents a moment of{' '}
            <span className='text-white/90'>learning</span>,{' '}
            <span className='text-white/90'>exploration</span>, and{' '}
            <span className='text-white/90'>contribution</span> to the ecosystem.
          </motion.p>
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className='mb-[2rem] hidden w-36 rounded-full bg-neutral-600/50 backdrop-blur-sm md:flex overflow-hidden border border-white/10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <motion.div
          className='h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400'
          style={{ width: `${String(scrollProgress / 20)}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
    </div>
  );
};
