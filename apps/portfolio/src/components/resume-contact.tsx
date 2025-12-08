'use client';

import Link from 'next/link';

import React, { useRef, useState } from 'react';

import { data } from '~/lib/data';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Mail, 
  Twitter, 
  Linkedin, 
  Github,
  MessageCircle,
  ExternalLink,
  X,
  Copy,
  Check,
} from 'lucide-react';

const socialLinks = [
  {
    title: 'Email',
    link: 'mailto:amaansayyad2001@gmail.com',
    icon: Mail,
    color: 'text-white/80 hover:text-white',
    bg: 'bg-white/[0.08] hover:bg-white/[0.12]',
  },
  {
    title: 'Twitter / X',
    link: 'https://x.com/amaanbiz',
    icon: Twitter,
    color: 'text-white/80 hover:text-white',
    bg: 'bg-white/[0.08] hover:bg-white/[0.12]',
  },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com/in/amaan-sayyad-/',
    icon: Linkedin,
    color: 'text-white/80 hover:text-white',
    bg: 'bg-white/[0.08] hover:bg-white/[0.12]',
  },
  {
    title: 'GitHub',
    link: 'https://github.com/AmaanSayyad',
    icon: Github,
    color: 'text-white/80 hover:text-white',
    bg: 'bg-white/[0.08] hover:bg-white/[0.12]',
  },
  {
    title: 'Telegram',
    link: 'https://t.me/amaan029',
    icon: MessageCircle,
    color: 'text-white/80 hover:text-white',
    bg: 'bg-white/[0.08] hover:bg-white/[0.12]',
  },
];

export const ResumeContact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, -30]);
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, 30]);

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
      <div ref={ref} className='relative z-[2] min-h-screen' id='resume'>
        <div className='sticky top-0 flex min-h-screen flex-col items-center overflow-hidden md:flex-row'>
          {/* Left Side - Resume */}
          <motion.div
            className='relative flex h-full min-h-screen w-full flex-col items-center justify-center border-b border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent px-4 py-16 sm:px-8 md:w-1/2 md:border-b-0 md:border-r md:px-12 md:py-0'
            style={{ opacity: leftOpacity, x: leftX }}
          >
            <motion.div
              className='mb-8 font-elgocAlt text-[3rem] sm:text-[4rem] md:text-[5rem] leading-[0.9] text-white'
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
            >
              Resume
            </motion.div>

            <motion.p
              className='mb-8 max-w-xl whitespace-pre-line text-center font-beatriceMedium text-base text-white/70 sm:text-start'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {data.resume.description}
            </motion.p>

            <motion.div
              className='group relative aspect-video w-full max-w-2xl overflow-hidden border border-white/10'
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
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
            </motion.div>
          </motion.div>

          {/* Right Side - Contact */}
          <motion.div
            className='relative flex h-full min-h-screen w-full flex-col items-center justify-center border-t border-white/10 bg-gradient-to-l from-white/[0.02] to-transparent px-4 py-16 sm:px-8 md:w-1/2 md:border-t-0 md:border-l md:px-12 md:py-0'
            style={{ opacity: rightOpacity, x: rightX }}
          >
            <motion.div
              className='mb-8 font-elgocAlt text-[3rem] sm:text-[4rem] md:text-[5rem] leading-[0.9] text-white'
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
            >
              Lets Connect
            </motion.div>

            <motion.p
              className='mb-8 max-w-2xl text-center font-beatriceMedium text-lg text-white/60'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Open to exciting opportunities in DevRel, Blockchain Development, and Entrepreneurship.
              <br />
              Lets build something amazing together!
            </motion.p>

            <motion.div
              className='grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2'
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.title}
                    href={social.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='group relative flex items-center gap-4 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.5,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -6,
                      transition: { duration: 0.3, type: 'spring', stiffness: 300 },
                    }}
                  >
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                    />
                    <div className={`relative z-10 rounded-lg ${social.bg} p-3 transition-all duration-300`}>
                      <Icon className={`h-6 w-6 ${social.color} transition-colors duration-300`} />
                    </div>
                    <div className='relative z-10 flex-1'>
                      <div className='font-beatriceMedium text-base font-semibold text-white'>
                        {social.title}
                      </div>
                      <div className='mt-1 flex items-center gap-1 text-xs text-white/50'>
                        <span>Open</span>
                        <ExternalLink className='h-3 w-3' />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </motion.div>

            <motion.div
              className='mt-8 text-center'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className='font-beatriceMedium text-sm text-white/40'>
                Prefer a direct message? Reach out on{' '}
                <Link
                  href='https://x.com/amaanbiz'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white/70 underline underline-offset-2 hover:text-white transition-colors'
                >
                  Twitter
                </Link>{' '}
                or{' '}
                <Link
                  href='https://www.linkedin.com/in/amaan-sayyad-/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-white/70 underline underline-offset-2 hover:text-white transition-colors'
                >
                  LinkedIn
                </Link>
              </p>
            </motion.div>
          </motion.div>
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

