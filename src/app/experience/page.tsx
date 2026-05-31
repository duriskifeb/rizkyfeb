import React from 'react';
import { ExperienceSkills } from '~/components';

export const metadata = {
  title: 'Experience | Rizky Febriyanto',
  description: 'Professional experience and skills of Rizky Febriyanto.',
};

export default function ExperiencePage() {
  return (
    <div className='pt-24'>
      <ExperienceSkills />
    </div>
  );
}
