'use client';

import React, { useRef, useEffect } from 'react';

import { Globe, Twitter, MessageCircle } from 'lucide-react';

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
  return Globe;
};

interface VolunteerLink {
  label: string;
  url: string;
}

interface VolunteerExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlight: string;
  links?: VolunteerLink[];
}

const volunteerExperiences: VolunteerExperience[] = [
  {
    company: 'Postman',
    role: 'Postman Student Expert',
    period: 'May 2021 - Present',
    location: 'Remote',
    description: 'Helping Students by Breaking down what is an API with real-world and digital world examples. Explaining the Growth of APIs and how it would help them. Understanding Postman and giving them live Requests and responses for Basics of APIs. Hand-on training of API with Postman, Student Expert Certification and Solving Questions and Queries to help them understand the commands better.',
    highlight: '4+ years mentoring students',
    links: [],
  },
  {
    company: 'Coursera',
    role: 'Beta Tester',
    period: 'Feb 2021 - Present',
    location: 'Remote',
    description: 'Testing the Courses before their release. Generating and providing feedback to help the Instructor to make the course better and effective on release. Making the backend team understand if the course is not up to the mark or is improper.',
    highlight: '4+ years quality assurance',
    links: [],
  },
  {
    company: 'Amazon Web Services (AWS)',
    role: 'AWS Educate Student Ambassador',
    period: 'Mar 2021 - Present',
    location: 'Remote',
    description: 'Planning and Conducting meetings to make students aware of the AWS Cloud Platform and Services. Inculcating and developing technical skills among students to solve real-world problems by deploying the projects on AWS Cloud.',
    highlight: '4+ years cloud education',
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
    description: 'Facilitated the 3 months of the Google Cloud Ready Program brought forward by Google Cloud India to help Student Developers upskill themselves in Google Cloud. Participated in Cloud Engineering Track and completed Quests & Challenges on technologies like Kubernetes, Docker, Jenkins, Cloud IAM, Virtual Machines and more. Mentored 500+ Students from over 150+ Colleges across India.',
    highlight: 'Mentored 500+ students',
    links: [],
  },
  {
    company: 'GirlScript Summer of Code',
    role: 'Open Source Contributor',
    period: 'Feb 2021 - Jun 2021',
    location: 'Remote',
    description: 'Contributed to TesseractCoding, NeoAlgo. Worked Primarily in Data Structures and Algorithms, Data Modelling and Python Development for GSSOC 2021. Collaborated on Git and GitHub for Open-Source Development.',
    highlight: 'Open source contributions',
    links: [],
  },
  {
    company: 'CESA-CSI-LTCE',
    role: 'Technical Secretary',
    period: 'Aug 2021 - Aug 2022',
    location: 'Mumbai, India',
    description: 'Led Technical Team at Computer Engineering Students Association - Computer Society of India. Administering and Working on Open-Source Projects to help Beginner-Programmers get started with Problem-Solving. Mentoring Student Developers to grow their knowledge in a peer-to-peer learning environment and build solutions for Hackathons, local businesses and their community. Conducting Monthly Competitive Coding Cook-Offs on Hackerrank & Codechef Coding Platform, acting as Contest Moderator and Problem Setter.',
    highlight: 'Led technical team & coding contests',
    links: [],
  },
  {
    company: 'GirlScript Winter of Contributing',
    role: 'Open Source Developer & Mentor',
    period: 'Aug 2021 - Dec 2021',
    location: 'Remote',
    description: 'Contributed to open source projects while mentoring other developers. Focused on Python, Node.js, MongoDB, AI/ML technologies, and web development.',
    highlight: 'Open source & mentorship',
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

export const VolunteerExperience = () => {
  const ref = useRef<HTMLDivElement>(null);
  const volunteerScrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const volunteerContainer = volunteerScrollRef.current;
    if (!volunteerContainer) return;

    const handleWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = volunteerContainer;
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
      volunteerContainer.scrollTop += e.deltaY;
    };

    volunteerContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      volunteerContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div ref={ref} className='relative z-[2] min-h-screen py-24' id='volunteer'>
      <div className='mx-auto max-w-5xl px-4 sm:px-6'>
        <motion.div
          className='mb-20 text-center font-elgocAlt text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.9] text-white'
          initial={{ opacity: 0, y: -30 }}
          style={{ opacity }}
          transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Volunteer Experience
        </motion.div>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-6 top-0 h-full w-0.5 bg-white/10 md:left-1/2' />

          <div 
            ref={volunteerScrollRef}
            className='relative max-h-[70vh] overflow-y-auto pr-4 scroll-smooth focus:outline-none'
            role='region'
            aria-label='Volunteer Experience'
            style={{ scrollBehavior: 'smooth' }}
          >
            <div className='space-y-8 pb-4'>
              {volunteerExperiences.map((exp, index) => {
                const uniqueKey = `${exp.company}-${String(exp.period)}`;
                const xOffset = index % 2 === 0 ? -30 : 30;
                const delay = index * 0.08;
                
                return (
                  <motion.div
                    key={uniqueKey}
                    className='relative mb-16 flex items-start gap-6 md:mb-24'
                    initial={{ opacity: 0, x: xOffset }}
                    transition={{ delay, duration: 0.5 }}
                    viewport={{ once: true, margin: '-50px' }}
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
      </div>
    </div>
  );
};

