'use client';

import React, { useRef } from 'react';

import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
  {
    company: 'Bharat DAO',
    role: 'Co-Founder & CEO',
    period: 'Jun 2025 - Aug 2025',
    location: 'Remote',
    description: "Built Indias' fastest-growing Web3 Developer community. Gateway for 1000+ Global Blockchains & Protocols. Grew from ZERO to 10,000+ developers in 45 days with 100% weekly growth rate.",
    highlight: '10,000+ developers in 45 days',
  },
  {
    company: 'APT-Casino',
    role: 'Co-Founder & CEO',
    period: 'Jul 2024 - Apr 2025',
    location: 'Remote',
    description: 'Built a fully on-chain casino for the Aptos Ecosystem. Backed by Aptos and Movement Labs. Grants: $5,000 (Aptos), 10,000 MOVE (Movement Labs), $6,500 (Top Blockchain Startup Award).',
    highlight: 'Won 15 hackathons',
  },
  {
    company: 'Convex Foundation',
    role: 'DevRel',
    period: 'Apr 2024 - Jun 2024',
    location: 'London, UK (Remote)',
    description: 'Onboarded 20+ protocols, developer docs write-up & feedback, designed growth strategy, tokenomics and governance. Led Development Team and Developer Advocate Program.',
    highlight: '7000% community growth',
  },
  {
    company: 'Polygon',
    role: 'Developer Advocate',
    period: 'Mar 2022 - Jan 2024',
    location: 'Bengaluru, India (Remote)',
    description: 'Onboarded 15,000+ new members to the community and orchestrated 12 impactful events. Increased technical community engagement by 300%, generated 25% increase in project collaborations.',
    highlight: '15,000+ members onboarded',
  },
  {
    company: 'buildspace',
    role: 'N&W S4 Builder',
    period: 'Sep 2023 - Oct 2023',
    location: 'San Francisco, California (Remote)',
    description: '6-week program funded by Y Combinator, a16z to build a revolutionary product in tech. Ended with 3-day demo weekend in San Francisco and Dubai.',
    highlight: 'Y Combinator & a16z funded',
  },
  {
    company: 'Phyllo',
    role: 'Software Engineer Intern',
    period: 'Aug 2022 - Oct 2022',
    location: 'San Francisco, California (Remote)',
    description: 'Performed Unit Test Cases for product classes. Integration Implementer for WalletConnect, NFT Production and Distribution.',
    highlight: 'WalletConnect integration',
  },
  {
    company: '5ireChain',
    role: 'Junior Software Developer',
    period: 'Jan 2022 - Mar 2022',
    location: 'London, UK (Remote)',
    description: 'Worked on Backend Build of the 5ire.org portal for package migration & Multi-stage docker file builds. Responsible for UI/UX Upgradation & Smart build on the front-end.',
    highlight: 'Backend & Frontend work',
  },
  {
    company: 'Affine Group',
    role: 'Software Development Engineer Intern',
    period: 'Aug 2021 - May 2022',
    location: 'London, UK (Remote)',
    description: 'Built, integrated, tested and deployed open-source banking application Cyclos onto Node-Red, IBM Cloud, Google Cloud Platform and Hyperledger Fabric.',
    highlight: 'Multi-cloud deployment',
  },
];

export const WorkExperience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className='relative z-[2] min-h-screen py-24' id='experience'>
      <div className='mx-auto max-w-5xl px-4 sm:px-6'>
        <motion.div
          className='mb-20 text-center font-elgocAlt text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.9] text-white'
          initial={{ opacity: 0, y: -30 }}
          style={{ opacity }}
          transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Experience
        </motion.div>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-6 top-0 h-full w-0.5 bg-white/10 md:left-1/2' />

          {experiences.map((exp, index) => {
            const uniqueKey = `${exp.company}-${String(exp.period)}`;
            const xOffset = index % 2 === 0 ? -30 : 30;
            const delay = index * 0.08;
            
            return (
            <motion.div
              key={uniqueKey}
              className='relative mb-16 flex items-start gap-6 md:mb-24'
              initial={{ opacity: 0, x: xOffset }}
              transition={{ delay, duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              {/* Timeline dot */}
              <div className='relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-black md:absolute md:left-1/2 md:-translate-x-1/2'>
                <div className='h-3 w-3 rounded-full bg-white/40' />
              </div>

              {/* Content card */}
              <motion.div
                className={`group relative flex-1 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
                  index % 2 === 0 ? 'md:mr-auto md:w-[48%]' : 'md:ml-auto md:w-[48%]'
                }`}
                whileHover={{ 
                  scale: 1.03,
                  y: -4,
                  transition: { duration: 0.3, type: 'spring', stiffness: 300 }
                }}
              >
                {/* Subtle gradient overlay */}
                <motion.div
                  className='absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                />
                <div className='relative z-10'>
                  <div className='mb-3 flex flex-wrap items-baseline gap-2'>
                    <span className='font-beatriceMedium text-lg font-semibold text-white'>
                      {exp.role}
                    </span>
                    <span className='text-white/30'>@</span>
                    <span className='font-beatriceMedium text-lg font-semibold text-white/90'>
                      {exp.company}
                    </span>
                  </div>
                  <div className='mb-4 text-xs font-medium text-white/40 tracking-wide'>
                    {exp.period} • {exp.location}
                  </div>
                  <div className='mb-4 rounded-lg bg-white/[0.08] border border-white/5 px-3 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm'>
                    {exp.highlight}
                  </div>
                  <p className='text-sm leading-relaxed text-white/50'>{exp.description}</p>
                </div>
              </motion.div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

