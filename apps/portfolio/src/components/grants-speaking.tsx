'use client';

import React, { useRef, useEffect } from 'react';

import Image from 'next/image';

import { motion, useScroll, useTransform } from 'framer-motion';

// Map protocol names to their logo file paths
const getGrantLogo = (protocol: string): string | null => {
  const logoMap: Record<string, string> = {
    'Aptos': '/aptos.png',
    'Movement Labs': '/movement_labs.jpeg',
  };
  
  return logoMap[protocol] ?? null;
};

// Map company names to their logo file paths for volunteer experiences
const getVolunteerLogo = (company: string): string | null => {
  const logoMap: Record<string, string> = {
    'The Graph': '/the_graph.jpeg',
    'Supra': '/Supra.jpeg',
    'Oraichain Labs': '/oraichain.png',
    'Avalanche': '/avalanche.jpg',
    'Postman': '/postman.png',
    'Coursera': '/coursera.jpeg',
    'GitHub': '/github.jpeg',
    'Script Winter of Code': '/script_winter.jpeg',
    'Google Crowdsource': '/google_crowd.jpeg',
    'Router Protocol': '/router.jpeg',
    'Spheron Network': '/spheron.jpeg',
    'Internship Studio': '/istudio.jpeg',
    'JPMorgan Chase & Co.': '/jp_morgan.jpeg',
    'Internshala': '/intershala.jpeg',
    'Google': '/google.png',
    'Amazon Web Services': '/aws.png',
    'Solar.AI': '/solar_ai.jpeg',
    'Dare2Compete': '/unstop.jpeg',
    'CESA-CSI-LTCE': '/cesa-csi.jpeg',
    'PrepBytes': '/prepbytes.jpeg',
    'Assigne': '/assigne.jpeg',
  };
  
  return logoMap[company] ?? null;
};

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

const researchPapers = [
  {
    title: 'AI and Computer Vision Based Face Mask Recognition & Detection System',
    publisher: 'IEEE',
    link: 'https://ieeexplore.ieee.org/document/9478175',
    icon: '📄',
  },
  {
    title: 'AI and Computer Vision Based EyeWriter',
    publisher: 'Springer',
    link: 'https://link.springer.com/chapter/10.1007/978-981-19-6068-0_43',
    icon: '📄',
  },
];

const copyrights = [
  {
    title: 'AI and Computer Vision Based Face Mask Recognition & Detection System',
    publisher: 'Government of India',
    link: 'https://drive.google.com/file/d/1v042innMGBRV9Z9OnrYEKTlaPg2k28vz/view',
    icon: '©️',
  },
  {
    title: 'The Next Gen AI Virtual Steering Wheel',
    publisher: 'Government of India',
    link: 'https://drive.google.com/file/d/1Af76oFgvMnJyBqWSxicabQzN4zt2BUvL/view',
    icon: '©️',
  },
];

