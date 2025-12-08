'use client';

import Link from 'next/link';

import React, { useState } from 'react';

import { data } from '~/lib/data';

import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Copy, Check } from 'lucide-react';

export const Resume = () => {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleRequestResume = () => {
    setShowRequestModal(true);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.resume.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <>
      <div
        className='flex h-screen flex-col items-center justify-evenly gap-24 px-3 sm:px-0'
        id='resume'
      >
        <p className='max-w-xl whitespace-pre-line text-center sm:text-start'>
          {data.resume.description}
        </p>
        <div className='group relative aspect-video w-full max-w-2xl overflow-hidden border'>
          <div
            className='flex h-full w-full flex-col overflow-hidden opacity-90 transition-all duration-300 ease-in-out group-hover:opacity-70'
            style={{
              backgroundImage: 'url(/paper-texture.jpg)',
            }}
          >
            <div className='flex flex-row items-center justify-between px-6 py-4 text-sm font-semibold text-blue-500 md:px-12 md:py-8'>
              <div>Resume {new Date(Date.now()).getFullYear()}</div>
              <Link href={data.resume.website}>
                {data.resume.website.replace('https://', '')}
              </Link>
            </div>
            <div className='py-12 text-center font-elgocAlt text-[2rem] font-medium leading-[0.9] text-blue-500 md:text-[4rem]'>
              {data.resume.name}
              <br />
              <span className='text-[2rem] font-semibold md:text-[4rem]'>
                {data.resume.position}
              </span>
              <div className='flex flex-col items-center justify-center py-4 text-center font-sans'>
                <Link className='text-[9px]' href={`mailto:${data.resume.email}`}>
                  {data.resume.email}
                </Link>
              </div>
            </div>
          </div>
          <button
            onClick={handleRequestResume}
            className='absolute bottom-0 right-1/2 translate-x-1/2 text-xs uppercase text-white opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100 md:bottom-12 md:text-lg hover:underline'
            type='button'
          >
            Request My Resume
          </button>
        </div>
      </div>

      {/* Permission Request Modal */}
      <AnimatePresence>
        {showRequestModal && (
          <>
            <motion.div
              className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRequestModal(false)}
            />
            <motion.div
              className='fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-black/90 p-6 backdrop-blur-md'
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='font-beatriceMedium text-xl font-semibold text-white'>
                  Request Resume Access
                </h3>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className='rounded-lg p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white'
                  aria-label='Close modal'
                  type='button'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>
              <p className='mb-4 text-sm text-white/70'>
                To download my resume, please send me an email with your request. I will review and provide access accordingly.
              </p>
              
              {/* Email Display */}
              <div className='mb-6 rounded-lg border border-white/10 bg-white/5 p-3'>
                <div className='mb-2 text-xs font-medium text-white/50'>Email Address:</div>
                <div className='flex items-center justify-between gap-2'>
                  <a
                    href={`mailto:${data.resume.email}?subject=${encodeURIComponent('Resume Request - Portfolio')}`}
                    className='flex-1 break-all font-beatriceMedium text-sm font-semibold text-white hover:underline'
                  >
                    {data.resume.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className='flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white'
                    type='button'
                    aria-label='Copy email address'
                  >
                    {emailCopied ? (
                      <>
                        <Check className='h-3.5 w-3.5' />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className='h-3.5 w-3.5' />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <a
                  href={`mailto:${data.resume.email}?subject=${encodeURIComponent('Resume Request - Portfolio')}&body=${encodeURIComponent('Hello Amaan,\n\nI would like to request a copy of your resume. Please find my details below:\n\nName:\nCompany/Organization:\nPurpose:\n\nThank you!')}`}
                  onClick={() => {
                    setTimeout(() => {
                      setShowRequestModal(false);
                    }, 200);
                  }}
                  className='flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-beatriceMedium text-sm font-semibold text-white transition-all hover:border-white/20 hover:bg-white/10'
                >
                  <Mail className='h-4 w-4' />
                  Open Email Client
                </a>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className='rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 font-beatriceMedium text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white'
                  type='button'
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
