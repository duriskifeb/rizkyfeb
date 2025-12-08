'use client';

import React, { useRef, useState, useMemo } from 'react';

import Image from 'next/image';

import { motion, useScroll, useTransform } from 'framer-motion';

// Map track names to their logo file paths
const getTrackLogo = (track: string): string | null => {
  const logoMap: Record<string, string> = {
    'Aptos': '/aptos.png',
    'Stacks': '/stacks.png',
    'Flow': '/flow.png',
    'Mantle': '/mantle.png',
    'Ethereum': '/ethereum.png',
    'Manta': '/manta.png',
    'BNB': '/bnbchain.png',
    'Polygon': '/polygon.jpg',
    'Chainlink': '/chainlink.png',
    'FVM': '/filecoin.png',
    'XDC': '/xdc.png',
    'Avalanche': '/avalanche.jpg',
    'Inco': '/inco.png',
    'Celo': '/celo.png',
    'Oraichain': '/oraichain.png',
    'Starknet': '/starknet.png',
    'Movement Labs': '/movement_labs.jpeg',
    'Polkadot': '/polkadot.png',
    'Dcomm': '/dcomm.png',
    'Coinstore': '/coinstore.jpg',
    'Telos': '/telos.png',
    'Lens': '/lens.svg',
    'Amazon': '/aws.png',
    'AI': '/aspecta.png',
  };
  
  return logoMap[track] ?? null;
};

// Get coordinates based on hackathon name
const getLocation = (name: string): [number, number] => {
  const locationMap: Record<string, [number, number] | undefined> = {
    India: [77.2090, 28.6139], // New Delhi
    Toronto: [-79.3832, 43.6532],
    Dubai: [55.2708, 25.2048],
    Riyadh: [46.6753, 24.7136],
    Thailand: [100.5018, 13.7563], // Bangkok (for Edge City Lanna)
    'Southeast Asia': [103.8198, 1.3521], // Singapore (for ETH SEA)
    APAC: [103.8198, 1.3521], // Singapore
    Asia: [103.8198, 1.3521], // Singapore
    Online: [0, 0], // Center of map for online events
  };

  const nameLower = name.toLowerCase();
  if (nameLower.includes('india') || nameLower.includes('indian')) return locationMap.India ?? [0, 0];
  if (nameLower.includes('toronto')) return locationMap.Toronto ?? [0, 0];
  if (nameLower.includes('dubai')) return locationMap.Dubai ?? [0, 0];
  if (nameLower.includes('riyadh')) return locationMap.Riyadh ?? [0, 0];
  if (nameLower.includes('lanna') || nameLower.includes('thailand')) return locationMap.Thailand ?? [0, 0];
  if (nameLower.includes('sea') || nameLower.includes('southeast')) return locationMap['Southeast Asia'] ?? [0, 0];
  if (nameLower.includes('apac') || nameLower.includes('asia')) return locationMap.APAC ?? [0, 0];
  if (nameLower.includes('online') || nameLower.includes('remote')) return locationMap.Online ?? [0, 0];
  
  // Default to India for most hackathons (seems to be the primary location)
  return locationMap.India ?? [0, 0];
};

export interface HackathonData {
  name: string;
  prize: string;
  amount: string;
  track: string;
  links: string[];
  date: Date;
  coordinates: [number, number];
}

