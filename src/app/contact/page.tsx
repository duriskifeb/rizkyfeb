import React from 'react';
import { ResumeContact } from '~/components';

export const metadata = {
  title: 'Contact | Rizky Febriyanto',
  description: 'Get in touch with Rizky Febriyanto.',
};

export default function ContactPage() {
  return (
    <div className='pt-24'>
      <ResumeContact />
    </div>
  );
}
