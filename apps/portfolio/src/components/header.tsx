'use client';

import Image from 'next/image';

import { useEffect, useMemo, useState } from 'react';

import { getParticles } from '~/lib/particles';

import { type Container } from '@tsparticles/engine';
import { Particles, initParticlesEngine } from '@tsparticles/react';
import HeaderImage from 'public/header.svg';
import { loadFull } from 'tsparticles';
import { useScreen } from 'usehooks-ts';

export const Header = () => {
  const screen = useScreen();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    })
      .then(() => {
        setInit(true);
      })
      .catch((e: unknown) => console.log(e));
  }, []);

  const particlesLoaded = async (container?: Container) => {
    const c = container;
    await Promise.resolve(c);
  };

  const options = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- can be undefined
    if (screen) {
      return getParticles(screen.width);
    }
  }, [screen]);

  if (init && options) {
    return (
      <div className='z-[0] px-3 lg:px-0'>
        <div className='relative mx-auto my-[10rem] min-h-[112px] w-full max-w-5xl'>
          <Particles
            className='particle-mask absolute left-0 top-0 z-[-1] w-full overflow-clip'
            id='tsparticles'
            options={options}
            particlesLoaded={particlesLoaded}
          />
          <Image
            alt='Header'
            className='absolute z-[-1] w-full'
            src={HeaderImage as unknown as string}
          />
        </div>
      </div>
    );
  }

  return null;
};
