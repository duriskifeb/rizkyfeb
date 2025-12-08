import Image from 'next/image';

import React from 'react';

import CityImage from 'public/city.webp';

export const City = () => {
  return (
    <div className='relative'>
      <div className='city-glow absolute top-16 h-12 w-full translate-y-1/2 border-4 border-white' />
      <div className='overflow-hidden'>
        <Image
          priority
          alt='city'
          className='translate-y-1/5 min-w-[1900px]'
          src={CityImage}
          placeholder={
            (CityImage.blurDataURL as `data:image/${string}` | undefined) ??
            'blur'
          }
          style={{
            maskImage: 'url(/city-mask.svg)',
            maskSize: '100% 100%',
            overflowClipMargin: 'content-box',
          }}
        />
      </div>
    </div>
  );
};
