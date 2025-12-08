'use client';

import React, { useRef, useEffect } from 'react';

import Image from 'next/image';

import { Globe, Twitter, MessageCircle, FileText, Video, Presentation } from 'lucide-react';

import { motion, useScroll, useTransform } from 'framer-motion';

const getLinkIcon = (label: string) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes('x') || lowerLabel.includes('twitter')) {
    return Twitter;
  }
  if (lowerLabel.includes('discord')) {
    return MessageCircle;
  }
  if (lowerLabel.includes('website')) {
    return Globe;
  }
  if (lowerLabel.includes('litepaper') || lowerLabel.includes('paper')) {
    return FileText;
  }
  if (lowerLabel.includes('video')) {
    return Video;
  }
  if (lowerLabel.includes('pitch') || lowerLabel.includes('deck')) {
    return Presentation;
  }
  return Globe;
};

// Map company names to their logo file paths for work experience
const getExperienceLogo = (company: string): string | null => {
  const logoMap: Record<string, string> = {
    'Bharat DAO': '/bharat_dao.jpg',
    'APT-Casino': '/APT-Casino.png',
    'Convex Foundation': '/convex.png',
    'Polygon': '/polygon.jpg',
    'buildspace': '/buildspace.jpg',
    'Phyllo': '/phyllo.png',
    '5ireChain': '/5irechain.jpg',
    'Affine Group': '/affine_group.jpeg',
    'SoCool': '/socool.jpeg',
  };
  
  return logoMap[company] ?? null;
};

interface ExperienceLink {
  label: string;
  url: string;
}

interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlight: string;
  links?: ExperienceLink[];
}

