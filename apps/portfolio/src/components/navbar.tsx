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

  return (
    <nav 
      className='bg-background/90 z-[2] h-[6dvh] w-full py-10 backdrop-blur-md'
      role='navigation'
      aria-label='Main navigation'
    >
      <div className='mx-auto flex h-full max-w-screen-xl items-center justify-between px-4'>
        <button
          onClick={handleLogoClick}
          className='text-xl font-black hover:opacity-100 transition-opacity cursor-pointer'
          aria-label='Go to about section'
          type='button'
        >
          {data.header}
        </button>
        <NavigationButton />
      </div>
    </nav>
  );
};