const hackathons: HackathonData[] = [
  // 2025
  { name: 'ETHGlobal India 2025', prize: 'Track Winner', amount: '$1,500', track: 'General', links: [], date: new Date('2025-12-01'), coordinates: getLocation('ETHGlobal India 2025') },
  { name: 'Starknet Hacker House 2025', prize: 'Third Runner Up', amount: '$1,000', track: 'Starknet', links: [], date: new Date('2025-11-01'), coordinates: getLocation('Starknet Hacker House 2025') },
  { name: 'Stacks Hacker House 2025', prize: 'Winner', amount: '$550', track: 'Stacks', links: [], date: new Date('2025-10-01'), coordinates: getLocation('Stacks Hacker House 2025') },
  { name: 'Aptos Hackathon 2025', prize: 'Third Runner Up', amount: '$300', track: 'Aptos', links: [], date: new Date('2025-09-01'), coordinates: getLocation('Aptos Hackathon 2025') },
  { name: 'Mantle APAC Hackathon 2025', prize: 'Third Prize', amount: '$1,500', track: 'Mantle', links: [], date: new Date('2025-08-01'), coordinates: getLocation('Mantle APAC Hackathon 2025') },
  { name: 'Flow Asia Hackathon 2025', prize: 'Nominee DemoDay', amount: '$200', track: 'Flow', links: [], date: new Date('2025-07-01'), coordinates: getLocation('Flow Asia Hackathon 2025') },
  
  // 2024
  { name: 'ETHGlobal India 2024', prize: 'Second Prize Polkadot Track', amount: '$500', track: 'Polkadot', links: [], date: new Date('2024-12-01'), coordinates: getLocation('ETHGlobal India 2024') },
  { name: 'ETHToronto & ETHWomen 2024', prize: 'Connect the World with Chainlink', amount: '$1,000', track: 'Chainlink', links: [], date: new Date('2024-11-01'), coordinates: getLocation('ETHToronto & ETHWomen 2024') },
  { name: 'Dcomm Valhalla Hackathon', prize: 'Loki Track Winner', amount: '$1,000', track: 'Dcomm', links: [], date: new Date('2024-11-01'), coordinates: getLocation('Dcomm Valhalla Hackathon') },
  { name: 'Decentralized AI Buildathon', prize: 'Winner', amount: '$1,750', track: 'AI', links: [], date: new Date('2024-10-01'), coordinates: getLocation('Decentralized AI Buildathon') },
  { name: 'Hack AVS-Empower the EigenLayer Restaking Ecosystem 2024', prize: 'Winner Movement Track', amount: '$1,750', track: 'Movement Labs', links: [], date: new Date('2024-10-01'), coordinates: getLocation('Hack AVS-Empower the EigenLayer Restaking Ecosystem 2024') },
  { name: 'Movement Labs Hackathon 2024', prize: 'Second Place Movement Track', amount: '$1,750', track: 'Movement Labs', links: [], date: new Date('2024-09-01'), coordinates: getLocation('Movement Labs Hackathon 2024') },
  { name: 'ETH SEA', prize: '3rd Prize Manta Track', amount: '$750', track: 'Manta', links: [], date: new Date('2024-09-01'), coordinates: getLocation('ETH SEA') },
  { name: 'Edge City Lanna Hackathon 2024', prize: 'Runner-Up Flow Track', amount: '$3,000', track: 'Flow', links: [], date: new Date('2024-08-01'), coordinates: getLocation('Edge City Lanna Hackathon 2024') },
  { name: 'Polygon DevX India Hackathon', prize: 'Best Project Chainlink CCIP & Services', amount: '$2,000', track: 'Polygon', links: [], date: new Date('2024-08-01'), coordinates: getLocation('Polygon DevX India Hackathon') },
  { name: 'Avalanche Frontier 2024', prize: 'Chainlink CCIP Track Third Place', amount: '$1,250', track: 'Avalanche', links: [], date: new Date('2024-07-01'), coordinates: getLocation('Avalanche Frontier 2024') },
  { name: 'Coinstore UBIT Hackathon 2024', prize: 'Second Runner-Up', amount: '$3,000', track: 'Coinstore', links: [], date: new Date('2024-06-01'), coordinates: getLocation('Coinstore UBIT Hackathon 2024') },
  { name: 'BNB Chain Hackathon 2024', prize: 'Sonorus Track Winner', amount: '$500', track: 'BNB', links: [], date: new Date('2024-06-01'), coordinates: getLocation('BNB Chain Hackathon 2024') },
  { name: 'Move it with Aptos 2024', prize: 'Aptos Track Winner', amount: '$2,000', track: 'Aptos', links: [], date: new Date('2024-05-01'), coordinates: getLocation('Move it with Aptos 2024') },
  { name: 'Telos Mini Hackathon 2024', prize: 'Runner-Up', amount: '$200', track: 'Telos', links: [], date: new Date('2024-04-01'), coordinates: getLocation('Telos Mini Hackathon 2024') },
  { name: 'ETHDubai 2024', prize: 'XDC Network Tokenization and NEO Prize', amount: '$2,000', track: 'XDC', links: [], date: new Date('2024-03-01'), coordinates: getLocation('ETHDubai 2024') },
  
  // 2023
  { name: 'Chainlink Constellation 2023', prize: 'Grand Prize Winner - Steel Perlot', amount: '$3,000', track: 'Chainlink', links: [], date: new Date('2023-12-01'), coordinates: getLocation('Chainlink Constellation 2023') },
  { name: 'ETH Riyadh 2023', prize: 'Meta Web3 Builder SocialFi Track Winner', amount: '$1,000', track: 'Ethereum', links: [], date: new Date('2023-11-01'), coordinates: getLocation('ETH Riyadh 2023') },
  { name: 'FVM Space Wrap Hack 2023', prize: 'Livepeer Track Winner', amount: '$2,000', track: 'FVM', links: [], date: new Date('2023-10-01'), coordinates: getLocation('FVM Space Wrap Hack 2023') },
  { name: 'HackX 2023', prize: 'Best Project Online Track', amount: '$50', track: 'General', links: [], date: new Date('2023-09-01'), coordinates: getLocation('HackX 2023') },
  { name: 'DAO Global Hackathon 2023', prize: 'Lens Track Winner Best Lens Integrations', amount: '$2,000', track: 'Lens', links: [], date: new Date('2023-08-01'), coordinates: getLocation('DAO Global Hackathon 2023') },
  { name: 'Web3athon 2023', prize: 'Celo Track Second Runner-Up', amount: '$25,000', track: 'Celo', links: [], date: new Date('2023-08-01'), coordinates: getLocation('Web3athon 2023') },
  { name: 'Garuda Hacks 3.0 2023', prize: 'Runner-Up Polygon Track', amount: '$300', track: 'Polygon', links: [], date: new Date('2023-07-01'), coordinates: getLocation('Garuda Hacks 3.0 2023') },
  { name: 'Inco Hack 2023', prize: '4th Place FHE DApps', amount: '$500', track: 'Inco', links: [], date: new Date('2023-07-01'), coordinates: getLocation('Inco Hack 2023') },
  { name: 'Flow Hackathon Season 2', prize: 'Runner-Up', amount: '$6,000', track: 'Flow', links: [], date: new Date('2023-06-01'), coordinates: getLocation('Flow Hackathon Season 2') },
  { name: 'Celo Hackathon of Hope', prize: 'Top 20 Projects', amount: '$100', track: 'Celo', links: [], date: new Date('2023-04-01'), coordinates: getLocation('Celo Hackathon of Hope') },
  { name: 'Oraichain', prize: 'AI x DeFi Cook-Off Special Mention', amount: '$400', track: 'Oraichain', links: [], date: new Date('2023-03-01'), coordinates: getLocation('Oraichain') },
  { name: 'Inco Bounty', prize: 'Runner-Up', amount: '$250', track: 'Inco', links: [], date: new Date('2023-02-01'), coordinates: getLocation('Inco Bounty') },
  
  // 2022
  { name: 'BUIDL for Web3 Hackathon 2022', prize: 'Best NFT App Second Runner-up', amount: '$1,500', track: 'Polygon', links: [], date: new Date('2022-12-01'), coordinates: getLocation('BUIDL for Web3 Hackathon 2022') },
  { name: 'Amazon Smbhav Hack Season 2', prize: 'Special Mention Category Prize Winner', amount: '$500', track: 'Amazon', links: [], date: new Date('2022-05-01'), coordinates: getLocation('Amazon Smbhav Hack Season 2') },
  { name: 'Tantragyan 2k22', prize: 'Second Consolation Prize Winner', amount: '$50', track: 'General', links: [], date: new Date('2022-04-01'), coordinates: getLocation('Tantragyan 2k22') },
].sort((a, b) => b.date.getTime() - a.date.getTime());

