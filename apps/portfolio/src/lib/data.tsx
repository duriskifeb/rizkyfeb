import type { AboutSentence, Data } from '~/types/data';

const aboutSentence2: AboutSentence = [
  {
    type: 'text',
    content: 'M Rizky Febriyanto',
    className:
      'font-elgocAlt text-[5rem] sm:text-[6rem] md:text-[8rem] lg:text-[9rem] leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600',
  },
];

const aboutSentence3: AboutSentence = [
  {
    type: 'text',
    content: ' Devrel, Blockchain Developer & Entrepreneur',
    className: 'font-semibold text-white/70',
  },
];

const aboutSentence4: AboutSentence = [
  {
    type: 'text',
    content: ' Built 25+ Web3 projects across 30+ ecosystems',
    className: 'font-semibold text-white/70',
  },
  {
    type: 'emoji',
    content: '🚀',
    className: 'text-4xl sm:text-5xl md:text-6xl inline-block',
  },
];

const aboutSentence5: AboutSentence = [
  {
    type: 'text',
    content: ' Won 40 hackathons out of 70+ participated',
    className: 'font-semibold text-white/70',
  },
  {
    type: 'emoji',
    content: '🏆',
    className: 'text-4xl sm:text-5xl md:text-6xl inline-block',
  },
];

const aboutSentence6: AboutSentence = [
  {
    type: 'text',
    content:
      'Worked with 8 Web3 companies, Co-founded 2 startups and built 4 communities from 0 to 100x',
    className: 'font-semibold text-white/70',
  },
];

