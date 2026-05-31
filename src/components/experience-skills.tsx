'use client';

import React, { useRef, useState } from 'react';

import { data } from '~/lib/data';

import { AnimatePresence, motion } from 'framer-motion';

import {
  Briefcase,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Download,
  FileText,
  Mail,
  X,
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
  index,
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
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

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

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.resume.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <section
      ref={containerRef}
      id='experience'
      // FIX 1: HAPUS 'overflow-hidden' DI SINI.
      // Jika konten memanjang ke bawah, biarkan halaman ikut memanjang (scrollable).
      className='relative w-full bg-[#024538] px-6 py-24 md:px-12'
    >
      {/* Decor */}
      <div className='pointer-events-none absolute right-[-5%] top-[20%] h-[400px] w-[400px] rounded-full bg-emerald-900/15 blur-[100px]' />

      <div className='relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20'>
        {/* --- KOLOM KIRI: EXPERIENCE LIST (PAGINATION) --- */}
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

            {/* Bagian Kanan: Pagination Controls */}
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

        {/* --- KOLOM KANAN: RESUME CARD --- */}
        {/* FIX 2: Tambahkan 'lg:sticky lg:top-24' agar Resume Card tetap terlihat saat scroll daftar Experience yang panjang */}
        <div className='relative z-20 flex h-full flex-col lg:sticky lg:top-24 lg:self-start'>
          <div className='mb-8 flex items-center gap-3'>
            <div className='rounded-lg border border-white/10 bg-white/5 p-2'>
              <FileText className='h-6 w-6 text-purple-400' />
            </div>
            <h2 className='font-elgocAlt text-3xl font-bold text-white md:text-4xl'>
              My Resume
            </h2>
          </div>

          <div className='group relative flex min-h-[450px] flex-1 flex-col items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-10 text-center transition-all duration-500 hover:bg-white/[0.04]'>
            <div
              className='absolute inset-0 opacity-[0.03]'
              style={{
                backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className='relative z-10 mb-8'>
              <div className='mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-white shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-transform duration-500 group-hover:scale-110'>
                <Download className='h-10 w-10' />
              </div>
              <h3 className='mb-4 font-elgocAlt text-4xl font-bold text-white'>
                Download CV
              </h3>
              <p className='mx-auto max-w-sm text-base leading-relaxed text-gray-400'>
                Get a detailed overview of my academic background, technical
                skills, and project history in a professional PDF format.
              </p>
            </div>
            <div className='relative z-10 w-full max-w-xs'>
              <button
                onClick={() => setShowRequestModal(true)}
                className='flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 text-base font-bold text-black shadow-lg shadow-white/5 transition-all hover:scale-[1.02] hover:bg-gray-200 active:scale-[0.98]'
              >
                Request Access
              </button>
              <p className='mt-5 font-mono text-xs uppercase tracking-widest text-gray-600'>
                Last Updated: December 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {showRequestModal && (
          <>
            <motion.div
              className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm'
              onClick={() => setShowRequestModal(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className='fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-[#033D2D] p-8 shadow-2xl'
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className='mb-8 flex items-center justify-between'>
                <h3 className='font-elgocAlt text-2xl font-bold text-white'>
                  Request Resume
                </h3>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className='rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white'
                >
                  <X className='h-6 w-6' />
                </button>
              </div>
              <div className='mb-8 rounded-xl border border-white/10 bg-white/[0.03] p-5'>
                <div className='mb-3 text-sm font-medium uppercase tracking-wider text-gray-500'>
                  Email Address
                </div>
                <div className='flex items-center gap-3'>
                  <code className='flex-1 truncate rounded bg-emerald-400/10 px-3 py-1.5 font-mono text-base text-emerald-400'>
                    {data.resume.email}
                  </code>
                  <button
                    onClick={handleCopyEmail}
                    className='flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/20'
                  >
                    {emailCopied ? (
                      <Check className='h-4 w-4' />
                    ) : (
                      <Copy className='h-4 w-4' />
                    )}
                    {emailCopied ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <button
                  onClick={() => setShowRequestModal(false)}
                  className='rounded-xl border border-white/10 py-3.5 text-base font-medium text-gray-400 transition-colors hover:bg-white/5 hover:text-white'
                >
                  Cancel
                </button>
                <a
                  href={`mailto:${data.resume.email}?subject=Resume Request`}
                  className='flex items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-base font-bold text-black transition-colors hover:bg-gray-200'
                >
                  <Mail className='h-5 w-5' /> Send Email
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
