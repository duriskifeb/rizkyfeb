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
      <section className='flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0b0b0d] py-20'>
        {/* === CONTAINER UTAMA === */}
        <div className='relative mx-auto flex w-full max-w-[630.6px] flex-col items-center px-4'>
          {/* WRAPPER HEADER SVG + PARTICLES */}
          <div className='relative w-full'>
            {/* PARTIKEL */}
            <Particles
              className='absolute inset-0 z-0'
              id='tsparticles'
              options={options}
            />

            {/* GAMBAR HEADER */}
            <Image
              alt="Header That's Me"
              src={HeaderImage}
              width={945}
              height={313}
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
                    'Hi, I am rizky',
                    'Software Engineer',
                    'Tech Enthusiast',
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                }}
              />
            </div>

            {/* DESKRIPSI SINGKAT */}
            <p className='mt-4 max-w-[500px] text-center text-sm text-gray-300 md:text-lg'>
              Saya membangun aplikasi modern yang clean, scalable, dan mudah
              digunakan. Fokus pada pengalaman pengguna dan kualitas
              development.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return <div className='min-h-screen bg-[#0b0b0d]' />;
};