const projects: Data['projects']['projects'] = [
  {
    title: 'APT-Casino',
    description:
      'A fully on-chain casino for the Aptos eco. Providing safe, secure, 100% transparent gambling experience. Backed by Aptos and Movement Labs. Live on 15 EVM chains, ICP, Solana, StarkNet, and more.',
    image: '/images/1.png',
    coverImage: '/images/8-cover.png',
    backgroundColor: '#0A0A0F',
    color: '#FFFFFF',
    githubLink: 'https://github.com/AmaanSayyad/APT-Casino-Aptos',
    liveLink: 'https://apt-casino-aptos.vercel.app',
    videoDemo:
      'https://drive.google.com/file/d/1beTlzaBgtimko4dtfiJGuszLQXySfQC_/view?usp=sharing',
    deckLink:
      'https://www.figma.com/design/Xa3hqlCp7LRvxIl94KM1Ia/Casino?node-id=0-1&p=f&t=AsI3JvarNKyQps74-0',
    litepaperLink:
      'https://docs.google.com/document/d/1yn4I_o_U_DiNIRn-qfzelF-dKzcPVSnMORCMsfcwXxQ/edit?usp=sharing',
  },
  {
    title: 'HyperInsure',
    description:
      'The first on-chain insurance protocol protecting blockchain users from transaction latency, mempool congestion and finality delays. Powered by Stacks + Bitcoin security. Backed by Stacks Blockchain.',
    image: '/images/18.png',
    coverImage: '/images/4-cover.png',
    backgroundColor: '#D5D5D5',
    color: '#2A2A2A',
    githubLink: 'https://github.com/AmaanSayyad/HyperInsure',
    videoDemo:
      'https://drive.google.com/file/d/1P2-0HaChur8M_P64jvhWWCHBIWN2RndT/view?usp=sharing',
    deckLink:
      'https://docs.google.com/presentation/d/1EkrUS-6aj6qx1YxMwxP_RauebVnhXj5RC8IYZp5XFBw/edit?usp=sharing',
    liveLink: 'https://x.com/hyperinsure',
  },
  {
    title: 'Gemetra',
    description:
      'Global Remittance Infrastructure for VAT Claims & Payroll. A comprehensive solution for cross-border financial operations with blockchain transparency and security.',
    image: '/images/4.png',
    coverImage: '/images/17-cover.png',
    backgroundColor: '#ECDCE9',
    color: '#321D44',
    githubLink: 'https://github.com/amaansayyad/gemetra',
    liveLink: 'https://gemetra.vercel.app/',
    videoDemo:
      'https://drive.google.com/file/d/1p-Y-yVMDD6q8XKXJ8m3Sw0Gmakgmno4m/view?usp=sharing',
    demoVideo:
      'https://drive.google.com/file/d/14eaRYQEUi0-xS_Ypb9S14r4xmGCFV1Dq/view?usp=sharing',
    deckLink:
      'https://docs.google.com/presentation/d/1bzsEj2jJwcSTQX8WhLcXpW4P-H73TeIkXKTiKYlO-KY/edit?usp=sharing',
  },
  {
    title: 'DunkVerse',
    description:
      'A mobile first dapp which offers AI-driven quizzes on NBA TOPSHOTS, NFT-Powered Social Media, and Social Betting fully on-chain. Backed by Mantle Blockchain.',
    image: '/images/2.png',
    coverImage: '/images/2-cover.png',
    backgroundColor: '#0A0A0F',
    color: '#C0C0C0',
    githubLink: 'https://github.com/AmaanSayyad/DunkVerse',
    videoDemo: 'https://youtu.be/3uZv3TCel-w?si=edNbE30FSXyX9WUO',
    deckLink:
      'https://www.figma.com/deck/pM8sAfV1cPHPAZKnQDMReZ/DunkVerse---Mantle?node-id=1-1812&p=f&t=YngoSDK33rgyfk4L-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1',
    liveLink: 'https://youtu.be/IwvkyVIWJ2I?si=I_Man3XlZ82ev-WZ',
  },
  {
    title: 'StarkNet Arcade',
    description:
      'Top-performing gaming dapp in the StarkNet Ecosystem. Starknet Arcade (Arcadino) brings innovative on-chain gaming experiences with multiplayer capabilities.',
    image: '/images/5.png',
    coverImage: '/images/5-cover.png',
    backgroundColor: '#F5EFDF',
    color: '#070707',
    githubLink: 'https://github.com/AmaanSayyad/Starknet-Arcade',
    xLink: 'https://x.com/starknet_arcade',
    liveLink: 'https://amaans-organization.gitbook.io/starknet-arcade',
    deckLink:
      'https://www.canva.com/design/DAGmF5V0B4A/MEIR306HUlaPImpbvfFCkw/view?utm_content=DAGmF5V0B4A&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h4d4246c91c',
  },
  {
    title: 'Bharat DAO',
    description:
      "Indias' fastest-growing Web3 Developer community. Gateway for 1000+ Global Blockchains & Protocols to enter and scale in India. Grew from ZERO to 10,000+ developers in 45 days with 100% weekly growth rate.",
    image: '/images/8.png',
    coverImage: '/images/11-cover.png',
    backgroundColor: '#DFE9F3',
    color: '#1C2134',
    githubLink: 'https://github.com/AmaanSayyad/bharat-dao',
    liveLink: 'https://bharat-dao.vercel.app/',
    xLink: 'https://x.com/bharat_dao_',
  },
  {
    title: 'HyperFi',
    description:
      'AI x DeFi platform empowering individuals in high-inflation economies. Features AI-generated educational resources, real-time APY tracking, aggregator of APYs and secure investment options. Built on Aave, Uniswap, and Chainlink to help users protect wealth and earn returns.',
    image: '/images/13.png',
    coverImage: '/images/13-cover.png',
    backgroundColor: '#C0C0C0',
    color: '#000000',
    githubLink: 'https://github.com/AmaanSayyad/HyperFi--',
    liveLink: 'https://pitch.com/v/hyperfi-shield--general-pitch--idea-m8mb9h',
    videoDemo: 'https://youtu.be/O2grDDOc6Qg',
  },
  {
    title: 'ContractCraft',
    description:
      'A platform automating workflows and creating smart contracts across EVM, Move, and Polkadot. Features drag-and-drop no-code interface, AI-powered agent for writing and auditing contracts, and automated deployment to multiple networks. Integrated with Walrus Protocol.',
    image: '/images/10.png',
    coverImage: '/images/10-cover.png',
    githubLink: 'https://github.com/icantcodefyi/ethindia2024',
    videoDemo: 'https://www.loom.com/share/2f5a57d6f33c4cc4950ca4dd763b11da',
    backgroundColor: '#DE4840',
    color: '#FFF0CE',
  },
  {
    title: 'Mental Wealth Academy',
    description:
      'A DAO-governed digital library and marketplace for decentralized knowledge sharing. Built on Polygon with Chainlink services, IPFS storage, and cross-chain interoperability. Community-driven designed to onboard mass adoption through accessible educational resources.',
    image: '/images/9.png',
    coverImage: '/images/9-cover.png',
    backgroundColor: '#1A1B3A',
    color: '#FFFFFF',
    githubLink: 'https://github.com/jhinnbay/MentalWealthAcademy',
    liveLink: 'https://mental-wealth-academy.vercel.app/',
    videoDemo: 'https://youtu.be/K0ffP0n55vE?si=QvjUG1hRkv_WUcTz',
    deckLink:
      'https://www.figma.com/slides/PQ09QSwPdEePNIhpBGDXtR/Mental-Wealth-Academy?node-id=3-197&t=Ian1ymM3YlJpoyIr-0',
  },
  {
    title: 'BuildnFund',
    description:
      'Milestone-based equity funding platform for the Avalanche ecosystem. Discover and fund innovative projects through milestone-based equity funding with community governance.',
    image: '/images/20.png',
    coverImage: '/images/20-cover.png',
    backgroundColor: '#0A0A0F',
    color: '#FFFFFF',
    githubLink: 'https://github.com/AmaanSayyad/BuildnFund',
    liveLink: 'https://avalaunch-eight.vercel.app/',
  },
  {
    title: 'NJ-OptiCode',
    description:
      'Platform helping developers upskill in web2 and web3. Features scaffold dapps, interactive courses, real-time collaboration, on-chain IDE, and token rewards. Built on NEAR and Optimism to enable seamless development and collaboration.',
    image: '/images/3.png',
    coverImage: '/images/3-cover.png',
    backgroundColor: '#C0C0C0',
    color: '#000000',
    githubLink: 'https://github.com/Near-Journey/Near-Journey-',
    videoDemo: 'https://youtu.be/CKoBZtgR3hw',
    deckLink: 'https://pitch.com/v/opticode-s2ctha',
  },
  {
    title: 'Feed Our World',
    description:
      'Empowering communities and reducing global food waste through an on-demand, on-chain blockchain-based food distribution application. Aligned with UN Sustainable Goals. Backed by CELO.',
    image: '/images/7.png',
    coverImage: '/images/12-cover.png',
    backgroundColor: '#DBE6E2',
    color: '#05A8A9',
    githubLink: 'https://github.com/Feed-Our-World-FOW',
    videoDemo: 'https://youtu.be/UFW3-oJZxoY?si=C5e534Gf5tJTjjSk',
    demoVideo: 'https://www.loom.com/share/3ee9075493554d54a6d6f50931679f40',
    deckLink:
      'https://docs.google.com/presentation/d/18bskDEFWCRM6Je4hks6qJPpva4b78w_4/edit?usp=sharing&ouid=107127521196855578697&rtpof=true&sd=true',
    liveLink:
      'https://www.figma.com/design/Iq80Lzd4wi9LjQUbHACl2w/App?node-id=1118-1891&p=f&t=2I3E23VDuetlzaCH-0',
  },
  {
    title: 'Sui Stream',
    description:
      'The first decentralized social media platform on the SUI Blockchain. Empowers creators with content ownership, instant monetization, and privacy. Features SUI Wallet integration, zkLogin and token donations.',
    image: '/images/19.png',
    coverImage: '/images/19-cover.png',
    backgroundColor: '#0A0A0F',
    color: '#FFFFFF',
    githubLink: 'https://github.com/AmaanSayyad/SuiStream',
    videoDemo:
      'https://www.loom.com/share/070ca40eec614341b2793edd2822a0a5?sid=2d0a6f8c-038c-462d-8dc2-9c6467bab7eb',
    demoVideo:
      'https://www.loom.com/share/f6c77a0ec4a84b53a2a351425da690bb?sid=61e25b4f-5523-427e-9c86-ca0128576cea',
    deckLink:
      'https://www.canva.com/design/DAFx2UKxWYg/IExQCl6lG1NdDztWH8JT6Q/edit?utm_content=DAFx2UKxWYg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton',
  },
  {
    title: 'FI-Protocol',
    description:
      'Bug reporting platform using Chainlink CCIP and FHE from Inco Network. Users earn tokens for reporting bugs while maintaining confidentiality. Deployed on Polygon, Scroll, Metis, and Optimism.',
    image: '/images/15.png',
    coverImage: '/images/15-cover.png',
    backgroundColor: '#DFE9F3',
    color: '#1C2134',
    githubLink: 'https://github.com/AmaanSayyad/Feedback-Incentivised',
    videoDemo: 'https://youtu.be/TEj-yEGSE0Y',
    deckLink: 'https://pitch.com/v/feedback-incentivized-fi-protocol-xicqzf',
  },
  {
    title: 'MultiAgent Army',
    description:
      'A replica of $VIRTUAL protocol to revolutionize the multi-agent launchpad Agent Commerce Protocol for ICP blockchain and decentralize AI agents.',
    image: '/images/6.png',
    coverImage: '/images/6-cover.png',
    backgroundColor: '#0A0A0F',
    color: '#FFFFFF',
    githubLink: 'https://github.com/AmaanSayyad/MultiAgent-Army',
    videoDemo: 'https://youtu.be/qBid3G7o3jk',
    deckLink: 'https://pitch.com/v/multiagent-army-mqdbu5',
  },
  {
    title: 'Reels-Fi',
    description:
      "Platform enabling users to earn money by watching and trading on content engagement. Monetize reels, invest in creators' content, and earn rewards based on engagement predictions. Built on Polygon, Aptos, and multiple chains with Move and Solidity.",
    image: '/images/14.png',
    coverImage: '/images/14-cover.png',
    backgroundColor: '#454545',
    color: '#FFFFFF',
    githubLink: 'https://github.com/snehaa-eth/Reels-Fi',
    deckLink:
      'https://www.canva.com/design/DAGOhihJymg/6WQTjRInawRp9pq12ApEZQ/view?utm_content=DAGOhihJymg&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h461ac42279',
  },
  {
    title: 'AssetNest',
    description:
      'Soroban-powered platform connecting crypto traders to on-chain investors via Hyperliquid vaults. Democratizes portfolio management with AI-optimized smart contracts and transparent fee structures.',
    image: '/images/16.png',
    coverImage: '/images/16-cover.png',
    backgroundColor: '#0A0A0F',
    color: '#FFFFFF',
    githubLink: 'https://github.com/AmaanSayyad/AssetNest',
    deckLink:
      'https://docs.google.com/presentation/d/1qASsnY1MR0dfVTGoo3d-GerGmHZLnx1Kt_xCgwsqe-0/edit?usp=sharing',
  },
];

