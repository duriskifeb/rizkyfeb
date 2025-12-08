'use client';

import React from 'react';

import { Button } from './ui/button';

import { motion } from 'framer-motion';
import { BinaryIcon, ArrowUp, Github, Twitter, Linkedin, Mail, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/amaanbiz', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/amaan-sayyad-/', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/AmaanSayyad', label: 'GitHub' },
  { icon: Mail, href: 'mailto:amaansayyad2001@gmail.com', label: 'Email' },
  { icon: MessageCircle, href: 'https://t.me/amaan029', label: 'Telegram' },
];

export const Footer = () => {
  return (
    <div className='relative z-[2] flex min-h-[8dvh] flex-col items-center justify-between gap-4 border-t border-white/5 px-4 py-6 sm:flex-row sm:px-6'>
      <div className='flex items-center gap-3'>
        <BinaryIcon size='1.5rem' className='text-white/60' />
        <span className='font-beatriceMedium text-sm text-white/50'>
          © {new Date().getFullYear()} Amaan Sayyad
        </span>
      </div>

      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-3'>
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.label}
                href={social.href}
                target='_blank'
                rel='noopener noreferrer'
                className='group relative rounded-lg border border-white/5 bg-white/[0.03] p-2 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08]'
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label={social.label}
              >
                <Icon className='h-4 w-4 text-white/60 transition-colors group-hover:text-white' />
              </motion.a>
            );
          })}
        </div>

      <Button
          className='group flex items-center gap-2 border-white/5 bg-white/[0.03] text-sm uppercase text-white/70 backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:bg-white/[0.08] hover:text-white'
          variant='outline'
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      >
          <ArrowUp className='h-4 w-4 transition-transform group-hover:-translate-y-1' />
          Top
      </Button>
      </div>
    </div>
  );
};