const experiences: Experience[] = [
  {
    company: 'Bharat DAO',
    role: 'Co-Founder & CEO',
    period: 'Jun 2025 - Aug 2025',
    location: 'Remote',
    description: "Built Indias' fastest-growing Web3 Developer community. Gateway for 1000+ Global Blockchains & Protocols. Grew from ZERO to 10,000+ developers in 45 days with 100% weekly growth rate.",
    highlight: '10,000+ developers in 45 days',
    links: [
      { label: 'X', url: 'https://x.com/bharat_dao_' },
      { label: 'Website', url: 'https://bharat-dao.vercel.app/' },
    ],
  },
  {
    company: 'APT-Casino',
    role: 'Co-Founder & CEO',
    period: 'Jul 2024 - Apr 2025',
    location: 'Remote',
    description: 'Built a fully on-chain casino for the Aptos Ecosystem. Backed by Aptos and Movement Labs. Grants: $5,000 (Aptos), 10,000 MOVE (Movement Labs), $6,500 (Top Blockchain Startup Award). Won 15 hackathons.',
    highlight: 'Won 15 hackathons',
    links: [
      { label: 'Pitch Deck', url: 'https://www.figma.com/slides/7dikFunYfSCoTzFgufpNBv/APT-Casino-Aptos?node-id=0-1&t=5jK7zouSr3B8QfBC-1' },
      { label: 'Litepaper', url: 'https://docs.google.com/document/d/1yn4I_o_U_DiNIRn-qfzelF-dKzcPVSnMORCMsfcwXxQ/edit?usp=sharing' },
      { label: 'Pitch Video', url: 'https://drive.google.com/file/d/1i-LBGqOFhsJh1ml5Xj4QIRbwRk8byD_V/view?usp=sharing' },
      { label: 'Website', url: 'https://apt-casino-aptos.vercel.app/' },
    ],
  },
  {
    company: 'Convex Foundation',
    role: 'DevRel',
    period: 'Apr 2024 - Jun 2024',
    location: 'London, UK (Remote)',
    description: 'Onboarded 20+ protocols, developer docs write-up & feedback, designed growth strategy, tokenomics and governance. Led Development Team and Developer Advocate Program.',
    highlight: '7000% community growth',
    links: [
      { label: 'Website', url: 'https://convex.world/' },
      { label: 'Discord', url: 'https://discord.com/invite/xfYGq4CT7v' },
    ],
  },
  {
    company: 'Polygon',
    role: 'Developer Advocate',
    period: 'Mar 2022 - Jan 2024',
    location: 'Bengaluru, India (Remote)',
    description: 'Onboarded 15,000+ new members to the community and orchestrated 12 impactful events. Increased technical community engagement by 300%, generated 25% increase in project collaborations.',
    highlight: '15,000+ members onboarded',
    links: [
      { label: 'X', url: 'https://x.com/0xPolygon' },
      { label: 'Website', url: 'https://polygon.technology/' },
      { label: 'Discord', url: 'https://discord.com/invite/0xPolygonCommunity' },
    ],
  },
  {
    company: 'buildspace',
    role: 'N&W S4 Builder',
    period: 'Sep 2023 - Oct 2023',
    location: 'San Francisco, California (Remote)',
    description: '6-week program funded by Y Combinator, a16z to build a revolutionary product in tech. Ended with 3-day demo weekend in San Francisco and Dubai.',
    highlight: 'Y Combinator & a16z funded',
    links: [
      { label: 'X', url: 'https://x.com/_buildspace' },
    ],
  },
  {
    company: 'Phyllo',
    role: 'Software Engineer Intern',
    period: 'Aug 2022 - Oct 2022',
    location: 'San Francisco, California (Remote)',
    description: 'Performed Unit Test Cases for product classes. Integration Implementer for WalletConnect, NFT Production and Distribution.',
    highlight: 'WalletConnect integration',
    links: [
      { label: 'Website', url: 'https://www.getphyllo.com/' },
    ],
  },
  {
    company: '5ireChain',
    role: 'Junior Software Developer',
    period: 'Jan 2022 - Mar 2022',
    location: 'London, UK (Remote)',
    description: 'Worked on Backend Build of the 5ire.org portal for package migration & Multi-stage docker file builds. Responsible for UI/UX Upgradation & Smart build on the front-end.',
    highlight: 'Backend & Frontend work',
    links: [
      { label: 'X', url: 'https://x.com/5ireChain' },
      { label: 'Website', url: 'https://5ire.org/' },
    ],
  },
  {
    company: 'Affine Group',
    role: 'Software Development Engineer Intern',
    period: 'Aug 2021 - May 2022',
    location: 'London, UK (Remote)',
    description: 'Built, integrated, tested and deployed open-source banking application Cyclos onto Node-Red, IBM Cloud, Google Cloud Platform and Hyperledger Fabric.',
    highlight: 'Multi-cloud deployment',
    links: [],
  },
  {
    company: 'SoCool',
    role: 'Full Stack Developer',
    period: 'Dec 2021 - Feb 2022',
    location: 'Oslo, Norway (Remote)',
    description: 'Developed an NFT Marketplace for Creating, Collecting and Distributing NFTs among users via Blockchain Technology. Created an E-learning app where courses minted NFTs and users pay by Crypto.',
    highlight: 'NFT Marketplace & E-learning app',
    links: [],
  },
];

// Map language names to their logo file paths
const getLanguageLogo = (language: string): string | null => {
  const logoMap: Record<string, string> = {
    'Move': '/move.png',
    'Solidity': '/solidity.png',
    'Python 3': '/python.jpeg',
    'JavaScript': '/javascript.png',
    'TypeScript': '/typescript.png',
  };
  
  return logoMap[language] ?? null;
};