const volunteerExperiences = [
  {
    company: 'The Graph',
    role: 'Developer Advocate',
    period: 'Jan 2023 - Jan 2024',
    location: 'Remote',
    description: 'Built 10+ subgraphs, worked closely under Graph DAO supervision, wrote blog posts, threads and video content for newbies to understand the graph in regional and local languages.',
    highlight: 'Developer advocacy & protocol growth',
    links: [],
  },
  {
    company: 'Supra',
    role: 'Devrel Spartan',
    period: 'Jan 2025 - Nov 2025',
    location: 'Remote',
    description: 'Devrel Spartan at Supra, promoting developer relations and community engagement.',
    highlight: 'Developer relations & community',
    links: [],
  },
  {
    company: 'Oraichain Labs',
    role: 'Developer Advocate',
    period: 'Apr 2024 - Nov 2025',
    location: 'Remote',
    description: 'Developer Advocate at Oraichain Labs, working on AI-powered blockchain solutions and developer education.',
    highlight: 'AI blockchain advocacy',
    links: [],
  },
  {
    company: 'Router Protocol',
    role: 'Ambassador',
    period: 'Oct 2024 - Dec 2024',
    location: 'Remote',
    description: 'Router Protocol Ambassador, promoting cross-chain interoperability and supporting developers.',
    highlight: 'Cross-chain advocacy',
    links: [],
  },
  {
    company: 'Avalanche',
    role: 'Ambassador',
    period: 'Apr 2024 - Nov 2025',
    location: 'Remote',
    description: 'Avalanche Ambassador, promoting the Avalanche ecosystem and supporting developers building on Avalanche.',
    highlight: 'Ecosystem growth & developer support',
    links: [],
  },
  {
    company: 'Spheron Network',
    role: 'Ambassador',
    period: 'May 2025 - Jun 2025',
    location: 'Remote',
    description: 'Spheron Network Ambassador, promoting decentralized hosting and Web3 infrastructure solutions.',
    highlight: 'Web3 infrastructure advocacy',
    links: [],
  },
  {
    company: 'Postman',
    role: 'Postman Student Expert',
    period: 'May 2021 - May 2025',
    location: 'Remote',
    description: 'Helping Students by breaking down what is an API with real-world and digital world examples. Hands-on training of API and Student Expert Certification Postman.',
    highlight: '4+ years mentoring students',
    links: [],
  },
  {
    company: 'Amazon Web Services',
    role: 'AWS Educate Student Ambassador',
    period: 'Mar 2021 - Mar 2025',
    location: 'Remote',
    description: 'Planning and conducting meetings to make students aware of the AWS Cloud Platform and Services. Inculcating and developing technical skills among students to solve real-world problems by deploying the projects on AWS Cloud.',
    highlight: '4+ years cloud education',
    links: [],
  },
  {
    company: 'Coursera',
    role: 'Beta Tester',
    period: 'Feb 2021 - Feb 2025',
    location: 'Remote',
    description: 'Testing the Courses before their release. Generating and providing feedback to help the Instructor make the course better and effective on release. Making the backend team understand if the course is not up to the mark or is improper.',
    highlight: '4+ years quality assurance',
    links: [],
  },
  {
    company: 'Script Winter of Code',
    role: 'Open Source Developer',
    period: 'Oct 2021 - Mar 2022',
    location: 'Remote',
    description: 'Open Source Developer at Script Winter of Code, contributing to open source projects and mentoring other developers.',
    highlight: 'Open source development',
    links: [],
  },
  {
    company: 'Google Crowdsource',
    role: 'Influencer',
    period: 'Oct 2021 - Oct 2023',
    location: 'Remote',
    description: 'Google Crowdsource Influencer, helping improve Google services through crowdsourcing and community engagement.',
    highlight: '2+ years community engagement',
    links: [],
  },
  {
    company: 'Internship Studio',
    role: 'Machine Learning Intern',
    period: 'Oct 2020 - Dec 2020',
    location: 'Remote',
    description: 'The objective was to train various regression models and choose the best one to predict the number of "YouTube generate Adviews" & Build an Artificial Neural Network and train it with different layers and hyperparameters. Explored New ways to Visualise Decision Tree Regressor, Linear Regression, Support Vector Machine, Random Forest Regressor & ANN. Also Performed Tasks on Data Preprocessing, Algorithm Selection - Training Module & Making Predictions.',
    highlight: 'ML model development & training',
    links: [],
  },
  {
    company: 'JPMorgan Chase & Co.',
    role: 'Forage - Software Engineering Virtual Experience',
    period: 'Oct 2020 - Dec 2020',
    location: 'Remote',
    description: 'Worked on A Mini Project with Hypothetical Data about Stocks to help Traders Identify potential trade strategies. Familiarised with JPMorgan Chase frameworks and applied Technical Skills to requests from the firms Trading Floor to Analyse and Visualise data in a new way.',
    highlight: 'Financial data analysis & visualization',
    links: [],
  },
  {
    company: 'Internshala',
    role: 'Internshala Student Partner',
    period: 'Sep 2020 - Nov 2020',
    location: 'Remote',
    description: 'Developed pricing strategies for products to be marketed. Kept the clients budget balanced with the firms needs. Worked with the State and City Heads (Top Performer Marketing Interns) of Internshala across INDIA. Recognised and Comprehended Customers (Human Behaviour). Worked on the Issues of the Customer with the Companys Pricing Strategy.',
    highlight: 'Marketing & pricing strategy',
    links: [],
  },
  {
    company: 'Solar.AI',
    role: 'Co-Founder & CTO',
    period: 'Mar 2022 - Jul 2022',
    location: 'Remote',
    description: 'Solar.AI is a one-stop solution for property owners to enjoy a hassle-free digital solar journey and acts as a neutral advisor to aid them in making a better solar decision.',
    highlight: 'Co-founded solar tech platform',
    links: [],
  },
  {
    company: 'Assigne',
    role: 'Co-Founder',
    period: 'Oct 2021 - Mar 2022',
    location: 'Remote',
    description: 'Assigne is a platform that help startups to hire Innovative, Thoughtful and Creative Software Developer Interns. Fast. Crazy Fast.',
    highlight: 'Co-founded hiring platform',
    links: [],
  },
  {
    company: 'Google',
    role: 'GoogleCloudReady Facilitator',
    period: 'Mar 2021 - Jul 2021',
    location: 'Remote',
    description: 'Facilitated the 3 months of the Google Cloud Ready Program brought forward by Google Cloud India to help Student Developers upskill themselves in Google Cloud. Lead Cloud Engineering Track on tech Kubernetes, Docker, Jenkins, Cloud IAM, VMs and more. Mentored 4000+ Students from over 150+ Colleges across India to land jobs in Google Cloud.',
    highlight: 'Mentored 4000+ students',
    links: [],
  },
  {
    company: 'CESA-CSI-LTCE',
    role: 'Technical Secretary',
    period: 'Aug 2021 - Aug 2022',
    location: 'Mumbai, India',
    description: 'Led Technical Team at Computer Engineering Students Association - Computer Society of India. Administering and Working on Open-Source Projects to help Beginner-Programmers get started with Problem-Solving. Mentoring Student Developers to grow their knowledge in a peer-to-peer learning environment and build solutions for Hackathons, local businesses and their community.',
    highlight: 'Led technical team & coding contests',
    links: [],
  },
  {
    company: 'PrepBytes',
    role: 'Campus Business Manager',
    period: 'Dec 2021 - Feb 2022',
    location: 'Remote',
    description: 'Led campus initiatives and managed business operations. Focused on team leadership, public speaking, and digital marketing.',
    highlight: 'Campus leadership',
    links: [],
  },
  {
    company: 'Dare2Compete',
    role: 'D2C Chief Igniter',
    period: 'Sep 2021 - Feb 2022',
    location: 'Remote',
    description: 'Led initiatives to engage students in competitive programming and hackathons. Focused on team leadership and public speaking.',
    highlight: 'Student engagement leader',
    links: [],
  },
];

