'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Menu, Moon, Sun, X } from 'lucide-react';

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
  const [isLight, setIsLight] = useState(false);

  // Read saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const light = saved === 'light';
    setIsLight(light);
    if (light) {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMobileOpen(false);

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    if (next) {
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <>
      <nav
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
          scrolled ? 'w-[94%]' : 'w-[96%]'
        } max-w-[720px]`}
      >
        <div
          className='flex items-center justify-between gap-3 rounded-full px-4 py-2.5 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.12)]'
          style={{
            background: 'var(--navbar-bg)',
            border: '1px solid var(--navbar-border)',
          }}
        >
          {/* ── Logo / Brand ── */}
          <Link
            href='/'
            className='group flex shrink-0 items-center gap-1.5 select-none'
            aria-label='Home'
          >
            <span
              className='navbar-logo font-elgocAlt text-[15px] font-bold tracking-tight transition-all duration-200 group-hover:opacity-75'
            >
              duriskifeb
            </span>
            <span className='relative flex h-1.5 w-1.5 shrink-0 mt-0.5'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75' />
              <span className='relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400' />
            </span>
          </Link>

          {/* ── Desktop links ── */}
          <div className='hidden md:flex items-center gap-0.5'>
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className='rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200'
                  style={{
                    color: active
                      ? 'var(--navbar-text-active)'
                      : 'var(--navbar-text)',
                    background: active
                      ? 'var(--navbar-item-active-bg)'
                      : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background =
                        'var(--navbar-item-hover-bg)';
                      (e.currentTarget as HTMLElement).style.color =
                        'var(--navbar-text-active)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      (e.currentTarget as HTMLElement).style.background =
                        'transparent';
                      (e.currentTarget as HTMLElement).style.color =
                        'var(--navbar-text)';
                    }
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* ── Right: Theme toggle + Mobile hamburger ── */}
          <div className='flex items-center gap-2'>
            {/* Theme Toggle Switch */}
            <button
              onClick={toggleTheme}
              type='button'
              aria-label='Toggle theme'
              title={isLight ? 'Switch to Dark' : 'Switch to Light'}
              className='relative flex h-8 w-[3.75rem] items-center rounded-full p-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400'
              style={{
                background: isLight
                  ? 'rgba(2,69,56,0.1)'
                  : 'rgba(255,255,255,0.1)',
                border: '1px solid',
                borderColor: isLight
                  ? 'rgba(2,69,56,0.18)'
                  : 'rgba(255,255,255,0.15)',
              }}
            >
              {/* Sliding knob */}
              <span
                className='absolute flex h-6 w-6 items-center justify-center rounded-full shadow-md transition-all duration-300 ease-in-out'
                style={{
                  left: isLight ? 'calc(100% - 1.625rem)' : '0.2rem',
                  background: isLight ? '#024538' : '#065544',
                }}
              >
                {isLight ? (
                  <Sun className='theme-toggle-icon h-3.5 w-3.5' />
                ) : (
                  <Moon className='theme-toggle-icon h-3.5 w-3.5' />
                )}
              </span>
              {/* Track icons */}
              <Moon
                className='h-3 w-3 ml-1.5'
                style={{ color: isLight ? 'transparent' : 'rgba(255,255,255,0.25)' }}
              />
              <Sun
                className='h-3 w-3 ml-auto mr-1.5'
                style={{ color: isLight ? 'rgba(2,69,56,0.4)' : 'transparent' }}
              />
            </button>

            {/* Mobile hamburger */}
            <button
              className='md:hidden rounded-full p-2 transition-all'
              style={{
                background: 'var(--navbar-item-hover-bg)',
                color: 'var(--navbar-text-active)',
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              type='button'
              aria-label='Toggle menu'
            >
              {mobileOpen ? (
                <X className='h-4 w-4' />
              ) : (
                <Menu className='h-4 w-4' />
              )}
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ── */}
        {mobileOpen && (
          <div
            className='mt-2 rounded-2xl p-3 shadow-xl backdrop-blur-xl'
            style={{
              background: isLight
                ? 'rgba(240,253,248,0.97)'
                : 'rgba(2,69,56,0.97)',
              border: '1px solid var(--navbar-border)',
            }}
          >
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={closeMenu}
                  className='block w-full rounded-xl px-5 py-3 text-left text-sm font-medium transition-all'
                  style={{
                    color: active
                      ? 'var(--navbar-text-active)'
                      : 'var(--navbar-text)',
                    background: active
                      ? 'var(--navbar-item-active-bg)'
                      : 'transparent',
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
            <div
              className='mt-2 border-t pt-2'
              style={{ borderColor: 'var(--navbar-border)' }}
            >
              <Link
                href='/contact'
                onClick={closeMenu}
                className='block w-full rounded-xl px-5 py-3 text-center text-sm font-semibold text-emerald-400 transition-all'
                style={{ background: 'rgba(52,211,153,0.08)' }}
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
