import Image from 'next/image';

import React from 'react';

import { useProjectsStore } from '~/lib/stores/projects';
import { cn } from '~/lib/utils';

import { cubicBezier } from 'framer-motion';
import { type MotionValue, motion, useTransform } from 'framer-motion';

import { type Project } from '.';

const easeInOutQuint = cubicBezier(0.12, 0, 0.39, 0);

interface ProjectItemProps extends Project {
  index: number;
  scrollYProgress: MotionValue<number>;
}

export const ProjectItem = ({
  title,
  index,
  scrollYProgress,
  image,
  coverImage,
}: ProjectItemProps) => {
  const { active, setActive } = useProjectsStore();

  const ONE_DIV = 1 / 12;

  const height = useTransform(
    scrollYProgress,
    [ONE_DIV * (index - 3), ONE_DIV * (index + 1), ONE_DIV * (index + 5)],
    [500, 600, 500],
    { ease: easeInOutQuint }
  );

  // const rotateY = useTransform(
  //   scrollYProgress,
  //   [
  //     ONE_DIV * (index - 4),
  //     ONE_DIV * index,
  //     ONE_DIV * (index + 1),
  //     ONE_DIV * (index + 2),
  //     ONE_DIV * (index + 5),
  //   ],
  //   [0, 20, 0, -20, 0],
  //   { ease: easeInOutQuint }
  // );
  // const rotateX = useTransform(
  //   scrollYProgress,
  //   [
  //     ONE_DIV * (index - 4),
  //     ONE_DIV * index,
  //     ONE_DIV * (index + 1),
  //     ONE_DIV * (index + 2),
  //     ONE_DIV * (index + 5),
  //   ],
  //   [0, 5, 0, 5, 0],
  //   { ease: easeInOutQuint }
  // );
  // const scaleX = useTransform(
  //   scrollYProgress,
  //   [
  //     ONE_DIV * (index - 4),
  //     ONE_DIV * index,
  //     ONE_DIV * (index + 1),
  //     ONE_DIV * (index + 2),
  //     ONE_DIV * (index + 5),
  //   ],
  //   [1, 1.1, 1, 1.1, 1]
  // );

  // const perspective = useTransform(
  //   scrollYProgress,
  //   [
  //     ONE_DIV * index - ONE_DIV / 4,
  //     ONE_DIV * (index + 1),
  //     ONE_DIV * (index + 3),
  //   ],
  //   [4000, 4000, -0]
  // );

  return (
    <motion.div
      key={`project-${String(index)}`}
      className='hidden w-[6rem] md:block'
      animate={{
        width: active === index ? '64rem' : '6rem',
        paddingInline: active === index ? '4rem' : 0,
        // rotateX: active === index ? 0 : undefined,
      }}
      style={{
        height,
        // perspective: active === index ? 0 : perspective,
        // rotateY: active === index ? undefined : rotateY,
        // rotateX: active === index ? undefined : rotateX,
        // scaleX: active === index ? undefined : scaleX,
      }}
      onClick={() => {
        if (active === index) {
          setActive(null);
        } else {
          setActive(null);
          setActive(index);
        }
      }}
    >
      <Image
        alt={title}
        height={600}
        src={active === index ? image : coverImage}
        width={600}
        className={cn(
          'h-full w-full',
          active === index ? 'object-cover' : 'object-scale-down'
        )}
      />
    </motion.div>
  );
};
