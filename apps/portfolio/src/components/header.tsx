'use client';

import Image from 'next/image';

import { useEffect, useMemo, useState } from 'react';

import { Particles, initParticlesEngine } from '@tsparticles/react';
import { loadFull } from 'tsparticles';
import Typewriter from 'typewriter-effect';
import { useScreen } from 'usehooks-ts';

import HeaderImage from '../../public/header.svg';
// Pastikan path import ini sesuai dengan struktur folder project kamu
import { getParticles } from '../lib/particles';

export const Header = () => {
  const screen = useScreen();
  const [init, setInit] = useState(false);

  // Inisialisasi engine partikel sekali saja saat mount
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Mengambil konfigurasi partikel berdasarkan lebar layar
  const options = useMemo(() => {
    if (screen) {
      return getParticles(screen.width);
    }
  }, [screen]);

  // Render loading state (layar hitam) jika partikel belum siap
  if (!init || !options) {
    return <div className='min-h-screen bg-[#0b0b0d]' />;
  }

  return (
    <section className='relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0b0b0d] py-20'>
      {/* === 1. AESTHETIC: AMBIENT GLOW (Lebih Soft) === */}
      {/* Efek cahaya blur di belakang konten agar background tidak terlihat mati/flat */}
      <div className='pointer-events-none absolute left-1/2 top-1/2 z-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/20 mix-blend-screen blur-[120px]' />
      <div className='pointer-events-none absolute left-1/2 top-1/2 z-0 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[80px]' />

      {/* === 2. CONTAINER UTAMA === */}
      <div className='relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4'>
        {/* === PEMBUNGKUS RELATIVE (GAMBAR & PARTIKEL) === */}
        {/* PERUBAHAN: Ditambahkan 'bg-white'. Ini membuat "lubang" teks pada gambar menjadi putih terang */}
        <div className='relative w-full max-w-[850px] bg-white'>
          {/* A. PARTIKEL (Background Masking) */}
          {/* inset-0 memastikan partikel hanya seukuran kotak gambar ini */}
          <Particles
            className='absolute inset-0 z-0 opacity-80' // Sedikit transparan agar elegan
            id='tsparticles'
            options={options}
          />

          {/* B. GAMBAR HEADER (Utama) */}
          {/* PERUBAHAN: Menggunakan width/height 0 dengan w-full h-auto */}
          {/* Ini membuat rasio gambar "rizkyfeb" otomatis benar, tidak gepeng */}
          <Image
            alt='Header Rizkyfeb'
            src={HeaderImage}
            width={0}
            height={0}
            sizes='100vw'
            className='relative z-10 h-auto w-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]' // Efek glow halus
            priority
          />
        </div>

        {/* === C. TEKS TYPEWRITER === */}
        <div className='z-20 mt-10 text-center'>
          <div className='font-mono text-2xl font-bold tracking-wide text-white drop-shadow-xl md:text-4xl'>
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

      {/* === 3. AESTHETIC: SCROLL INDICATOR === */}
      {/* Indikator mouse animasi di bagian bawah layar */}
      {/* UPDATE: bottom-32 (sebelumnya bottom-10) untuk menaikkan posisi */}
      <div className='absolute bottom-32 left-1/2 z-20 flex -translate-x-1/2 animate-bounce flex-col items-center gap-3 opacity-50'>
        <span className='font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 md:text-xs'>
          Scroll
        </span>
        <div className='flex h-[36px] w-[20px] justify-center rounded-full border border-white/20 bg-white/5 pt-2 backdrop-blur-sm'>
          <div className='h-2 w-0.5 animate-pulse rounded-full bg-white/60' />
        </div>
      </div>
    </section>
  );
};
