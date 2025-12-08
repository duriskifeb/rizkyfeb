'use client';

import Link from 'next/link';

import React, { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Mail, 
  Twitter, 
  Linkedin, 
  Github,
  MessageCircle,
  ExternalLink,
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

export const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);

  return (
    <div
      ref={ref}
      className='relative z-[2] flex min-h-screen flex-col items-center justify-center gap-12 px-4 sm:px-6'
      id='contact'
    >
      <motion.div
        className='text-center font-elgocAlt text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.9] text-white'
        style={{ opacity, y }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        Lets Connect
      </motion.div>

      <motion.p
        className='max-w-2xl text-center font-beatriceMedium text-lg text-white/60'
        style={{ opacity }}
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
        className='grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
        style={{ opacity }}
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
                delay: index * 0.1,
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
        style={{ opacity }}
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
    </div>
  );
};
