'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Briefcase,
  ChevronLeft,
  ChevronRight,
  FolderGit2,
  GraduationCap,
  Users2,
} from 'lucide-react';

// --- DATA LENGKAP SEMUA KATEGORI ---
const experiences = [
  // ========== EXPERIENCE ==========
  {
    company: 'SEFEST Competition 2024',
    role: 'Equipment Division Member',
    period: '2024',
    location: 'Telkom University Surabaya',
    description:
      'Managed and prepared equipment for the SEFEST competition. Ensured all technical needs were met for participants and judges.',
    highlight: 'Equipment Management',
    tech: ['Event', 'Technical', 'Logistics'],
    category: 'experience',
  },
  {
    company: 'SEFEST Competition 2025',
    role: 'Event Coordinator',
    period: '2025',
    location: 'Telkom University Surabaya',
    description:
      'Coordinated the entire SEFEST competition event. Led the team in planning, execution, and post-event evaluation.',
    highlight: 'Led 20+ Teams',
    tech: ['Leadership', 'Event', 'Coordination'],
    category: 'experience',
  },
  {
    company: 'OSJUR Software Engineering',
    role: 'Master of Ceremony (MC)',
    period: '2024',
    location: 'Telkom University Surabaya',
    description:
      'Served as Master of Ceremony for the Software Engineering Orientation event. Managed the flow of the event and engaged with participants.',
    highlight: 'Public Speaking',
    tech: ['Communication', 'Event', 'Public Speaking'],
    category: 'experience',
  },
  {
    company: 'OSJUR Software Engineering',
    role: 'Master of Ceremony (MC)',
    period: '2025',
    location: 'Telkom University Surabaya',
    description:
      'Returned as Master of Ceremony for the 2025 Software Engineering Orientation. Created an energetic and welcoming atmosphere for new students.',
    highlight: 'Engaged 100+ Students',
    tech: ['Public Speaking', 'Communication', 'Event'],
    category: 'experience',
  },
  {
    company: 'Buka Bersama CODER',
    role: 'Master of Ceremony (MC)',
    period: '2024',
    location: 'Telkom University Surabaya',
    description:
      'Hosted the CODER community Iftar event. Managed the event flow and ensured a smooth and memorable experience for all attendees.',
    highlight: 'Community Event',
    tech: ['Communication', 'Community', 'Event'],
    category: 'experience',
  },
  {
    company: 'The Market Day 2025',
    role: 'Member of Event Division',
    period: '2025',
    location: 'Telkom University Surabaya',
    description:
      'Part of the event division for The Market Day. Contributed to planning and executing university event.',
    highlight: 'Event Planning',
    tech: ['Event', 'Coordination', 'Teamwork'],
    category: 'experience',
  },
  {
    company: 'Workshop Teknplore 2024',
    role: 'Public Relations Division Member',
    period: '2024',
    location: 'Telkom University Surabaya',
    description:
      'Managed public relations for the Teknplore workshop. Handled communications and promoted the event to students.',
    highlight: 'Promoted to 200+ Students',
    tech: ['Public Relations', 'Communication', 'Marketing'],
    category: 'experience',
  },
  {
    company: 'Workshop Wonderful Adventure Of Website',
    role: 'Public Relations Division Member',
    period: '2024',
    location: 'Telkom University Surabaya',
    description:
      'Handled public relations for the web development workshop. Promoted the event and managed participant communications.',
    highlight: 'PR & Marketing',
    tech: ['Public Relations', 'Communication'],
    category: 'experience',
  },
  {
    company: 'PKMMB Dewangkara Maetala 2025',
    role: 'Deputy Event Coordinator',
    period: '2025',
    location: 'Telkom University Surabaya',
    description:
      'Assisted in coordinating the PKMMB event. Supported the event coordinator in planning and execution.',
    highlight: 'Coordinated 10+ Events',
    tech: ['Leadership', 'Event', 'Coordination'],
    category: 'experience',
  },
  {
    company: 'Sidang Senat Pengukuhan MABA 2025',
    role: 'Student Affairs Division',
    period: '2025',
    location: 'Telkom University Surabaya',
    description:
      'Handled student affairs for the new student inauguration senate session. Managed student related matters and coordination.',
    highlight: 'Student Management',
    tech: ['Student Affairs', 'Coordination'],
    category: 'experience',
  },
  {
    company: 'Protokoler Wisudawan Kampus',
    role: 'Official Representative & Presenter',
    period: '2025',
    location: 'Telkom University Surabaya',
    description:
      'Served as official representative for graduates and presenter of graduate works at the campus graduation ceremony.',
    highlight: 'Presented 50+ Graduate Works',
    tech: ['Public Speaking', 'Representation', 'Communication'],
    category: 'experience',
  },
  {
    company: 'Open House PKKMB Dewangkaran Maetala 2026',
    role: 'Master Of Ceremony',
    period: '2026',
    location: 'Telkom University Surabaya',
    description:
      'Hosted the DM 26. Managed the event flow and ensured a smooth and memorable experience for all attendees.',
    highlight: 'Presented 50+ Graduate Works',
    tech: ['Public Speaking', 'Representation', 'Communication'],
    category: 'experience',
  },
  {
    company: 'Diklat PKKMB Dewangkaran Maetala 2026',
    role: 'Master Of Ceremony',
    period: '2026',
    location: 'Telkom University Surabaya',
    description:
      'Hosted the DM 26. Managed the event flow and ensured a smooth and memorable experience for all attendees.',
    highlight: 'Presented 50+ Graduate Works',
    tech: ['Public Speaking', 'Representation', 'Communication'],
    category: 'experience',
  },

  // ========== PROJECT ==========
  {
    company: 'Freelance Project',
    role: 'Fullstack Developer',
    period: 'Jan 2024 - Present',
    location: 'Remote',
    description:
      'Developing web applications for various clients using modern web technologies. Focusing on responsive design and performance.',
    highlight: '5+ Projects Completed',
    tech: ['Next.js', 'Laravel', 'Tailwind'],
    category: 'project',
  },
  {
    company: 'Personal Portfolio',
    role: 'Web Developer',
    period: '2025',
    location: 'Personal Project',
    description:
      'Built a personal portfolio website using Next.js, TypeScript, and Tailwind CSS. Features 3D lanyard badge, responsive design, and modern UI.',
    highlight: '3D Interactive Badge',
    tech: ['Next.js', 'TypeScript', 'Three.js', 'Tailwind'],
    category: 'project',
  },
  {
    company: 'Web Development CODER',
    role: 'Project Lead',
    period: '2024 - 2025',
    location: 'CODER Community',
    description:
      'Led web development projects for CODER community. Guided team members in building web applications and learning modern frameworks.',
    highlight: 'Led 5+ Projects',
    tech: ['React', 'Next.js', 'Node.js'],
    category: 'project',
  },

  // ========== ORGANIZATION ==========
  {
    company: 'Himpunan Mahasiswa Software Engineering (HIMSE)',
    role: 'External Relations',
    period: '2024 - 2025',
    location: 'Telkom University Surabaya',
    description:
      'Managed external relations for the Software Engineering Student Association. Built partnerships and maintained relationships with external parties.',
    highlight: 'Built 5+ Partnerships',
    tech: ['Public Relations', 'Networking', 'Communication'],
    category: 'organization',
  },
  {
    company: 'Himpunan Mahasiswa Software Engineering (HIMSE)',
    role: 'Chair (Ketua)',
    period: '2025 - Present',
    location: 'Telkom University Surabaya',
    description:
      'Currently serving as Chair of the Software Engineering Student Association. Leading the organization and managing all internal and external activities.',
    highlight: 'Leading 43 Members',
    tech: ['Leadership', 'Management', 'Organization'],
    category: 'organization',
  },
  {
    company: 'Creativity on Digital Environment in Room of Technology (CODER)',
    role: 'Secretary of Web Development Division',
    period: '2024 - 2025',
    location: 'Telkom University Surabaya',
    description:
      'Served as Secretary for the Web Development Division at CODER. Managed documentation, communication, and coordination for web development activities.',
    highlight: 'Managed 1 Events',
    tech: ['Documentation', 'Coordination', 'Web Development'],
    category: 'organization',
  },

  // ========== EDUCATIONAL ==========
  {
    company: 'SDN 1 Bulusari',
    role: 'Elementary School',
    period: '2011 - 2017',
    location: 'Gempol, Pasuruan, East Java',
    description:
      'Completed elementary education at SDN 1 Bulusari. Built foundational knowledge in core subjects and developed basic learning skills.',
    highlight: 'Foundation Education',
    tech: ['Basic Education', 'Character Building'],
    category: 'educational',
  },
  {
    company: 'SMPN 2 Kraton',
    role: 'Junior High School',
    period: '2017 - 2020',
    location: 'Wonorejo, Pasuruan, East Java',
    description:
      'Completed junior high school education at SMPN 2 Kraton. Developed critical thinking skills and explored interests in science and technology.',
    highlight: 'Junior High Graduate',
    tech: ['Science', 'Mathematics', 'Technology'],
    category: 'educational',
  },
  {
    company: 'SMKN 1 Wonorejo',
    role: 'Vocational High School - Computer and Network Engineering',
    period: '2020 - 2023',
    location: 'Wonorejo, East Java',
    description:
      'Graduated from Vocational High School with major in Computer and Network Engineering. Built foundation in networking, hardware, and computer systems.',
    highlight: 'Graduated with Excellence',
    tech: ['Computer Network', 'Hardware', 'TCP/IP'],
    category: 'educational',
  },
  {
    company: 'Telkom University Surabaya',
    role: 'Software Engineering - Current Student',
    period: '2023 - Now',
    location: 'Surabaya, Indonesia',
    description:
      'Currently pursuing a degree in Software Engineering with GPA 3.29. Learning software development, system design, and software engineering principles.',
    highlight: 'IPK 3.29',
    tech: ['Software Engineering', 'System Design', 'Programming'],
    category: 'educational',
  },
  {
    company: 'Course Practicum Assistant',
    role: 'Course Practicum Assistant',
    period: '2024 - 2025',
    location: 'Telkom University Surabaya',
    description:
      'Assisted in practical courses for software engineering students. Grading assignments and helping students understand core programming concepts.',
    highlight: 'Mentored 30+ Students',
    tech: ['Java OOP', 'MySQL', 'Git'],
    category: 'educational',
  },
  {
    company: 'Lab Assistant Software Engineering',
    role: 'Lab Assistant',
    period: '2025 - Present',
    location: 'Lab Campus Telkom University Surabaya',
    description:
      'Assisting students in understanding software engineering concepts. Providing support during lab sessions and helping with project development.',
    highlight: 'Assisted in Labs',
    tech: ['Java', 'Maintenance', 'Service'],
    category: 'educational',
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

              {/* LINGKARAN GLOWING PENGGANTI TITIK */}
              <span className='hidden sm:inline-flex items-center justify-center'>
                <span className='relative flex h-1.5 w-1.5'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70 opacity-75' />
                  <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' />
                </span>
              </span>

              <span className='text-sm text-pink-300'>{exp.location}</span>
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
              className='cursor-default rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs text-white-300'
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

  // --- TABS STATE ---
  const [activeTab, setActiveTab] = useState<'experience' | 'project' | 'organization' | 'educational'>('experience');

  const tabs = [
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'project', label: 'Project', icon: FolderGit2 },
    { id: 'organization', label: 'Organization', icon: Users2 },
    { id: 'educational', label: 'Educational', icon: GraduationCap },
  ] as const;

  // --- FILTERED DATA ---
  const filteredExperiences = experiences.filter((exp) => exp.category === activeTab);

  // --- PAGINATION STATE ---
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(filteredExperiences.length / itemsPerPage));

  const currentExperiences = filteredExperiences.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handleTabChange = (tabId: typeof activeTab) => {
    setActiveTab(tabId);
    setCurrentPage(0);
  };

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
        <div className='relative z-20 flex flex-col'>

          {/* Header Section - Tanpa Pagination di sini */}
          <div className='mb-8'>
            <div className='mb-3 flex items-center gap-3'>
              <div className='rounded-lg border border-white/10 bg-white/5 p-2'>
                <Briefcase className='h-6 w-6 text-emerald-400' />
              </div>
              <h2 className='font-elgocAlt text-3xl font-bold text-white md:text-4xl'>
                Journey & track record
              </h2>
            </div>
            <p className='pl-1 text-base text-gray-400'>
              My professional experience, personal projects, organization activities, and educational history.
            </p>
          </div>

          {/* --- CATEGORY TABS --- */}
          <div className='mb-10 flex flex-wrap gap-2 border-b border-white/5 pb-6'>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${isActive
                    ? 'bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                    : 'border border-white/5 bg-white/[0.02] text-gray-400 hover:border-white/10 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <Icon className='h-4 w-4' />
                  <span>{tab.label}</span>
                  <span className={`ml-1 text-xs ${isActive ? 'text-black/70' : 'text-gray-500'}`}>
                    ({experiences.filter(e => e.category === tab.id).length})
                  </span>
                </button>
              );
            })}
          </div>

          {/* List Area */}
          <div className='relative w-full min-h-[300px]'>
            <AnimatePresence mode='wait'>
              <motion.div
                key={`${activeTab}-${currentPage}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                {currentExperiences.length > 0 ? (
                  currentExperiences.map((exp, i) => (
                    <ExperienceCard
                      key={`${activeTab}-${currentPage}-${i}`}
                      exp={exp}
                      index={i}
                    />
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center py-16 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01]'>
                    <p className='text-gray-500 text-sm'>No items added under this category yet.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- PAGINATION DI BAWAH (SETELAH LIST) --- */}
          {filteredExperiences.length > itemsPerPage && (
            <div className='mt-8 flex items-center justify-center gap-4 border-t border-white/5 pt-6'>
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className='rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 flex items-center gap-2'
              >
                <ChevronLeft className='h-4 w-4' />
                <span className='text-sm'>Previous</span>
              </button>
              <span className='font-mono text-sm text-gray-500'>
                Page {currentPage + 1} of {totalPages}
              </span>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className='rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white transition-all hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30 flex items-center gap-2'
              >
                <span className='text-sm'>Next</span>
                <ChevronRight className='h-4 w-4' />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};