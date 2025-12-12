'use client';

import React from 'react';

import { data } from '~/lib/data';

import { useLenis } from 'lenis/react';

import { NavigationButton } from './navigation';

export const Navbar = () => {
  const lenis = useLenis();

  const handleLogoClick = () => {
    lenis?.scrollTo('#about', { offset: 0 });
  };

  const links = [
    { label: 'Interests', href: '#interests' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Hackathons', href: '#hackathons' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#resume' },
  ];

  return (
    <nav
      className='bg-background/90 z-[2] h-[6dvh] w-full py-10 backdrop-blur-md'
      role='navigation'
      aria-label='Main navigation'
    >
      <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4'>
        {/* LOGO */}
        <button
          onClick={handleLogoClick}
          className='cursor-pointer text-xl font-black transition-opacity hover:opacity-100'
          aria-label='Go to about section'
          type='button'
        >
          {data.header}
        </button>

        {/* DESKTOP/TABLET HORIZONTAL NAV */}
        <div className='hidden items-center gap-8 text-base font-semibold md:flex'>
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => lenis?.scrollTo(link.href)}
              className='transition hover:text-primary'
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className='md:hidden'>
          <NavigationButton />
        </div>
      </div>
    </nav>
  );
};
