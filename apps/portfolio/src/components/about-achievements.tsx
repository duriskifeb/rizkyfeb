'use client';

import React, { useRef } from 'react';

import { data } from '~/lib/data';
import { cn } from '~/lib/utils';

import { motion, useScroll, useTransform, type Variants, cubicBezier } from 'framer-motion';

import type { AboutSentence } from '~/types/data';

const easeInOutCubic = cubicBezier(0.4, 0, 0.2, 1);
  
const stats = [
  { label: 'Years in Web3', value: '4+', emoji: '🚀' },
  { label: 'Web3 Projects', value: '25+', emoji: '💻' },
  { label: 'Hackathons Won', value: '40+', emoji: '🏆' },
  { label: 'Ecosystems', value: '30+', emoji: '🌐' },
  { label: 'Startups', value: '2', emoji: '🚀' },
  { label: 'Communities', value: '4', emoji: '👥' },
];

interface SentenceProps {
  parts: AboutSentence;
  index: number;
}

const Sentence = ({ index, parts }: SentenceProps) => {
  const isName = index === 0;
  
  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: easeInOutCubic,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'flex flex-wrap items-center justify-start gap-x-2 gap-y-1',
        isName ? 'my-8 sm:my-12 md:my-16' : ''
      )}
      initial="hidden"
      variants={containerVariants}
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
    >
      {parts.map((part, j) => {
        if (part.type === 'text') {
          return (
            <motion.span
              key={`about-${String(index)}-${String(j)}`}
              variants={containerVariants}
              className={cn(
                'inline-block text-white',
                part.className ?? 'font-beatriceMedium'
              )}
            >
              {part.content}
            </motion.span>
          );
        }
        const rotateValues: number[] = [0, -10, 10, -10, 0];
        return (
          <motion.span
            key={`about-${String(index)}-${String(j)}`}
            variants={containerVariants}
            className={cn(
              'inline-flex items-center justify-center opacity-100',
              part.className
            )}
            whileHover={{
              rotate: rotateValues,
              scale: 1.2,
              transition: { duration: 0.5 },
            }}
          >
            {part.content}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export const AboutAchievements = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, -30]);
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, 30]);

  return (
    <div ref={ref} className='relative z-[2] min-h-screen' id='about'>
      <div className='sticky top-0 flex min-h-screen flex-col items-center overflow-hidden md:flex-row'>
        {/* Left Side - About */}
        <motion.div
          className='relative flex h-full min-h-screen w-full flex-col items-start justify-center border-b border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent px-8 py-16 sm:px-12 md:w-1/2 md:border-b-0 md:border-r md:px-16 md:py-0'
          style={{ opacity: leftOpacity, x: leftX }}
        >
          <div className='relative w-full max-w-2xl'>
            {/* Animated background gradient */}
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.2), transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.2), transparent 50%)',
                  'radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.2), transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.2), transparent 50%)',
                ],
              }}
              className='absolute inset-0 -z-10 rounded-3xl opacity-30 blur-3xl'
              transition={{
                duration: 8,
                ease: 'linear',
                repeat: Infinity,
              }}
            />
            
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className='relative flex flex-col items-start justify-center gap-2 sm:gap-3 font-beatriceMedium text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed'
              initial={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8, ease: easeInOutCubic }}
            >
              {data.about.map((sentence, i) => (
                <Sentence
                  index={i}
                  key={`sentence-${String(i)}`}
                  parts={sentence}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Achievements */}
        <motion.div
          className='relative flex h-full min-h-screen w-full flex-col items-center justify-center bg-gradient-to-l from-white/[0.02] to-transparent px-8 py-16 sm:px-12 md:w-1/2 md:px-16 md:py-0'
          style={{ opacity: rightOpacity, x: rightX }}
        >
          <motion.div
            className='mb-12 font-elgocAlt text-[3rem] sm:text-[4rem] md:text-[5rem] leading-[0.9] text-white'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Achievements
          </motion.div>
          
          <div className='grid w-full max-w-2xl grid-cols-2 gap-4 sm:gap-6'>
            {stats.map((stat, index) => {
              const delay = index * 0.06;
              
              return (
                <motion.div
                  key={stat.label}
                  className='group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{ delay, duration: 0.6, stiffness: 100, type: 'spring' }}
                  viewport={{ margin: '-50px', once: true }}
                  whileHover={{ 
                    scale: 1.08,
                    transition: { duration: 0.3, stiffness: 300, type: 'spring' },
                    y: -8,
                  }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                >
                  {/* Subtle gradient overlay on hover */}
                  <motion.div
                    className='absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                  />
                  
                  <motion.div
                    className='mb-3 text-2xl sm:text-3xl'
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {stat.emoji}
                  </motion.div>
                  <motion.div 
                    className='font-elgocAlt text-3xl font-bold text-white sm:text-4xl md:text-5xl'
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className='mt-2 text-center text-xs font-medium text-white/50 tracking-wide sm:text-sm'>
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Animated divider line */}
        <motion.div
          className='absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent md:block'
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

