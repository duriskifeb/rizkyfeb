'use client';

import Image from 'next/image';

import { useEffect, useMemo, useState } from 'react';

import { Particles, initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import Typewriter from 'typewriter-effect';
import { useScreen } from 'usehooks-ts';

import HeaderImage from '../../public/header.svg';
import { getParticles } from '../lib/particles';

export const Header = () => {
  const screen = useScreen();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => {
    if (screen) {
      return getParticles(screen.width);
    }
  }, [screen]);

  if (init && options) {
    return (
      // PERBAIKAN DI SINI:
      // Ganti 'bg-black' menjadi 'bg-[#0b0b0d]' agar warnanya persis sama dengan desainmu
      <section className='flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0b0b0d] py-20'>
        {/* === CONTAINER UTAMA === */}
        <div className='relative mx-auto flex w-full max-w-[630.6px] flex-col items-center px-4'>
          {/* === PEMBUNGKUS RELATIVE === */}
          <div className='relative w-full'>
            {/* A. PARTIKEL */}
            <Particles
              className='absolute inset-0 z-0'
              id='tsparticles'
              options={options}
            />

            {/* B. GAMBAR HEADER */}
            <Image
              alt="Header That's Me"
              src={HeaderImage}
              width={630.6}
              height={209}
              className='relative z-10 h-auto w-full object-contain'
              priority
            />
          </div>

          {/* === AREA TEKS === */}
          <div className='z-20 mt-8 text-center'>
            <div className='font-mono text-3xl font-bold text-white drop-shadow-lg md:text-5xl'>
              <Typewriter
                options={{
                  strings: [
                    'Fullstack Developer',
                    'Software Engineer',
                    'Tech Enthusiast',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                }}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // PERBAIKAN DI SINI JUGA (Loading State):
  // Ganti 'bg-black' menjadi 'bg-[#0b0b0d]' supaya tidak kedip belang saat loading
  return <div className='min-h-screen bg-[#ffffff]' />;
};
