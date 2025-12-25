'use client';

import Image from 'next/image';

import React, { useRef } from 'react';

import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from 'framer-motion';

import { Briefcase, Code2, Cpu, FileText, Globe, MessageCircle, Presentation, Twitter, Video } from 'lucide-react';


// --- DATA EXPERIENCE (Disesuaikan untuk Mahasiswa/Junior) ---
const experiences = [
  {
    company: 'Unity Computer',
    role: 'IT, Technical Support, Customer Service',
    period: 'Mar 2022 - Dec 2023',
    location: 'Pandaan, East Java, Indonesia · On-site',
    description:
      'Provided technical support and maintenance services for laptops, printers, and other computer peripherals. Assisted customers in troubleshooting hardware and software issues.',
    highlight: 'Service Laptop and Printer for 50+ Customers',
    tech: ['Windows OS', 'Hardware Troubleshooting', 'Customer Service'],
    links: [],
  },
  {
    company: 'Telkom University Surabaya',
    role: 'course practicum assistant',
    period: '2024 - 2025',
    location: 'Surabaya, Indonesia',
    description:
      'Mentoring junior students in basic object-oriented programming courses. Assisting lecturers in grading and conducting practical exams.',
    highlight: 'Mentored 30+ Students',
    tech: ['Java OOP', 'mysql', 'Git', ''],
    links: [],
  },
  {
    company: 'Telkom University Surabaya',
    role: 'Lab Assistant Software Engineering (SWENG)',
    period: '2025 - Present',
    location: 'Lab Campus Telkom University Surabaya',
    description:
      'Assisting students in understanding software engineering concepts and practices. Providing support during lab sessions and helping with project development.',
    highlight: 'Assisted in Software Engineering Labs',
    tech: ['Java', 'Maintenance', 'Service'],
    links: [],
  },
];

// --- DATA SKILLS ---
const skills = {
  languages: [
    { name: 'Dart', level: 5, icon: '/images/tech/dart.png' }, // Ganti path icon nanti
    { name: 'PHP', level: 5, icon: '/images/tech/php.png' },
    { name: 'JavaScript', level: 4, icon: '/images/tech/js.png' },
    { name: 'Python', level: 3, icon: '/images/tech/python.png' },
    { name: 'SQL', level: 4, icon: '/images/tech/sql.png' },
  ],
  frameworks: [
    'Flutter',
    'Laravel',
    'React.js',
    'Next.js',
    'Tailwind CSS',
    'Node.js',
    'Express',
  ],
  tools: [
    'Git',
    'Figma',
    'Blender',
    'Postman',
    'VS Code',
    'Android Studio',
  ],
};

// --- COMPONENTS KECIL ---

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.2 }}
      className='relative pl-8 md:pl-0'
    >
      {/* Timeline Line & Dot (Hanya muncul di Desktop layout grid) */}
      <div className='absolute bottom-0 left-[-9px] top-0 hidden w-[2px] bg-white/10 md:block'>
        <div className='absolute left-1/2 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-blue-500 bg-[#0b0b0d] shadow-[0_0_10px_rgba(59,130,246,0.5)]'></div>
      </div>

      {/* Mobile Line */}
      <div className='absolute bottom-0 left-0 top-0 w-[2px] bg-white/10 md:hidden'>
        <div className='absolute left-1/2 top-6 h-3 w-3 -translate-x-1/2 rounded-full bg-blue-500'></div>
      </div>

      <div className='group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]'>
        <div className='mb-4 flex flex-col justify-between sm:flex-row sm:items-center'>
          <div>
            <h3 className='font-elgocAlt text-xl font-bold text-white'>
              {exp.role}
            </h3>
            <p className='text-sm font-medium text-blue-400'>{exp.company}</p>
          </div>
          <div className='mt-2 rounded bg-white/5 px-2 py-1 font-mono text-xs text-gray-500 sm:mt-0'>
            {exp.period}
          </div>
        </div>

        <p className='mb-4 text-sm leading-relaxed text-gray-400'>
          {exp.description}
        </p>

        <div className='mt-4 flex flex-wrap gap-2'>
          <span className='rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-400'>
            {exp.highlight}
          </span>
          {exp.tech.map((t) => (
            <span
              key={t}
              className='rounded-md border border-white/5 px-2 py-1 text-xs text-gray-500'
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const ExperienceSkills = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      id='experience'
      className='relative min-h-screen w-full overflow-hidden bg-[#0b0b0d] px-6 py-24 md:px-12'
    >
      {/* Background Decor */}
      <div className='pointer-events-none absolute left-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-indigo-900/10 blur-[120px]' />

      <div className='relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12'>
        {/* --- KOLOM KIRI: EXPERIENCE (Timeline) --- */}
        <div className='lg:col-span-7'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='mb-10 flex items-center gap-3'
          >
            <Briefcase className='h-6 w-6 text-blue-500' />
            <h2 className='font-elgocAlt text-3xl font-bold text-white md:text-4xl'>
              Professional Journey
            </h2>
          </motion.div>

          <div className='space-y-8 border-l-0 border-white/5 md:border-l md:pl-4'>
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>

        {/* --- KOLOM KANAN: SKILLS (Arsenal) --- */}
        <div className='lg:col-span-5'>
          <div className='sticky top-24'>
            {' '}
            {/* Sticky agar ikut scroll */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='mb-8 flex items-center gap-3'
            >
              <Cpu className='h-6 w-6 text-purple-500' />
              <h2 className='font-elgocAlt text-3xl font-bold text-white md:text-4xl'>
                Tech Arsenal
              </h2>
            </motion.div>
            {/* 1. Core Languages */}
            <div className='mb-10'>
              <h3 className='mb-4 border-b border-white/10 pb-2 font-mono text-sm uppercase tracking-widest text-gray-500'>
                Core Languages
              </h3>
              <div className='space-y-4'>
                {skills.languages.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: '100%', opacity: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className='group'
                  >
                    <div className='mb-1 flex justify-between text-sm'>
                      <span className='font-medium text-white'>
                        {skill.name}
                      </span>
                      <span className='text-gray-500'>{skill.level * 20}%</span>
                    </div>
                    <div className='h-2 w-full overflow-hidden rounded-full bg-white/5'>
                      <motion.div
                        className='h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600'
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level * 20}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* 2. Frameworks & Tools */}
            <div>
              <h3 className='mb-4 border-b border-white/10 pb-2 font-mono text-sm uppercase tracking-widest text-gray-500'>
                Frameworks & Tools
              </h3>
              <div className='flex flex-wrap gap-2'>
                {[...skills.frameworks, ...skills.tools].map((item, i) => (
                  <motion.span
                    key={item}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.05, type: 'spring' }}
                    viewport={{ once: true }}
                    className='cursor-default rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-300 transition-all hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white'
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};