'use client';

import React, { useRef, useState } from 'react';

import { data } from '~/lib/data';
import { cn } from '~/lib/utils';

import { motion, useScroll, useTransform, type Variants, cubicBezier } from 'framer-motion';

import type { AboutSentence } from '~/types/data';

const easeInOutCubic = cubicBezier(0.4, 0, 0.2, 1);

interface SentenceProps {
  parts: AboutSentence;
  index: number;
  progress: number;
}

const Sentence = ({ index, parts, progress }: SentenceProps) => {
  const totalSentences = data.about.length;
  const sentenceStart = index / totalSentences;
  
  const isName = index === 0;
  const isVisible = progress >= sentenceStart - 0.05;
  
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
        'flex flex-wrap items-center justify-center gap-x-2 gap-y-1',
        isName ? 'my-8 sm:my-12 md:my-16' : '',
        !isVisible && 'opacity-20'
      )}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
    >
      {parts.map((part, j) => {
        if (part.type === 'text') {
          // Render text as complete words/phrases, not split
          return (
            <motion.span
              key={`about-${String(index)}-${String(j)}`}
              variants={containerVariants}
              className={cn(
                'inline-block',
                progress < sentenceStart ? 'text-white/20' : 'text-white',
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
              'inline-flex items-center justify-center',
              progress < sentenceStart ? 'opacity-20' : 'opacity-100',
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

export const About = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe to assume ref is not null
  const ref = useRef<HTMLDivElement>(null!);

  const { scrollYProgress } = useScroll({ target: ref });

  const value = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [v, setV] = useState(0);

  value.on('change', (value) => {
    const p = Number(value.toFixed(2));
    setV(p);
  });

  return (
    <div ref={ref} className='relative z-[2] h-[500vh]' id='about'>
      <div className='sticky top-0 flex h-screen items-center justify-center px-4 sm:px-6 md:px-8'>
        <div className='relative w-full max-w-6xl select-text text-center'>
          {/* Subtle background gradient */}
          <motion.div
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.3), transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.3), transparent 50%)',
                'radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.3), transparent 50%)',
                'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.3), transparent 50%)',
              ],
            }}
            className='absolute inset-0 -z-10 rounded-3xl opacity-20 blur-3xl'
            transition={{
              duration: 8,
              ease: 'linear',
              repeat: Infinity,
            }}
          />
          
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className='relative flex flex-col items-center justify-center gap-2 sm:gap-3 font-beatriceMedium text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed'
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: easeInOutCubic }}
          >
          {data.about.map((sentence, i) => (
            <Sentence
                index={i}
              key={`sentence-${String(i)}`}
              parts={sentence}
              progress={v}
            />
          ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
