'use client';

import Link from 'next/link';

import React, { useEffect, useMemo } from 'react';

import { data } from '~/lib/data';
import { useProjectsStore } from '~/lib/stores/projects';
import { cn } from '~/lib/utils';

import { type Variants, cubicBezier, motion } from 'framer-motion';

import { BookOpen, FileText, Github, Globe, Twitter, YoutubeIcon } from 'lucide-react';

const easeSine = cubicBezier(0.12, 0, 0.39, 0);

export const ProjectDetails = () => {
  'use no memo';
  const { active, getItem, setActive } = useProjectsStore();

  const activeItem = useMemo(() => {
    if (active === null) return null;
    return getItem(active);
  }, [active, getItem]);

  // arrow keys to navigate between projects arrow left and right
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const direction = e.key === 'ArrowLeft' ? -1 : 1;

        let next: number | null;
        if (active === null) {
          next = 0;
        } else if (active === 0 && direction === -1) {
          next = null;
        } else if (
          active === data.projects.projects.length - 1 &&
          direction === 1
        ) {
          next = null;
        } else {
          next = active + direction;
        }
        if (next === null) {
          setActive(null);
          return;
        }

        if (direction === 1) {
          window.scrollBy({
            top: (2 * window.innerHeight) / 16,
            behavior: 'smooth',
          });
        } else {
          window.scrollBy({
            top: (-2 * window.innerHeight) / 14,
            behavior: 'smooth',
          });
        }

        setActive(next);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [active, setActive]);

  const containerVariants: Variants = {
    hidden: {
      color: '#00000000',
    },
    visible: {
      color: activeItem?.color ?? '#00000000',
    },
  };

  const titleVariants: Variants = {
    hidden: {
      x: -100,
      color: '#00000000',
      rotateY: 90,
    },
    visible: (index: number) => {
      return {
        x: 0,
        scaleX: 1,
        color: activeItem?.color ?? '#00000000',
        rotateY: 0,
        transition: {
          ease: easeSine,
          delay: index * 0.05,
        },
      };
    },
  };

  const descriptionVariants: Variants = {
    hidden: {
      display: 'hidden',
      x: -100,
      color: '#00000000',
    },
    visible: (index: number) => {
      return {
        x: 0,
        color: activeItem?.color ?? '#00000000',
        transition: {
          ease: easeSine,
          delay:
            Math.min((activeItem?.title.length ?? 0) * 0.05, 0.5) +
            index * 0.05,
        },
      };
    },
  };

  return (
    <>
      <motion.div
        className='absolute left-0 top-0 h-full w-full'
        animate={{
          backgroundColor: activeItem?.backgroundColor ?? '#0000000',
        }}
        transition={{
          duration: 0.3,
          ease: easeSine,
        }}
      />
      <motion.div
        animate={active !== null ? 'visible' : 'hidden'}
        className='absolute left-0 top-8 z-[1] flex h-fit w-full flex-col gap-4 px-4 text-center md:left-12 md:text-start'
        initial='hidden'
        variants={containerVariants}
        transition={{
          duration: 0.5,
        }}
      >
        <div
          className={cn(
            'flex flex-row flex-wrap items-center justify-center leading-[0.95] sm:justify-start md:text-[8rem]',
            (activeItem?.title ?? '').split('').length > 12
              ? 'text-[8vw]'
              : 'text-[12vw]'
          )}
        >
          {(activeItem?.title ?? '').split('').map((c, index) => {
            return (
              <motion.div
                key={`${activeItem?.title ?? ''}-char-${String(index)}`}
                animate='visible'
                custom={index}
                initial='hidden'
                variants={titleVariants}
              >
                {c === ' ' ? '\u00A0' : c}
              </motion.div>
            );
          })}
        </div>
        <div className='flex max-w-5xl flex-row flex-wrap items-center justify-center gap-1 text-center text-xs sm:justify-start md:text-start md:text-lg'>
          {activeItem?.description.split(' ').map((word, index) => {
            return (
              <motion.div
                key={`${activeItem.title}-description-word-${String(index)}`}
                animate={active !== null ? 'visible' : 'hidden'}
                custom={index}
                initial='hidden'
                variants={descriptionVariants}
              >
                {word}
              </motion.div>
            );
          })}
        </div>
        <div className='flex flex-row items-center justify-center gap-4 sm:justify-start'>
          {activeItem?.liveLink ? (
            <Link href={activeItem.liveLink} target='_blank' rel='noopener noreferrer'>
              <Globe size={24} />
            </Link>
          ) : null}
          {activeItem?.githubLink ? (
            <Link href={activeItem.githubLink} target='_blank' rel='noopener noreferrer'>
              <Github size={24} />
            </Link>
          ) : null}
          {activeItem?.videoDemo ? (
            <Link href={activeItem.videoDemo} target='_blank' rel='noopener noreferrer'>
              <YoutubeIcon size={24} />
            </Link>
          ) : null}
          {activeItem?.demoVideo ? (
            <Link href={activeItem.demoVideo} target='_blank' rel='noopener noreferrer'>
              <YoutubeIcon size={24} />
            </Link>
          ) : null}
          {activeItem?.deckLink ? (
            <Link href={activeItem.deckLink} target='_blank' rel='noopener noreferrer'>
              <FileText size={24} />
            </Link>
          ) : null}
          {activeItem?.litepaperLink ? (
            <Link href={activeItem.litepaperLink} target='_blank' rel='noopener noreferrer'>
              <BookOpen size={24} />
            </Link>
          ) : null}
          {activeItem?.xLink ? (
            <Link href={activeItem.xLink} target='_blank' rel='noopener noreferrer'>
              <Twitter size={24} />
            </Link>
          ) : null}
        </div>
      </motion.div>
    </>
  );
};
