'use client';

import React, { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const grants = [
  {
    protocol: 'Aptos',
    amount: '$5,000',
    project: 'APT-Casino',
    description: 'Grant for building fully on-chain casino on Aptos Ecosystem',
    icon: '🔷',
  },
  {
    protocol: 'Movement Labs',
    amount: '10,000 MOVE Tokens',
    project: 'APT-Casino',
    description: 'Grant for Move-based on-chain gaming platform',
    icon: '🚀',
  },
  {
    protocol: 'Top Blockchain Startup',
    amount: '$6,500',
    project: 'APT-Casino',
    description: 'Award for innovative blockchain startup',
    icon: '🏆',
  },
];

const publications = [
  {
    title: 'AI and Computer Vision Based Face Mask Recognition & Detection System',
    type: 'Research Paper',
    publisher: 'IEEE',
    link: 'https://ieeexplore.ieee.org/document/9478175',
    icon: '📄',
  },
  {
    title: 'AI and Computer Vision Based EyeWriter',
    type: 'Research Paper',
    publisher: 'Springer',
    link: 'https://link.springer.com/chapter/10.1007/978-981-19-6068-0_43',
    icon: '📄',
  },
  {
    title: 'AI and Computer Vision Based Face Mask Recognition & Detection System',
    type: 'Copyright',
    publisher: 'Government of India',
    link: 'https://drive.google.com/file/d/1Lfhn-G67yuZhc9ViPKqJgMwj4AUYwKkv/view',
    icon: '©️',
  },
  {
    title: 'The Next Gen AI Virtual Steering Wheel',
    type: 'Copyright',
    publisher: 'Government of India',
    link: 'https://drive.google.com/file/d/1Af76oFgvMnJyBqWSxicabQzN4zt2BUvL/view',
    icon: '©️',
  },
];

export const Grants = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className='relative z-[2] min-h-screen py-24' id='grants'>
      <div className='mx-auto max-w-5xl px-4 sm:px-6'>
        <motion.div
          className='mb-16 text-center font-elgocAlt text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.9] text-white'
          initial={{ opacity: 0, y: -30 }}
          style={{ opacity }}
          transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Grants
        </motion.div>

        {/* Grants Section */}
        <motion.div
          className='mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {grants.map((grant, index) => {
              const delay = index * 0.08;
              
              return (
              <motion.div
                key={`${grant.protocol}-${grant.project}`}
                className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ delay, duration: 0.6, stiffness: 100, type: 'spring' }}
                viewport={{ margin: '-50px', once: true }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, stiffness: 300, type: 'spring' },
                  y: -6,
                }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
              >
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                />
                <div className='relative z-10'>
                  <div className='mb-4 flex items-center gap-3'>
                    <motion.span 
                      className='text-3xl'
                      whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      {grant.icon}
                    </motion.span>
                    <div>
                      <div className='font-beatriceMedium text-lg font-semibold text-white'>
                        {grant.protocol}
                      </div>
                      <div className='text-xs font-medium text-white/40'>{grant.project}</div>
                    </div>
                  </div>
                  <div className='mb-4 font-elgocAlt text-2xl font-bold text-white'>
                    {grant.amount}
                  </div>
                  <p className='text-sm leading-relaxed text-white/50'>{grant.description}</p>
                </div>
              </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Publications Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className='mb-8 text-center font-beatriceMedium text-xl font-semibold text-white/80'>
            Publications
          </h3>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {publications.map((pub, index) => {
              const uniqueKey = `${pub.title}-${String(pub.publisher)}`;
              const delay = index * 0.08;
              
              return (
              <motion.a
                key={uniqueKey}
                className='group relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                href={pub.link}
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                rel='noopener noreferrer'
                target='_blank'
                transition={{ delay, duration: 0.6, stiffness: 100, type: 'spring' }}
                viewport={{ margin: '-50px', once: true }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3, stiffness: 300, type: 'spring' },
                  y: -6,
                }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
              >
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                />
                <div className='relative z-10 mb-2 flex items-start gap-3'>
                  <motion.span 
                    className='text-2xl'
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {pub.icon}
                  </motion.span>
                  <div className='flex-1'>
                    <div className='mb-2 rounded-md bg-white/[0.12] border border-white/10 px-2.5 py-1 text-xs font-semibold text-white/80 inline-block backdrop-blur-sm'>
                      {pub.type}
                    </div>
                    <div className='mb-2 font-beatriceMedium text-base font-semibold text-white leading-snug'>
                      {pub.title}
                    </div>
                    <div className='text-xs font-medium text-white/40'>{pub.publisher}</div>
                  </div>
                </div>
              </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

