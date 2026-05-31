'use client';

import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────────────────
type GalleryProps = {
  images?: string[];
  className?: string;
  fit?: number;          // kept for API compatibility (unused)
  minRadius?: number;    // kept for API compatibility (unused)
  maxRadius?: number;    // kept for API compatibility (unused)
};

// ─── Single infinite marquee row ─────────────────────────────────────────────
const MarqueeRow = ({
  images,
  reverse = false,
  speed = 35,
}: {
  images: string[];
  reverse?: boolean;
  speed?: number;
}) => {
  if (images.length === 0) return null;

  // Duplicate images for seamless infinite loop
  const doubled = [...images, ...images];

  return (
    <div className='flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]'>
      <div
        className={`flex shrink-0 gap-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ animationDuration: `${speed}s`, width: 'max-content' }}
      >
        {doubled.map((src, i) => (
          <div
            key={i}
            className='relative h-44 w-64 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#033D2D]'
          >
            <Image
              src={src}
              alt={`Gallery image ${(i % images.length) + 1}`}
              fill
              className='object-cover transition-transform duration-700 hover:scale-105'
              sizes='256px'
              quality={65}
            />
            {/* Subtle dark overlay */}
            <div className='pointer-events-none absolute inset-0 bg-black/25' />
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Main Gallery Component ───────────────────────────────────────────────────
export function DomeGallery({
  images = [],
  className = '',
}: GalleryProps) {
  if (images.length === 0) return null;

  // Split images into 3 rows (round-robin)
  const row1 = images.filter((_, i) => i % 3 === 0);
  const row2 = images.filter((_, i) => i % 3 === 1);
  const row3 = images.filter((_, i) => i % 3 === 2);

  return (
    <div className={`flex flex-col gap-4 py-4 ${className}`}>
      <MarqueeRow images={row1.length > 0 ? row1 : images} speed={38} />
      <MarqueeRow images={row2.length > 0 ? row2 : images} reverse speed={30} />
      <MarqueeRow images={row3.length > 0 ? row3 : images} speed={34} />
    </div>
  );
}

export default DomeGallery;
