'use client';

import React, { type ComponentProps, useRef, useState } from 'react';

import { data } from '~/lib/data';
import { cn } from '~/lib/utils';

import { useScroll, useTransform } from 'framer-motion';

export const Interests = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- safe to assume ref is not null
  const ref = useRef<HTMLDivElement>(null!);

  const interests = data.interests.interests;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const value = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [scrollProgress, setScrollProgress] = useState(0);

  value.on('change', (value) => {
    setScrollProgress(value);
  });

  // Positions and animations for chat bubbles - 10 bubbles with better spacing
  const bubbleConfigs = [
    { className: 'absolute -left-2 top-12 z-[4] sm:-left-24', rotation: { initial: -15, final: -20 }, transform: { x: { direction: 'left' as const, step: 200 }, y: { direction: 'top' as const, step: 100 } } },
    { className: 'absolute -left-24 bottom-12 z-[4]', rotation: { initial: -15, final: 10 }, transform: { x: { direction: 'left' as const, step: 200 }, y: { direction: 'top' as const, step: 100 } } },
    { className: 'absolute -right-24 top-4 z-[4]', rotation: { initial: 5, final: 40 }, transform: { x: { direction: 'left' as const, step: 50 }, y: { direction: 'top' as const, step: 200 } } },
    { className: 'absolute -right-24 top-[40%] z-[4]', rotation: { initial: 5, final: -60 }, transform: { x: { direction: 'right' as const, step: 400 }, y: { direction: 'top' as const, step: 0 } } },
    { className: 'absolute bottom-0 left-1/3 z-[4]', rotation: { initial: 0, final: 60 }, transform: { x: { direction: 'right' as const, step: 200 }, y: { direction: 'top' as const, step: 400 } } },
    { className: 'absolute -bottom-16 -left-96 z-[4] sm:-left-[28rem]', rotation: { initial: 10, final: -30 }, transform: { x: { direction: 'right' as const, step: 150 }, y: { direction: 'bottom' as const, step: 100 } } },
    { className: 'absolute top-[55%] -right-20 z-[4]', rotation: { initial: -10, final: 25 }, transform: { x: { direction: 'right' as const, step: 300 }, y: { direction: 'top' as const, step: 150 } } },
    { className: 'absolute bottom-[15%] -left-20 z-[4]', rotation: { initial: 20, final: -15 }, transform: { x: { direction: 'left' as const, step: 250 }, y: { direction: 'bottom' as const, step: 200 } } },
    { className: 'absolute top-[10%] -right-32 z-[4]', rotation: { initial: -5, final: 35 }, transform: { x: { direction: 'right' as const, step: 180 }, y: { direction: 'bottom' as const, step: 120 } } },
    { className: 'absolute bottom-[25%] right-[8%] z-[4]', rotation: { initial: -20, final: 20 }, transform: { x: { direction: 'right' as const, step: 280 }, y: { direction: 'bottom' as const, step: 160 } } },
  ];

  return (
    <div
      ref={ref}
      className='flex h-screen flex-col items-center justify-center gap-8 overflow-x-clip sm:gap-12'
      id='interests'
    >
      <div className='relative'>
        <div className='text-center font-elgocAlt text-[4rem] leading-[0.9] sm:text-[6rem]'>
          {data.interests.title}
        </div>
        {interests.map((interest, index) => {
          const config = bubbleConfigs[index] ?? {
            className: 'absolute top-1/2 left-1/2 z-[4]',
            rotation: { initial: 0, final: 0 },
            transform: { x: { direction: 'left' as const, step: 0 }, y: { direction: 'top' as const, step: 0 } },
          };
          
          return (
        <ChatBubble
              key={`interest-${String(index)}`}
              className={config.className}
              rotation={config.rotation}
          scrollProgress={scrollProgress}
              text={interest}
              transform={config.transform}
        />
          );
        })}
      </div>
      <p className='max-w-lg whitespace-pre-line px-3 text-center text-sm sm:text-start sm:text-base'>
        {data.interests.description}
      </p>
    </div>
  );
};

interface ChatBubbleProps extends ComponentProps<'div'> {
  text?: string;
  scrollProgress: number;
  rotation: {
    initial: number;
    final: number;
  };
  transform: {
    x: {
      direction: 'left' | 'right';
      step: number;
    };
    y: {
      direction: 'top' | 'bottom';
      step: number;
    };
  };
}

const ChatBubble = ({
  text,
  scrollProgress,
  rotation,
  transform,
  className,
  ...props
}: ChatBubbleProps) => {
  const xDirection = transform.x.direction === 'left' ? -1 : 1;
  const yDirection = transform.y.direction === 'top' ? -1 : 1;

  return (
    <div
      className={cn(
        'rounded-3xl p-2 text-xs leading-none text-white shadow-[0_0_50px_2px_rgba(103,154,204,0.3)] sm:p-5 sm:text-sm',
        className
      )}
      style={{
        background: 'linear-gradient(180deg, #3e7fff, #50a8ff)',
        transform: `rotate(${String(rotation.initial + scrollProgress * (rotation.final - rotation.initial))}deg) translateX(${String(scrollProgress * xDirection * transform.x.step)}px) translateY(${String(yDirection * scrollProgress * transform.y.step)}px)`,
      }}
      {...props}
    >
      {text ?? 'Chat bubble'}
    </div>
  );
};
