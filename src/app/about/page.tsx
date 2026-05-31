import React from 'react';
import { AboutAchievements } from '~/components';

export const metadata = {
  title: 'About | Rizky Febriyanto',
  description: 'Learn more about Rizky Febriyanto, a Software Engineer.',
};

export default function AboutPage() {
  return (
    <div className='pt-24'>
      <AboutAchievements />
    </div>
  );
}
