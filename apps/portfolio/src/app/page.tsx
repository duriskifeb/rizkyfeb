import React from 'react';

import {
  AboutAchievements,
  Blogs,
  CircularGallery,
  City,
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

const placeholderItems = [
  { image: 'https://picsum.photos/400/400?1', text: 'Placeholder 1' },
  { image: 'https://picsum.photos/400/400?2', text: 'Placeholder 2' },
  { image: 'https://picsum.photos/400/400?3', text: 'Placeholder 3' },
];

const Home = () => {
  return (
    <>
      <Header />
      {/* <City /> */}
      <CircularGallery
        items={placeholderItems}
        bend={3}
        borderRadius={0.05}
        scrollSpeed={2}
        scrollEase={0.05}
        textColor='#fff'
      />
      ;{/* <Interests /> */}
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
