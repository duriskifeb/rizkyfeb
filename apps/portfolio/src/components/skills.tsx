'use client';

import React, { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const skills = {
  languages: [
    { name: 'Move', level: 5, icon: '🔷' },
    { name: 'Solidity', level: 5, icon: '⛓️' },
    { name: 'Python 3', level: 4, icon: '🐍' },
    { name: 'Rust', level: 3, icon: '🦀' },
    { name: 'JavaScript', level: 5, icon: '📜' },
    { name: 'TypeScript', level: 5, icon: '📘' },
  ],
  web3: [
    'ERC20', 'ERC721', 'EVM', 'MOVE', 'RUST', 'Smart Contracts', 'DeFi', 'GameFi',
    'SocialFi', 'GambleFi', 'zkProofs', 'MPC', 'Tokenomics', 'Governance',
  ],
  ecosystems: [
    'Aptos', 'Movement Labs', 'Mantle', 'Polygon', 'EigenLayer', 'Xenea', 'Xion',
    'Avalanche', 'BNB', 'Flow', 'Monad', 'Chainlink', 'Celo', 'Near', 'Oraichain',
    'Stellar', 'Coinbase', 'WorldCoin', 'Scroll', 'Chiliz', 'Nibiru', 'Citrea',
    'Educhain', 'Ripple', 'Manta', 'Optimism', 'The Graph', 'Inco', 'Starknet',
    'Pyth', 'Stacks', '0g', 'Push', 'Algorand', 'ICP', 'Polkadot', 'SUI',
  ],
};

export const Skills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className='relative z-[2] min-h-screen py-24' id='skills'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6'>
        <motion.div
          className='mb-16 text-center font-elgocAlt text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.9] text-white'
          initial={{ opacity: 0, y: -30 }}
          style={{ opacity }}
          transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Skills
        </motion.div>

        {/* Programming Languages */}
        <motion.div
          className='mb-12'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className='mb-6 font-beatriceMedium text-xl font-semibold text-white/80'>
            Languages
          </h3>
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6'>
            {skills.languages.map((skill, index) => {
              const delay = index * 0.04;
              
              return (
              <motion.div
                key={skill.name}
                className='group relative flex flex-col items-center overflow-hidden rounded-lg border border-white/5 bg-white/[0.03] p-4 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ delay, duration: 0.5, stiffness: 100, type: 'spring' }}
                viewport={{ margin: '-30px', once: true }}
                whileHover={{ 
                  scale: 1.08,
                  transition: { duration: 0.3, stiffness: 300, type: 'spring' },
                  y: -4,
                }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
              >
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                />
                <motion.span 
                  className='mb-2 text-2xl relative z-10'
                  whileHover={{ scale: 1.3, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {skill.icon}
                </motion.span>
                <span className='mb-3 text-center text-sm font-semibold text-white relative z-10'>{skill.name}</span>
                <div className='flex gap-1 relative z-10'>
                  {Array.from({ length: 5 }, (_, i) => i).map((i: number) => {
                    const levelKey = `level-${String(i)}-${skill.name}`;
                    const delay = index * 0.04 + i * 0.05;
                    
                    return (
                    <motion.div
                      key={levelKey}
                      className={`h-1.5 w-3 rounded-full ${
                        i < skill.level ? 'bg-white/70' : 'bg-white/10'
                      }`}
                      initial={{ scale: 0 }}
                      transition={{ delay, duration: 0.3 }}
                      viewport={{ once: true }}
                      whileInView={{ scale: 1 }}
                    />
                    );
                  })}
                </div>
              </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Web3 Stack */}
        <motion.div
          className='mb-12'
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className='mb-6 font-beatriceMedium text-xl font-semibold text-white/80'>
            Web3 Stack
          </h3>
          <div className='flex flex-wrap gap-2.5'>
            {skills.web3.map((tech, index) => {
              const delay = index * 0.015;
              
              return (
              <motion.span
                key={tech}
                className='group relative overflow-hidden rounded-md border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/[0.12] hover:text-white/90 hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ delay, duration: 0.4, stiffness: 150, type: 'spring' }}
                viewport={{ margin: '-20px', once: true }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2, stiffness: 400, type: 'spring' },
                  y: -2,
                }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
              >
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-white/[0.08] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                />
                <span className='relative z-10'>{tech}</span>
              </motion.span>
              );
            })}
          </div>
        </motion.div>

        {/* Ecosystems */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h3 className='mb-6 font-beatriceMedium text-xl font-semibold text-white/80'>
            Ecosystems Worked with/ Built on (30+)
          </h3>
          <div className='flex flex-wrap gap-2.5'>
            {skills.ecosystems.map((ecosystem, index) => {
              const delay = index * 0.01;
              
              return (
              <motion.span
                key={ecosystem}
                className='group relative overflow-hidden rounded-md border border-white/5 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/[0.12] hover:text-white/80 hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ delay, duration: 0.4, stiffness: 150, type: 'spring' }}
                viewport={{ margin: '-20px', once: true }}
                whileHover={{ 
                  scale: 1.08,
                  transition: { duration: 0.2, stiffness: 400, type: 'spring' },
                  y: -2,
                }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
              >
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                />
                <span className='relative z-10'>{ecosystem}</span>
              </motion.span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

