import React from 'react';

import {
  AboutAchievements,
  Blogs,
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

const Home = () => {
  return (
    <>
      <Header />
      {/* <City /> */}
      <Interests />
      <AboutAchievements />
      {/* <ExperienceSkills /> */}
      {/* <Projects /> */}
      {/* <Hackathons /> */}
      {/* <WorldMap hackathons={hackathons} /> */}
      {/* <GrantsSpeaking /> */}
      {/* <Blogs /> */}
      {/* <ResumeContact /> */}
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Home;
