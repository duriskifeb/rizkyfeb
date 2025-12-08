'use client';

import React, { type PropsWithChildren } from 'react';

import { ReactLenis } from 'lenis/react';

export const SmoothScroll = ({ children }: PropsWithChildren) => {
  return <ReactLenis root>{children}</ReactLenis>;
};
