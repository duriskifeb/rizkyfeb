import React from 'react';

import {
  AboutAchievements,
  Blogs,
  City,
  DomeGallery,
  ExperienceSkills,
  Footer,
  GrantsSpeaking,
  Hackathons,
  Header,
  Interests,
  Projects,
  ResumeContact,
  ScrollToTop,
  WorldMap,
} from '~/components';

import { hackathons } from '~/components/hackathons';

// 1. Definisikan daftar gambar untuk galeri (Bisa diganti dengan gambar projectmu nanti)
const galleryImages = [
  'https://picsum.photos/id/10/800/600',
  'https://picsum.photos/id/15/800/600',
  'https://picsum.photos/id/20/800/600',
  'https://picsum.photos/id/30/800/600',
  'https://picsum.photos/id/40/800/600',
  'https://picsum.photos/id/50/800/600',
  'https://picsum.photos/id/60/800/600',
  'https://picsum.photos/id/70/800/600',
  'https://picsum.photos/id/80/800/600',
  'https://picsum.photos/id/90/800/600',
];

const Home = () => {
  return (
    <>
      <Header />
      {/* <City /> */}
      {/* 2. Container Wajib untuk DomeGallery */}
      {/* h-screen: Menggunakan tinggi layar penuh agar gallery punya ruang */}
      {/* bg-black: Background gelap agar gallery terlihat jelas */}
      {/* // Di dalam return Home component */}
      <div className='relative h-screen w-full overflow-hidden bg-black'>
        <DomeGallery
          images={galleryImages} // Array gambar kamu
          fit={0.65} // Zoom level bola
          minRadius={500} // Jarak radius
          maxRadius={800}
          className='z-10' // Agar di atas background lain
        />

        {/* Judul opsional */}
        <div className='pointer-events-none absolute left-0 top-10 z-20 w-full text-center'>
          <h2 className='text-3xl font-bold text-white drop-shadow-lg'>
            Project Gallery
          </h2>
          <p className='text-sm text-gray-400'>
            Drag to explore • Click to expand
          </p>
        </div>
      </div>
      {/* <Interests /> */}
      {/* (Titik koma yang error sudah dihapus di sini) */}
      <AboutAchievements />
      {/* <ExperienceSkills /> */}
      {/* <Projects /> */}
      {/* <Hackathons /> */}
      {/* <WorldMap hackathons={hackathons} /> */}
      {/* <GrantsSpeaking /> */}
      {/* <Blogs /> */}
      <ResumeContact />
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Home;
