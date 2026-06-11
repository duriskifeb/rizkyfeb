'use client';

import React from 'react';

import { Button } from './ui/button';

import { motion } from 'framer-motion';
import { BinaryIcon, ArrowUp, Github, Twitter, Linkedin, Mail, MessageCircle } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: 'https://x.com/rizkyfeb', label: 'Twitter' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/rizkyfeb', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/rizkyfeb', label: 'GitHub' },
  { icon: Mail, href: 'mailto:rizkyfeb@gmail.com', label: 'Email' },
  { icon: MessageCircle, href: 'https://wa.me/62', label: 'WhatsApp' },
];

export const Footer = () => {
  return (
    <div
      className='relative z-[2] flex min-h-[8dvh] flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6'
      style={{
        background: 'var(--footer-bg)',
        borderTop: '1px solid var(--footer-border)',
      }}
    >
      <div className='flex items-center gap-3'>
        <BinaryIcon size='1.5rem' style={{ color: 'var(--text-muted)' }} />
        <span className='font-beatriceMedium text-sm' style={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} M Rizky Febriyanto
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
                className='group relative rounded-lg p-2 backdrop-blur-sm transition-all duration-300'
                style={{
                  border: '1px solid var(--card-border)',
                  background: 'var(--card-bg)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label={social.label}
              >
                <Icon className='h-4 w-4 transition-colors' style={{ color: 'var(--text-secondary)' }} />
              </motion.a>
            );
          })}
        </div>

        <Button
          className='group flex items-center gap-2 text-sm uppercase backdrop-blur-sm transition-all duration-300'
          variant='outline'
          style={{
            border: '1px solid var(--card-border)',
            background: 'var(--card-bg)',
            color: 'var(--text-secondary)',
          }}
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
