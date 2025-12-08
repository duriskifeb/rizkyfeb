'use client';

import React, { useEffect, useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className='fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.08] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.12] hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          aria-label='Scroll to top'
        >
          <ArrowUp className='h-5 w-5 text-white/80' />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

