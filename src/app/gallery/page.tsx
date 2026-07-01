import React from 'react';
import { DomeGallery } from '~/components';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Rizky Febriyanto',
  description: 'Sekilas momen perjalanan Rizky Febriyanto — foto, cerita, dan kenangan.',
};

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

export default function GalleryPage() {
  return (
    <div className='min-h-screen' style={{ background: 'var(--section-bg)' }}>
      {/* Hero header */}
      <section className='relative flex flex-col items-center justify-center overflow-hidden px-6 pb-10 pt-36 text-center'>
        {/* Glow decorations */}
        <div className='pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]' style={{ background: 'var(--glow-primary)' }} />

        {/* Badge */}
        <div
          className='relative z-10 mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur-sm'
          style={{
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            color: 'var(--text-secondary)',
          }}
        >
          <span className='relative flex h-1.5 w-1.5'>
            <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
            <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400' />
          </span>
          Gallery
        </div>

        <h1 className='relative z-10 font-elgocAlt text-4xl font-bold tracking-tight md:text-6xl' style={{ color: 'var(--text-heading)' }}>
          Ini Cerita<span className='text-emerald-400'>ku</span>
        </h1>
        <p className='relative z-10 mt-4 max-w-md text-base md:text-lg' style={{ color: 'var(--text-muted)' }}>
          Sekilas momen perjalananku — dari kampus, komunitas, hingga petualangan kecil yang membentukku.
        </p>
      </section>

      {/* Gallery marquee rows */}
      <section className='relative w-full overflow-hidden py-10'>
        {/* Fade top & bottom */}
        <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-16' style={{ background: 'linear-gradient(to bottom, var(--section-bg), transparent)' }} />
        <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16' style={{ background: 'linear-gradient(to top, var(--section-bg), transparent)' }} />

        <DomeGallery images={galleryImages} />
      </section>

      <div className='h-16' />
    </div>
  );
}
