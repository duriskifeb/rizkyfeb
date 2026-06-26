'use client';

import React, { useRef, useState } from 'react';
import { data } from '~/lib/data';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// --- DATA EXPERIENCE ---
const experiences = [
  {
    company: 'Telkom University Surabaya',
    role: 'Lab Assistant Software Engineering',
    period: '2025 - Present',
    location: 'Lab Campus Telkom University Surabaya',
    description:
      'Assisting students in understanding software engineering concepts. Providing support during lab sessions and helping with project development.',
    highlight: 'Assisted in Labs',
    tech: ['Java', 'Maintenance', 'Service'],
  },
  {
    company: 'Telkom University Surabaya',
    role: 'Course Practicum Assistant',
    period: '2024 - 2025',
    location: 'Surabaya, Indonesia',
    description:
      'Mentored junior students in basic object-oriented programming courses. Assisting lecturers in grading and conducting practical exams.',
    highlight: 'Mentored 30+ Students',
    tech: ['Java OOP', 'MySQL', 'Git'],
  },
  {
    company: 'Unity Computer',
    role: 'IT, Technical Support',
    period: 'Mar 2022 - Dec 2023',
    location: 'Pandaan, East Java · On-site',
    description:
      'Provided technical support for laptops and printers. Assisted customers in troubleshooting hardware and software issues.',
    highlight: 'Service 50+ Customers',
    tech: ['Windows OS', 'Hardware', 'Service'],
  },
  {
    company: 'Freelance Project',
    role: 'Fullstack Developer',
    period: 'Jan 2024 - Present',
    location: 'Remote',
    description:
      'Developing web applications for various clients using modern web technologies. Focusing on responsive design and performance.',
    highlight: '5+ Projects Completed',
    tech: ['Next.js', 'Laravel', 'Tailwind'],
  },
  {
    company: 'Hima Telkom University',
    role: 'Head of Media Department',
    period: '2023 - 2024',
    location: 'Surabaya, Indonesia',
    description:
      'Led the media team in creating content for university events. Managed social media accounts and increased engagement.',
    highlight: 'Increased Reach by 40%',
    tech: ['Social Media', 'Content Creation'],
  },
];

// --- CARD COMPONENT ---
const ExperienceCard = ({
  exp,
  index: _index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className='relative mb-6 pl-8 md:pl-10'
    >
      {/* Timeline Visual */}
      <div className='absolute bottom-0 left-0 top-0 flex w-8 flex-col items-center'>
        <div className='absolute bottom-0 top-0 w-[2px] bg-white/10' />
        <div className='relative z-10 mt-6 h-3 w-3 rounded-full border-2 border-emerald-500 bg-[#024538] shadow-[0_0_10px_rgba(16,185,129,0.6)]'>
          <div className='absolute inset-0 animate-ping rounded-full bg-emerald-500/20 opacity-75' />
        </div>
      </div>

      <div className='group relative rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]'>
        <div className='mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-start'>
          <div>
            <h3 className='font-elgocAlt text-xl font-bold text-white transition-colors group-hover:text-emerald-400'>
              {exp.role}
            </h3>
            <div className='mt-1.5 flex flex-wrap items-center gap-2'>
              <span className='text-sm font-semibold text-gray-300'>
                {exp.company}
              </span>
              <span className='hidden text-gray-600 sm:inline'>•</span>
              <span className='text-xs text-gray-500'>{exp.location}</span>
            </div>
          </div>
          <div className='shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-emerald-300'>
            {exp.period}
          </div>
        </div>
        <p className='mb-5 text-sm leading-relaxed text-gray-400'>
          {exp.description}
        </p>
        <div className='flex flex-wrap items-center gap-2'>
          <span className='rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-400'>
            {exp.highlight}
          </span>
          {exp.tech.map((t, idx) => (
            <span
              key={idx}
              className='cursor-default rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs text-gray-500'
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

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Menampilkan 3 item per halaman
  const totalPages = Math.ceil(experiences.length / itemsPerPage);

  const currentExperiences = experiences.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  return (
    <section
      ref={containerRef}
      id='experience'
      className='relative w-full px-6 py-24 md:px-12'
      style={{ background: 'var(--section-bg)' }}
    >
      {/* Decor */}
      <div className='pointer-events-none absolute right-[-5%] top-[20%] h-[400px] w-[400px] rounded-full bg-emerald-900/15 blur-[100px]' />

      <div className='relative z-10 mx-auto max-w-6xl'>
        {/* --- EXPERIENCE LIST (FULL WIDTH) --- */}
        <div className='relative z-20 flex flex-col'>
          <div className='mb-8 flex items-end justify-between'>
            {/* Bagian Kiri: Judul & Deskripsi */}
            <div>
              <div className='mb-3 flex items-center gap-3'>
                <div className='rounded-lg border border-white/10 bg-white/5 p-2'>
                  <Briefcase className='h-6 w-6 text-emerald-400' />
                </div>
                <h2 className='font-elgocAlt text-3xl font-bold text-white md:text-4xl'>
                  Experience
                </h2>
              </div>
              <p className='pl-1 text-base text-gray-400'>
                My professional track record and journey.
              </p>
            </div>

            {/* Pagination Controls */}
            <div className='flex items-center gap-2'>
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className='rounded-lg border border-white/10 bg-white/5 p-2.5 text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30'
              >
                <ChevronLeft className='h-5 w-5' />
              </button>
              <span className='w-14 text-center font-mono text-sm text-gray-500'>
                {currentPage + 1} / {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className='rounded-lg border border-white/10 bg-white/5 p-2.5 text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30'
              >
                <ChevronRight className='h-5 w-5' />
              </button>
            </div>
          </div>

          {/* List Area */}
          <div className='relative w-full'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {currentExperiences.map((exp, i) => (
                  <ExperienceCard
                    key={`${currentPage}-${i}`}
                    exp={exp}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
