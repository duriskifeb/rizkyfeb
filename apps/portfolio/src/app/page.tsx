import React from 'react';

// import HeaderImage from '../../public/images/';
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

  // 'https://picsum.photos/id/15/800/600',
  // 'https://picsum.photos/id/20/800/600',
  // 'https://picsum.photos/id/30/800/600',
  // 'https://picsum.photos/id/40/800/600',
  // 'https://picsum.photos/id/50/800/600',
  // 'https://picsum.photos/id/60/800/600',
  // 'https://picsum.photos/id/70/800/600',
  // 'https://picsum.photos/id/80/800/600',
  // 'https://picsum.photos/id/90/800/600',
];

const Home = () => {
  return (
    <>
      <Header />
      {/* <City /> */}
      <AboutAchievements />
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
            Ini Cerita ku
          </h2>
          <p className='text-sm text-gray-400'>
            Drag to explore • Click to expand
          </p>
        </div>
      </div>
      {/* <Interests /> */}
      <ExperienceSkills />
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