// Map ecosystem names to their logo file paths
const getEcosystemLogo = (ecosystem: string): string | null => {
  const logoMap: Record<string, string> = {
    'Aptos': '/aptos.png',
    'Movement Labs': '/movement_labs.jpeg',
    'Mantle': '/mantle.png',
    'Polygon': '/polygon.jpg',
    'EigenLayer': '/eigenlayer.png',
    'Xenea': '/xenea.avif',
    'Xion': '/xion.png',
    'Avalanche': '/avalanche.jpg',
    'BNB': '/bnbchain.png',
    'Flow': '/flow.png',
    'Monad': '/monad.png',
    'Chainlink': '/chainlink.png',
    'Celo': '/celo.png',
    'Near': '/near.png',
    'Oraichain': '/oraichain.png',
    'Stellar': '/stellar.png',
    'Coinbase': '/coinbase.png',
    'WorldCoin': '/worldcoin.png',
    'Scroll': '/scroll.png',
    'Chiliz': '/chiliz.png',
    'Nibiru': '/nibiru.jpeg',
    'Citrea': '/citrea.png',
    'Educhain': '/educhain.png',
    'Ripple': '/ripple.png',
    'Manta': '/manta.png',
    'Optimism': '/optimism.png',
    'The Graph': '/the_graph.jpeg',
    'Inco': '/inco.png',
    'Starknet': '/starknet.png',
    'Pyth': '/pyth.png',
    'Stacks': '/stacks.png',
    '0g': '/0g.png',
    'Push': '/push.png',
    'Algorand': '/algorand.png',
    'ICP': '/icp.jpeg',
    'Polkadot': '/polkadot.png',
    'SUI': '/sui.png',
  };
  
  return logoMap[ecosystem] ?? null;
};

const skills = {
  languages: [
    { name: 'Move', level: 5 },
    { name: 'Solidity', level: 5 },
    { name: 'Python 3', level: 4 },
    { name: 'Rust', level: 3 },
    { name: 'JavaScript', level: 5 },
    { name: 'TypeScript', level: 5 },
  ],
  web3: [
    'ERC20', 'ERC721', 'SOLIDITY', 'MOVE', 'RUST', 'DeFi', 'GameFi',
    'SocialFi', 'GambleFi',
  ],
  ecosystems: [
    'Aptos', 'Movement Labs', 'Mantle', 'Polygon', 'EigenLayer', 'Xenea', 'Xion',
    'Avalanche', 'BNB', 'Flow', 'Monad', 'Chainlink', 'Celo', 'Near', 'Oraichain',
    'Stellar', 'Coinbase', 'WorldCoin', 'Scroll', 'Chiliz', 'Nibiru', 'Citrea',
    'Educhain', 'Ripple', 'Manta', 'Optimism', 'The Graph', 'Inco', 'Starknet',
    'Pyth', 'Stacks', '0g', 'Push', 'Algorand', 'ICP', 'Polkadot', 'SUI',
  ],
};