export const GrantsSpeaking = () => {
  const ref = useRef<HTMLDivElement>(null);
  const volunteerScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const leftOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const leftX = useTransform(scrollYProgress, [0, 0.5, 1], [-30, 0, -30]);
  const rightX = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, 30]);

  useEffect(() => {
    const volunteerContainer = volunteerScrollRef.current;
    if (!volunteerContainer) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = volunteerContainer;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;

      if ((isScrollingDown && isAtBottom) || (isScrollingUp && isAtTop)) {
        return;
      }

      e.preventDefault();
      volunteerContainer.scrollTop += e.deltaY;
    };

    volunteerContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      volunteerContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div ref={ref} className='relative z-[2] min-h-screen' id='grants'>
      <div className='sticky top-0 flex min-h-screen flex-col items-center overflow-hidden md:flex-row'>
        {/* Left Side - Grants */}
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
            Grants
          </motion.div>
          
          <div className='relative w-full max-w-2xl space-y-4'>
            {/* Grants */}
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
                      {(() => {
                        const logoPath = getGrantLogo(grant.protocol);
                        return logoPath ? (
                          <motion.div
                            className='relative h-12 w-12 shrink-0'
                            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.4 }}
                          >
                            <Image
                              alt={`${grant.protocol} logo`}
                              className='object-contain'
                              height={48}
                              src={logoPath}
                              width={48}
                            />
                          </motion.div>
                        ) : (
                          <motion.span 
                            className='text-3xl'
                            whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.4 }}
                          >
                            {grant.icon}
                          </motion.span>
                        );
                      })()}
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

            {/* Publications */}
            <motion.div
              className='mt-12'
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className='mb-6 font-beatriceMedium text-xl font-semibold text-white/80'>
                Publications
              </h3>
              <div className='space-y-4'>
                {researchPapers.map((paper, index) => {
                  const uniqueKey = `${paper.title}-${String(paper.publisher)}`;
                  const delay = 0.4 + index * 0.08;
                  
                  return (
                    <motion.a
                      key={uniqueKey}
                      className='group relative block overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                      href={paper.link}
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
                          {paper.icon}
                        </motion.span>
                        <div className='flex-1'>
                          <div className='mb-2 rounded-md bg-white/[0.12] border border-white/10 px-2.5 py-1 text-xs font-semibold text-white/80 inline-block backdrop-blur-sm'>
                            Research Paper
                          </div>
                          <div className='mb-2 font-beatriceMedium text-base font-semibold text-white leading-snug'>
                            {paper.title}
                          </div>
                          <div className='text-xs font-medium text-white/40'>{paper.publisher}</div>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Copyrights */}
            <motion.div
              className='mt-12'
              initial={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h3 className='mb-6 font-beatriceMedium text-xl font-semibold text-white/80'>
                Copyrights
              </h3>
              <div className='space-y-4'>
                {copyrights.map((copyright, index) => {
                  const uniqueKey = `${copyright.title}-${String(copyright.publisher)}`;
                  const delay = 0.6 + index * 0.08;
                  
                  return (
                    <motion.a
                      key={uniqueKey}
                      className='group relative block overflow-hidden rounded-xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur-md transition-all duration-500 hover:border-white/15 hover:bg-white/[0.08] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                      href={copyright.link}
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
                          {copyright.icon}
                        </motion.span>
                        <div className='flex-1'>
                          <div className='mb-2 rounded-md bg-white/[0.12] border border-white/10 px-2.5 py-1 text-xs font-semibold text-white/80 inline-block backdrop-blur-sm'>
                            Copyright
                          </div>
                          <div className='mb-2 font-beatriceMedium text-base font-semibold text-white leading-snug'>
                            {copyright.title}
                          </div>
                          <div className='text-xs font-medium text-white/40'>{copyright.publisher}</div>
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side - Volunteer Experience */}
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
            Volunteer Experience
          </motion.div>
          
          <div 
            ref={volunteerScrollRef}
            className='relative w-full max-w-2xl max-h-[100vh] overflow-y-auto pr-4 scroll-smooth focus:outline-none'
            role='region'
            aria-label='Volunteer Experience'
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className='space-y-4 pb-4'>
              {volunteerExperiences.map((exp, index) => {
                const uniqueKey = `${exp.company}-${String(exp.period)}`;
                const delay = index * 0.06;
                
                return (
                  <motion.div
                    key={uniqueKey}
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
                      <div className='mb-3 flex items-center gap-3'>
                        {(() => {
                          const logoPath = getVolunteerLogo(exp.company);
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
                          <span className='font-beatriceMedium text-lg font-semibold text-white'>
                            {exp.role}
                          </span>
                          <span className='text-white/30'>@</span>
                          <span className='font-beatriceMedium text-lg font-semibold text-white/90'>
                            {exp.company}
                          </span>
                        </div>
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
                );
              })}
            </div>
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

