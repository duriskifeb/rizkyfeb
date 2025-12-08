import Image from 'next/image';

import React from 'react';

import { useProjectsStore } from '~/lib/stores/projects';
import { cn } from '~/lib/utils';

import { cubicBezier } from 'framer-motion';
import { type MotionValue, motion, useTransform } from 'framer-motion';

import { type Project } from '.';

const easeSine = cubicBezier(0.12, 0, 0.39, 0);

interface ProjectItemProps extends Project {
  index: number;
  scrollYProgress: MotionValue<number>;
}

export const ProjectItemMobile = ({
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
    [300, 400, 300],
    { ease: easeSine }
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
  //   { ease: easeSine }
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
  //   { ease: easeSine }
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
      className='block w-[4rem] md:hidden'
      animate={{
        width: active === index ? '22rem' : '4rem',
        paddingInline: active === index ? '1rem' : '0',
        // rotateX: active === index ? 0 : undefined,
        // rotateY: active === index ? 0 : undefined,
      }}
      style={{
        height,
        // perspective,
        // rotateY,
        // rotateX,
        // scaleX,
      }}
      onClick={() => {
        if (active === index) {
          setActive(null);
        } else {
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
