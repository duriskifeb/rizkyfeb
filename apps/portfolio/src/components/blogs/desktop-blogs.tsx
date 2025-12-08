'use client';

import Image from 'next/image';
import Link from 'next/link';

import React from 'react';
import { motion } from 'framer-motion';

import { type Post, getPostImageUrl } from '~/lib/utils';

interface DesktopBlogsProps {
  scrollProgress: number;
  posts: Post[];
}

export const DesktopBlogs = ({ scrollProgress, posts }: DesktopBlogsProps) => {
  const group1 = posts.slice(0, posts.length / 2);
  const group2 = posts.slice(posts.length / 2);
  return (
    <div className='relative hidden w-full basis-3/5 flex-row justify-center gap-12 md:flex'>
      <div className='carousel-grad carousel-grad-top z-[4]' />
      <div className='carousel-grad carousel-grad-bottom z-[4]' />
      <div
        className='flex flex-col gap-5'
        style={{
          transform: `translateY(calc(-${String(scrollProgress)}px + 10vh))`,
        }}
      >
        {group1.map((article, index) => {
          return (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={article.url}
                target='_blank'
                className='group relative flex w-full max-w-[320px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:scale-[1.02]'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 group-hover:opacity-100' />
                <div className='relative aspect-[16/9] w-full overflow-hidden'>
                  <Image
                    alt={article.title}
                    className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
                    height={180}
                    src={getPostImageUrl(article)}
                    width={320}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                </div>
                <div className='relative z-10 px-4 py-4'>
                  <h3 className='font-beatriceMedium text-lg font-semibold leading-relaxed text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400'>
                    {article.title}
                  </h3>
                </div>
                <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100' />
              </Link>
            </motion.div>
          );
        })}
      </div>
      <div
        className='flex translate-y-[100%] flex-col gap-5'
        style={{
          transform: `translateY(calc(${String(scrollProgress)}px - 150vh))`,
        }}
      >
        {group2.map((article, index) => {
          return (
            <motion.div
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={article.url}
                target='_blank'
                className='group relative flex w-full max-w-[320px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:scale-[1.02]'
              >
                <div className='absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 group-hover:opacity-100' />
                <div className='relative aspect-[16/9] w-full overflow-hidden'>
                  <Image
                    alt={article.title}
                    className='h-full w-full object-cover transition-transform duration-700 group-hover:scale-110'
                    height={180}
                    src={getPostImageUrl(article)}
                    width={320}
                  />
                  <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />
                </div>
                <div className='relative z-10 px-4 py-4'>
                  <h3 className='font-beatriceMedium text-lg font-semibold leading-relaxed text-white transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400'>
                    {article.title}
                  </h3>
                </div>
                <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-1000 group-hover:translate-x-full group-hover:opacity-100' />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
