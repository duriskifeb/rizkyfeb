'use client';

import React, { useRef, useState } from 'react';

import { data } from '~/lib/data';

import { motion } from 'framer-motion';

import {
  ArrowUpRight,
  Check,
  Copy,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
} from 'lucide-react';

// --- KOMPONEN SOCIAL LINK (Minimalis Style) ---
const SocialLink = ({
  href,
  icon,
  label,
  username,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  username: string;
}) => (
  <a
    href={href}
    target='_blank'
    rel='noopener noreferrer'
    className='group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] hover:shadow-lg'
  >
    <div className='flex items-center gap-3'>
      <div className='flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-400 transition-colors group-hover:bg-white/10 group-hover:text-white'>
        {icon}
      </div>
      <div className='flex flex-col text-left'>
        <span className='text-xs font-medium uppercase tracking-wider text-gray-500'>
          {label}
        </span>
        <span className='font-mono text-sm text-gray-300 transition-colors group-hover:text-white'>
          {username}
        </span>
      </div>
    </div>
    <ArrowUpRight className='h-5 w-5 text-gray-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white' />
  </a>
);

export const ResumeContact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [emailCopied, setEmailCopied] = useState(false);

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
    <section
      ref={containerRef}
      id='contact'
      className='relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-[#024538] px-6 py-24 md:px-12'
    >
      {/* 1. Background Decor (Aurora Glow Halus) */}
      <div className='pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-30'>
        <div className='absolute inset-0 animate-pulse rounded-full bg-emerald-500/15 blur-[120px]' />
        <div className='absolute left-10 top-10 h-full w-full animate-pulse rounded-full bg-teal-600/10 blur-[120px] delay-1000' />
      </div>

      <div className='relative z-10 mx-auto w-full max-w-4xl'>
        {/* Header Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='mb-12 text-center'
        >
          <h2 className='mb-4 font-elgocAlt text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl'>
            Let's start a <br />
            <span className='bg-gradient-to-r from-emerald-400 via-teal-300 to-white bg-clip-text text-transparent'>
              conversation.
            </span>
          </h2>
          <p className='mx-auto max-w-lg text-lg text-gray-400'>
            Interested in collaboration or just want to say hi? <br />
            My inbox is always open.
          </p>
        </motion.div>

        {/* --- MAIN CARD --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className='overflow-hidden rounded-3xl border border-white/10 bg-[#033D2D]/80 backdrop-blur-xl'
        >
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {/* KIRI: Email Action Area */}
            <div className='flex flex-col justify-center border-b border-white/5 p-8 md:border-b-0 md:border-r md:p-12'>
              <div className='mb-6'>
                <div className='mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400'>
                  <span className='relative flex h-2 w-2'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75'></span>
                    <span className='relative inline-flex h-2 w-2 rounded-full bg-green-500'></span>
                  </span>
                  Available for work
                </div>
                <h3 className='text-2xl font-bold text-white'>
                  Drop me an email
                </h3>
              </div>

              {/* Email Copy Bar */}
              <div className='group relative flex items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-black/40 p-2 pl-4 transition-colors hover:border-white/20'>
                <code className='truncate font-mono text-sm text-gray-300 transition-colors group-hover:text-white'>
                  {data.resume.email}
                </code>
                <button
                  onClick={handleCopyEmail}
                  className='flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-all hover:bg-white hover:text-black active:scale-95'
                  title='Copy Email'
                >
                  {emailCopied ? (
                    <Check className='h-4 w-4' />
                  ) : (
                    <Copy className='h-4 w-4' />
                  )}
                </button>
              </div>

              <div className='mt-6 flex gap-3'>
                <a
                  href={`mailto:${data.resume.email}`}
                  className='flex-1 rounded-xl bg-white py-3 text-center text-sm font-bold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]'
                >
                  Send Email
                </a>
              </div>
            </div>

            {/* KANAN: Social Links Grid */}
            <div className='bg-white/[0.01] p-8 md:p-12'>
              <div className='grid gap-4'>
                <SocialLink
                  href='https://linkedin.com/in/rizkyfeb' // Ganti username
                  icon={<Linkedin className='h-5 w-5' />}
                  label='Professional'
                  username='@rizkyfeb'
                />
                <SocialLink
                  href='https://github.com/rizkyfeb' // Ganti username
                  icon={<Github className='h-5 w-5' />}
                  label='Codebase'
                  username='@rizkyfeb'
                />
                <SocialLink
                  href='https://instagram.com/rizkyfeb' // Ganti username
                  icon={<Instagram className='h-5 w-5' />}
                  label='Lifestyle'
                  username='@rizkyfeb'
                />
                <SocialLink
                  href='https://wa.me/62812345678' // Ganti nomor
                  icon={<MessageCircle className='h-5 w-5' />}
                  label='Quick Chat'
                  username='+62 812...'
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
