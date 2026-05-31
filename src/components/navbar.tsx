'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => {
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Fixed pill navbar ── */}
      <nav
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${scrolled ? 'w-[88%]' : 'w-[92%]'
          } max-w-[640px]`}
      >
        <div className='flex items-center justify-between gap-3 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.2)]'>
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenu}
            className='shrink-0 font-black text-sm tracking-wider text-white hover:text-emerald-300 transition-colors'
          >
            duriskifeb
          </Link>

          {/* Desktop links */}
          <div className='hidden md:flex items-center gap-0.5'>
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${pathname === link.href
                    ? 'bg-white/15 text-white'
                    : 'text-white/55 hover:text-white hover:bg-white/8'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className='flex items-center gap-2'>
            <Link
              href="/contact"
              className='hidden md:inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/15 px-4 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-400/25 transition-all'
            >
              <span className='relative flex h-1.5 w-1.5'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
                <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400' />
              </span>
              Hire Me
            </Link>
            {/* Mobile hamburger */}
            <button
              className='md:hidden rounded-full bg-white/10 p-2 text-white/80 hover:bg-white/20 hover:text-white transition-all'
              onClick={() => setMobileOpen(!mobileOpen)}
              type='button'
              aria-label='Toggle menu'
            >
              {mobileOpen ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div className='mt-2 rounded-2xl border border-white/10 bg-[#024538]/95 backdrop-blur-xl p-3 shadow-xl'>
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className='block w-full rounded-xl px-5 py-3 text-left text-sm font-medium text-white/70 hover:bg-white/8 hover:text-white transition-all'
              >
                {link.label}
              </Link>
            ))}
            <div className='mt-2 border-t border-white/10 pt-2'>
              <Link
                href="/contact"
                onClick={closeMenu}
                className='block w-full rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-center text-sm font-semibold text-emerald-300'
              >
                ✦ Hire Me
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};
