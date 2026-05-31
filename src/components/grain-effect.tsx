import React from 'react';

export const GrainEffect = () => {
  return (
    <div className='fixed !z-[-1] flex h-screen w-full items-center justify-center overflow-hidden opacity-30'>
      <div
        className='grain-effect relative h-[100%] w-[100%]'
        style={{
          backgroundImage: `url(/grain-texture.png)`,
          backgroundPosition: '0px 0px',
          backgroundSize: '328px',
        }}
      />
    </div>
  );
};
