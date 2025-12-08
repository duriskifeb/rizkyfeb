'use client';

import React from 'react';

import { cn } from '~/lib/utils';

import { type Variants, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { useScreen, useToggle } from 'usehooks-ts';

/* eslint-disable @typescript-eslint/no-unnecessary-condition -- screen is undefined on server*/

/* eslint-disable jsx-a11y/no-static-element-interactions -- safe */
/* eslint-disable jsx-a11y/click-events-have-key-events -- safe  */

const links = [
  {
    label: 'Interests',
    href: '#interests',
  },
  {
    label: 'Experience',
    href: '#experience',
  },
  {
    label: 'Projects',
    href: '#projects',
  },
  {
    label: 'Hackathons',
    href: '#hackathons',
  },
  {
    label: 'Resume',
    href: '#resume',
  },
  {
    label: 'Contact',
    href: '#resume',
  },
];

export const NavigationButton = () => {
  const [isActive, toggleMenu] = useToggle(false);
  const screen = useScreen();

  const lenis = useLenis();

  const menuVariants: Variants = {
    open: {
      width: screen?.width > 640 ? '320px' : '50dvw',
      height: screen?.width > 640 ? '380px' : '340px',
      top: screen?.width > 640 ? '-16px' : '-8px',
      right: screen?.width > 640 ? '-16px' : '-8px',
      transition: { duration: 0.65, type: 'tween', ease: [0.76, 0, 0.24, 1] },
    },
    closed: {
      width: '64px',
      height: '28px',
      top: '0px',
      right: '0px',
      transition: {
        duration: 0.65,
        delay: 0.2,
        type: 'tween',
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const linkVariants: Variants = {
    hidden: {
      y: 50,
      opacity: 0,
    },
    visible: (index: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.4 + index * 0.1,
      },
    }),
  };

  return (
    <div className='relative'>
      <motion.div
        animate={isActive ? 'open' : 'closed'}
        className='absolute h-[28rem] w-full max-w-sm rounded-2xl bg-white'
        initial='closed'
        variants={menuVariants}
      >
        <div
          className={cn(isActive ? 'flex flex-col gap-2 px-4 py-12' : 'hidden')}
        >
          {links.map((link, index) => (
            <button
              key={link.label}
              type='button'
              onClick={() => {
                toggleMenu();
                setTimeout(() => {
                  lenis?.scrollTo(link.href);
                }, 600);
              }}
            >
              <motion.div
                animate={isActive ? 'visible' : 'hidden'}
                className='h-9 rounded-xl px-4 py-1 text-center font-sans text-2xl font-black text-black'
                custom={index}
                initial='hidden'
                variants={linkVariants}
              >
                {link.label}
              </motion.div>
            </button>
          ))}
        </div>
      </motion.div>

      <div className='h-7 w-16 cursor-pointer overflow-hidden rounded-xl text-sm font-medium'>
        <motion.div
          animate={{ top: isActive ? '-100%' : '0%' }}
          className='group relative h-full w-full'
          transition={{
            duration: 0.5,
            type: 'tween',
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <div
            className='h-full w-full bg-white text-black'
            onClick={() => {
              toggleMenu();
            }}
          >
            <PerspectiveText label='Menu' />
          </div>

          <div
            className='h-full w-full bg-black text-white'
            onClick={() => {
              toggleMenu();
            }}
          >
            <PerspectiveText label='Close' />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const PerspectiveText = ({ label }: { label: string }) => {
  return (
    <div
      className='ease-[cubic-bezier(0.76,0,0.24,1)] flex h-full w-full flex-col items-center justify-center text-xs transition-transform duration-500 group-hover:[transform:rotateX(90deg)] sm:text-sm'
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <p className='ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none uppercase transition-all duration-500 group-hover:opacity-0 group-hover:[transform:translateY(-100%)]'>
        {label}
      </p>
      <p
        className='ease-[cubic-bezier(0.76,0,0.24,1)] pointer-events-none absolute origin-bottom border-black uppercase opacity-0 transition-all duration-500 group-hover:opacity-100'
        style={{
          transform: 'rotateX(-90deg) translateY(50%)',
        }}
      >
        {label}
      </p>
    </div>
  );
};