export const data: Data = {
  header: 'M Rizky Febriyanto',
  about: [
    aboutSentence2,
    aboutSentence3,
    aboutSentence4,
    aboutSentence5,
    aboutSentence6,
  ],
  interests: {
    title: (
      <>
        *what do <br />I do as a <br />
        web3 <br />
        developer?
      </>
    ),
    description: ``,
    interests: [
      'Build decentralized applications',
      'Explore various protocols',
      'Participate in hackathons',
      'Meet other developers',
      'Go to IRL events',
      'Launch New Communities',
      'Launch New Tokens',
      'Mentor aspiring developers',
      'Build developer tools',
      'Create educational content',
    ],
  },
  articles: {
    title: 'Articles',
    description:
      "While I've shifted my focus to building systems and creating, here's a curated collection of my previous work, deep dives into Web3 protocols, comprehensive tutorials, and detailed project breakdowns that shaped my journey. Each piece represents a moment of learning, exploration, and contribution to the ecosystem.",
    hashnodeHostname: 'nosanablog.hashnode.dev',
  },
  projects: {
    title: 'Projects',
    projects,
  },
  resume: {
    description: ``,
    website: 'https://amaan-sayyad-portfolio.vercel.app',
    name: 'M Rizky Febriyanto',
    position: 'DevRel | Blockchain Developer',
    email: 'amaansayyad2001@gmail.com',
    downloadLink: '/resume.pdf',
  },
  contact: {
    links: [
      {
        title: 'Email',
        link: 'mailto:amaansayyad2001@gmail.com',
      },
      {
        title: 'Twitter / X',
        link: 'https://x.com/amaanbiz',
      },
      {
        title: 'LinkedIn',
        link: 'https://www.linkedin.com/in/amaan-sayyad-/',
      },
      {
        title: 'GitHub',
        link: 'https://github.com/AmaanSayyad',
      },
    ],
  },
};