// Export hackathons for use in WorldMap component
export { hackathons };

// Calculate stats
const calculateStats = () => {
  const totalPrize = hackathons.reduce((sum, h) => {
    const amount = h.amount.replace(/[^0-9]/g, '');
    return sum + (amount ? Number.parseInt(amount, 10) : 0);
  }, 0);
  
  const years = [...new Set(hackathons.map(h => h.date.getFullYear()))].sort((a, b) => b - a);
  const tracks = [...new Set(hackathons.map(h => h.track))];
  
  return { totalPrize, years, tracks, total: hackathons.length };
};

export const Hackathons = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const stats = useMemo(() => calculateStats(), []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M+`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K+`;
    return `$${amount.toFixed(0)}+`;
  };

  return (
    <div 
      ref={ref} 
      className='relative z-[2] min-h-screen py-24 overflow-hidden' 
      id='hackathons'
      onMouseMove={handleMouseMove}
    >
      {/* Animated background particles */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className='absolute rounded-full bg-white/5'
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Dynamic gradient overlay based on mouse position */}
      <motion.div
        className='pointer-events-none absolute inset-0 opacity-30'
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6'>
        {/* Header */}
        <motion.div
          className='mb-16 text-center'
          initial={{ opacity: 0, y: -30 }}
          style={{ opacity }}
          transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className='mb-6 font-elgocAlt text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.9] text-white'>
            Hackathons
          </h2>
          <p className='font-beatriceMedium text-lg text-white/60'>
            40+ Wins out of 70+ Participated
          </p>
        </motion.div>

        {/* Stats Dashboard */}
        <motion.div
          className='mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4'
          initial={{ opacity: 0, y: 20 }}
          style={{ opacity }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {[
            { label: 'Total Wins', value: stats.total, icon: '🏆' },
            { label: 'Prize Money', value: formatCurrency(stats.totalPrize), icon: '💰' },
            { label: 'Ecosystems', value: stats.tracks.length, icon: '🌐' },
            { label: 'Years Active', value: stats.years.length, icon: '📅' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.1] hover:shadow-[0_8px_32px_rgba(59,130,246,0.3)]'
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
            >
              <motion.div
                className='absolute inset-0 bg-gradient-to-br from-white/[0.1] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
              />
              <div className='relative z-10'>
                <div className='mb-2 text-3xl'>{stat.icon}</div>
                <div className='font-elgocAlt text-3xl font-bold text-white mb-1'>{stat.value}</div>
                <div className='text-xs font-medium text-white/50 uppercase tracking-wider'>{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Hackathons Grid */}
        <motion.div
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
          initial={{ opacity: 0 }}
          style={{ opacity }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          {hackathons.map((hackathon, index) => {
              const uniqueKey = `${hackathon.name}-${String(hackathon.track)}`;
              const delay = index * 0.03;
              const trackLogo = hackathon.name.includes('ETHGlobal') ? '/ethglobal.png' : getTrackLogo(hackathon.track);
              const prizeAmount = hackathon.amount ? Number.parseInt(hackathon.amount.replace(/[^0-9]/g, ''), 10) : 0;
              const isHighPrize = prizeAmount >= 5000;
              
              return (
                <motion.div
                  key={uniqueKey}
                  className='group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/[0.1] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]'
                  initial={{ opacity: 0, scale: 0.9, y: 30, rotateX: -15 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ delay, duration: 0.5, stiffness: 100, type: 'spring' }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -8,
                    rotateY: 5,
                    transition: { duration: 0.3, stiffness: 300, type: 'spring' },
                  }}
                  style={{ perspective: 1000 }}
                >
                  {/* Animated gradient background */}
                  {hackathon.track !== 'Flow' && hackathon.track !== 'Celo' ? (
                    <motion.div
                      className='absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500'
                      animate={{
                        background: [
                          'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.2), transparent 50%)',
                          'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.2), transparent 50%)',
                          'radial-gradient(circle at 0% 100%, rgba(6, 182, 212, 0.2), transparent 50%)',
                          'radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.2), transparent 50%)',
                        ],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  ) : (
                    <div className='absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                  )}
                  
                  {/* Glow effect for high prize */}
                  {isHighPrize && hackathon.track !== 'Flow' && hackathon.track !== 'Celo' && (
                    <motion.div
                      className='absolute -inset-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-pink-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500'
                      animate={{
                        opacity: [0, 0.3, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    />
                  )}

                  <div className='relative z-10'>
                    {/* Track Badge */}
                    <div className='mb-4 flex items-center justify-between'>
                      <motion.span
                        className='flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.1] px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-md'
                        whileHover={{ scale: 1.1 }}
                      >
                        {trackLogo && (
                          <div className='h-4 w-4 shrink-0 overflow-hidden rounded-sm'>
                            <Image
                              alt={hackathon.track}
                              className='object-contain'
                              height={16}
                              src={trackLogo}
                              width={16}
                            />
                          </div>
                        )}
                        {hackathon.track}
                      </motion.span>
                      {hackathon.amount && (
                        <motion.span
                          className={`font-elgocAlt text-lg font-bold ${
                            isHighPrize ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400' : 'text-white/90'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {hackathon.amount}
                        </motion.span>
                      )}
                    </div>

                    {/* Hackathon Name */}
                    <h3 className='mb-3 font-beatriceMedium text-lg font-bold text-white leading-tight line-clamp-2'>
                      {hackathon.name}
                    </h3>

                    {/* Prize Description */}
                    <p className='text-sm font-medium text-white/60 leading-relaxed'>
                      {hackathon.prize}
                    </p>
                  </div>
                </motion.div>
              );
            })}
        </motion.div>
      </div>
    </div>
  );
};