export const ExperienceSkills = () => {
  const ref = useRef<HTMLDivElement>(null);
  const experienceScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, -30]);
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, 30]);

  useEffect(() => {
    const experienceContainer = experienceScrollRef.current;
    if (!experienceContainer) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = experienceContainer;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      // If scrolling down and at bottom, or scrolling up and at top, allow page scroll
      if ((isScrollingDown && isAtBottom) || (isScrollingUp && isAtTop)) {
        return;
      }

      // Otherwise, prevent default and scroll the container
      e.preventDefault();
      experienceContainer.scrollTop += e.deltaY;
    };

    experienceContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      experienceContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div ref={ref} className='relative z-[2] min-h-screen' id='experience'>
      <div className='sticky top-0 flex min-h-screen flex-col items-center overflow-hidden md:flex-row'>
        {/* Left Side - Experience */}
        <motion.div
          className='relative flex h-full min-h-screen w-full flex-col items-start justify-center border-b border-white/10 bg-gradient-to-r from-white/[0.02] to-transparent px-8 py-16 sm:px-12 md:w-1/2 md:border-b-0 md:border-r md:px-16 md:py-0'
          style={{ opacity: leftOpacity, x: leftX }}
        >
          <motion.div
            className='mb-8 font-elgocAlt text-[3rem] sm:text-[4rem] md:text-[5rem] leading-[0.9] text-white'
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
          >
            Experience
          </motion.div>
          
          <div 
            ref={experienceScrollRef}
            className='relative w-full max-w-2xl max-h-[70vh] overflow-y-auto pr-4 scroll-smooth focus:outline-none'
            role='region'
            aria-label='Work Experience'
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className='relative'>
              {/* Timeline line */}
              <div className='absolute left-6 top-0 bottom-0 w-0.5 bg-white/10' />

              <div className='space-y-8 pb-4'>
              {experiences.map((exp, index) => {
                const uniqueKey = `${exp.company}-${String(exp.period)}`;
                const delay = index * 0.08;
                
                return (
                  <motion.div
                    key={uniqueKey}
                    className='relative flex items-start gap-6'
                    initial={{ opacity: 0, x: -30 }}
                    transition={{ delay, duration: 0.5 }}
                    viewport={{ once: true, margin: '-100px' }}
                    whileInView={{ opacity: 1, x: 0 }}
                  >
                    {/* Timeline dot */}
                    <div className='relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white/20 bg-black'>
                      <div className='h-3 w-3 rounded-full bg-white/40' />
                    </div>

                    {/* Content card */}
                    <motion.div
                      className='group relative flex-1 overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                      whileHover={{ 
                        scale: 1.02,
                        y: -4,
                        transition: { duration: 0.3, type: 'spring', stiffness: 300 }
                      }}
                    >
                      {/* Subtle gradient overlay */}
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                      />
                      <div className='relative z-10'>
                        <div className='mb-3 flex items-center gap-3'>
                          {(() => {
                            const logoPath = getExperienceLogo(exp.company);
                            return logoPath ? (
                              <motion.div
                                className='relative h-10 w-10 shrink-0'
                                whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                                transition={{ duration: 0.4 }}
                              >
                                <Image
                                  alt={`${exp.company} logo`}
                                  className='object-contain'
                                  height={40}
                                  src={logoPath}
                                  width={40}
                                />
                              </motion.div>
                            ) : null;
                          })()}
                          <div className='flex flex-wrap items-baseline gap-2'>
                            <span className='font-beatriceMedium text-base font-semibold text-white'>
                              {exp.role}
                            </span>
                            <span className='text-white/30'>@</span>
                            <span className='font-beatriceMedium text-base font-semibold text-white/90'>
                              {exp.company}
                            </span>
                          </div>
                        </div>
                        <div className='mb-3 flex items-center justify-between gap-4'>
                          <span className='text-xs font-medium text-white/40 tracking-wide'>
                            {exp.period} • {exp.location}
                          </span>
                          {exp.links && exp.links.length > 0 && (
                            <div className='flex flex-wrap gap-2'>
                              {exp.links.map((link) => {
                                const Icon = getLinkIcon(link.label);
                                return (
                                  <a
                                    key={link.label}
                                    href={link.url}
                                    rel='noopener noreferrer'
                                    target='_blank'
                                    className='group relative flex items-center justify-center rounded-md border border-white/10 bg-white/[0.05] p-1.5 transition-all hover:border-white/20 hover:bg-white/[0.1]'
                                    title={link.label}
                                  >
                                    <Icon className='h-3.5 w-3.5 text-white/70 transition-colors group-hover:text-white/90' />
                                  </a>
                                );
                              })}
                            </div>
                          )}
                        </div>
                        <div className='mb-3 rounded-lg bg-white/[0.08] border border-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-sm'>
                          {exp.highlight}
                        </div>
                        <p className='mb-3 text-sm leading-relaxed text-white/50'>{exp.description}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Skills */}
        <motion.div
          className='relative flex h-full min-h-screen w-full flex-col items-start justify-center bg-gradient-to-l from-white/[0.02] to-transparent px-8 py-16 sm:px-12 md:w-1/2 md:px-16 md:py-0'
          style={{ opacity: rightOpacity, x: rightX }}
        >
          <motion.div
            className='mb-8 font-elgocAlt text-[3rem] sm:text-[4rem] md:text-[5rem] leading-[0.9] text-white'
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
          >
            Skills
          </motion.div>
          
          <div className='relative w-full max-w-2xl pr-4'>
            {/* Programming Languages */}
            <motion.div
              className='mb-10'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5 }}
            >
              <h3 className='mb-4 font-beatriceMedium text-lg font-semibold text-white/80'>
                Languages
              </h3>
              <div className='grid grid-cols-3 gap-3 sm:grid-cols-3 lg:grid-cols-3'>
                {skills.languages.map((skill, index) => {
                  const delay = index * 0.04;
                  
                  return (
                    <motion.div
                      key={skill.name}
                      className='group relative flex flex-col items-center overflow-hidden rounded-lg border border-white/5 bg-white/[0.03] p-3 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)]'
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
                      {(() => {
                        const logoPath = getLanguageLogo(skill.name);
                        return logoPath ? (
                          <motion.div
                            className='mb-2 relative z-10 h-8 w-8 shrink-0 overflow-hidden rounded-sm'
                            whileHover={{ scale: 1.3, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Image
                              alt={skill.name}
                              className='object-contain'
                              height={32}
                              src={logoPath}
                              width={32}
                            />
                          </motion.div>
                        ) : (
                          <motion.span 
                            className='mb-2 text-xl relative z-10'
                            whileHover={{ scale: 1.3, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            {skill.name === 'Rust' ? '🦀' : '💻'}
                          </motion.span>
                        );
                      })()}
                      <span className='mb-2 text-center text-xs font-semibold text-white relative z-10'>{skill.name}</span>
                      <div className='flex gap-1 relative z-10'>
                        {Array.from({ length: 5 }, (_, i) => i).map((i: number) => {
                          const levelKey = `level-${String(i)}-${skill.name}`;
                          
                          return (
                            <motion.div
                              key={levelKey}
                              className={`h-1 w-2.5 rounded-full ${
                                i < skill.level ? 'bg-white/70' : 'bg-white/10'
                              }`}
                              initial={{ scale: 0 }}
                              transition={{ delay: index * 0.04 + i * 0.05, duration: 0.3 }}
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
              className='mb-10'
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true, margin: '-100px' }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className='mb-4 font-beatriceMedium text-lg font-semibold text-white/80'>
                Web3 Stack
              </h3>
              <div className='flex flex-wrap gap-2'>
                {skills.web3.map((tech, index) => {
                  const delay = index * 0.015;
                  
                  return (
                    <motion.span
                      key={tech}
                      className='group relative overflow-hidden rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-xs font-semibold text-white/70 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/[0.12] hover:text-white/90 hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
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
              viewport={{ once: true, margin: '-100px' }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className='mb-4 font-beatriceMedium text-lg font-semibold text-white/80'>
                Ecosystems Worked with/ Built on (30+)
              </h3>
              <div className='flex flex-wrap gap-2'>
                {skills.ecosystems.map((ecosystem, index) => {
                  const delay = index * 0.01;
                  const logoPath = getEcosystemLogo(ecosystem);
                  
                  return (
                    <motion.span
                      key={ecosystem}
                      className='group relative flex items-center gap-1.5 overflow-hidden rounded-md border border-white/5 bg-white/[0.03] px-2.5 py-1 text-xs font-medium text-white/60 backdrop-blur-md transition-all duration-300 hover:border-white/15 hover:bg-white/[0.12] hover:text-white/80 hover:shadow-[0_2px_8px_rgba(0,0,0,0.2)]'
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
                      {logoPath && (
                        <div className='relative z-10 h-4 w-4 shrink-0 overflow-hidden rounded-sm'>
                          <Image
                            alt={ecosystem}
                            className='object-contain'
                            height={16}
                            src={logoPath}
                            width={16}
                          />
                        </div>
                      )}
                      <span className='relative z-10'>{ecosystem}</span>
                    </motion.span>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated divider line */}
        <motion.div
          className='absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/20 to-transparent md:block'
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

