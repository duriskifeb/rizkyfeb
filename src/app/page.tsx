import React from 'react';

import { DomeGallery, Header } from '~/components';

// Daftar gambar untuk galeri foto
const galleryImages = [
  '/images/1.JPG',
  '/images/2.JPG',
  '/images/3.JPG',
  '/images/4.JPG',
  '/images/5.JPG',
  '/images/6.jpg',
  '/images/7.jpg',
  '/images/8.jpg',
  '/images/9.jpg',
  '/images/10.jpg',
  '/images/11.jpg',
  '/images/12.jpg',
  '/images/13.jpg',
  '/images/14.jpg',
  '/images/15.jpg',
  '/images/16.jpg',
  '/images/17.jpg',
  '/images/18.jpg',
  '/images/19.jpg',
  '/images/20.jpg',
  '/images/21.jpeg',
  '/images/22.jpeg',
  '/images/23.jpeg',
  '/images/24.jpeg',
  '/images/25.jpeg',
  '/images/26.JPG',
  '/images/27.JPG',
  '/images/28.JPG',
  '/images/29.JPG',
  '/images/30.JPG',
  '/images/31.JPG',
  '/images/32.JPG',
  '/images/33.JPG',
];

const Home = () => {
  return (
    <>
      <Header />

      {/* Gallery Section — Infinite Marquee */}
      <section className='relative w-full overflow-hidden py-16' style={{ background: 'var(--section-bg)' }}>
        {/* Fade top & bottom */}
        <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-20' style={{ background: 'linear-gradient(to bottom, var(--section-bg), transparent)' }} />
        <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20' style={{ background: 'linear-gradient(to top, var(--section-bg), transparent)' }} />

        <div className='mb-10 text-center'>
          <div className='mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-emerald-400'>
            <div className='h-[1px] w-8 bg-emerald-500/50' />
            Gallery
            <div className='h-[1px] w-8 bg-emerald-500/50' />
          </div>
          <h2 className='font-elgocAlt text-3xl font-bold text-white md:text-4xl'>
            Ini Cerita ku
          </h2>
          <p className='mt-2 text-sm text-white/40'>Sekilas momen perjalananku</p>
        </div>

        <DomeGallery images={galleryImages} />
      </section>
    </>
  );
};

export default Home;
