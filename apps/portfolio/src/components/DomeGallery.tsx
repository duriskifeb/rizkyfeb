'use client';

// IMPORT NEXT IMAGE (Kunci agar tidak lemot loading)
import Image from 'next/image';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useGesture } from '@use-gesture/react';

// --- Types ---
type ImageItem = string | { src: string; alt?: string };

type DomeGalleryProps = {
  images?: ImageItem[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  className?: string;
};

type ItemDef = {
  src: string;
  alt: string;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

// --- Constants ---
const DEFAULTS = {
  maxVerticalRotationDeg: 15,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
};

// --- Helpers ---
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
  // Mengurangi jumlah kolom (xCols) agar tidak terlalu padat (Performa naik)
  // Sebelumnya 37 kolom, kita kurangi sedikit agar item lebih renggang dan ringan
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) return coords.map((c) => ({ ...c, src: '', alt: '' }));

  const normalizedImages = pool.map((image) => {
    if (typeof image === 'string') return { src: image, alt: '' };
    return { src: image.src || '', alt: image.alt || '' };
  });

  const usedImages: { src: string; alt: string }[] = Array.from(
    { length: totalSlots },
    (_, i) =>
      normalizedImages[i % normalizedImages.length] || { src: '', alt: '' }
  );

  // Simple shuffle logic removal for performance if needed, keeping mostly intact
  return coords.map((c, i) => {
    const img = usedImages[i];
    return {
      ...c,
      src: img?.src || '',
      alt: img?.alt || '',
    };
  });
}

// --- MAIN COMPONENT ---
export function DomeGallery({
  images = [],
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#0b0b0d',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = '400px',
  openedImageHeight = '400px',
  imageBorderRadius = '12px',
  openedImageBorderRadius = '12px',
  grayscale = false,
  className = '',
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);

  // State untuk mendeteksi interaksi agar bisa disable efek berat saat drag
  const [isInteracting, setIsInteracting] = useState(false);

  const lockedRadiusRef = useRef<number | null>(null);

  // --- OPTIMIZATION 1: USEMEMO untuk item builder ---
  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      // Menggunakan translateZ + Rotate. Browser modern sudah cukup pintar,
      // tapi performa tergantung GPU.
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ro = new ResizeObserver((entries) => {
      if (!entries || !entries[0]) return;
      const entry = entries[0];
      const cr = entry.contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      const aspect = w / h;

      let basis: number;
      switch (fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }

      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty(
        '--image-filter',
        grayscale ? 'grayscale(1)' : 'none'
      );

      applyTransform(rotationRef.current.x, rotationRef.current.y);
    });

    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
  ]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;

      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < 0.001 && Math.abs(vY) < 0.001) {
          inertiaRAF.current = null;
          setIsInteracting(false); // Stop interaction state
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      setIsInteracting(true); // Start interaction state
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        setIsInteracting(true); // User sedang drag -> Mode Performa
        const evt = event as PointerEvent;
        draggingRef.current = true;
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        startRotRef.current = { ...rotationRef.current };
        // Ubah cursor saat grabbing
        document.body.style.cursor = 'grabbing';
      },
      onDrag: ({
        event,
        last,
        velocity: velArr = [0, 0],
        direction: dirArr = [0, 0],
      }) => {
        if (
          focusedElRef.current ||
          !draggingRef.current ||
          !startPosRef.current
        )
          return;
        const evt = event as PointerEvent;
        const dxTotal = evt.clientX - startPosRef.current.x;
        const dyTotal = evt.clientY - startPosRef.current.y;

        if (!movedRef.current && dxTotal * dxTotal + dyTotal * dyTotal > 16)
          movedRef.current = true;

        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = startRotRef.current.y + dxTotal / dragSensitivity;

        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);

        if (last) {
          draggingRef.current = false;
          document.body.style.cursor = ''; // Reset cursor

          let isTap = false;
          if (startPosRef.current) {
            const dx = evt.clientX - startPosRef.current.x;
            const dy = evt.clientY - startPosRef.current.y;
            if (dx * dx + dy * dy <= 36) isTap = true;
          }

          let [vMagX, vMagY] = velArr;
          const [dirX, dirY] = dirArr;

          if (!isTap && (Math.abs(vMagX) > 0.005 || Math.abs(vMagY) > 0.005)) {
            startInertia(vMagX * dirX, vMagY * dirY);
          } else {
            setIsInteracting(false);
          }
          startPosRef.current = null;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  // --- OPTIMASI CSS STYLES ---
  // 1. Menggunakan 'will-change: transform' agar browser memisahkan layer GPU
  // 2. Mengurangi box-shadow saat drag (isInteracting)
  const cssStyles = `
    .sphere-root { 
      --radius: 600px; 
      --viewer-pad: 72px; 
      --circ: calc(var(--radius) * 3.14); 
      --rot-y: calc((360deg / var(--segments-x)) / 2); 
      --rot-x: calc((360deg / var(--segments-y)) / 2); 
      --item-width: calc(var(--circ) / var(--segments-x)); 
      --item-height: calc(var(--circ) / var(--segments-y)); 
    }
    .sphere-root * { box-sizing: border-box; }
    
    /* Hardware Acceleration Hints */
    .sphere, .sphere-item, .item__image { 
      transform-style: preserve-3d; 
      will-change: transform; 
    }
    
    .stage { 
      width: 100%; height: 100%; display: grid; place-items: center; 
      position: absolute; inset: 0; margin: auto; 
      perspective: calc(var(--radius) * 2); 
      perspective-origin: 50% 50%; 
    }
    
    .sphere { 
      transform: translateZ(calc(var(--radius) * -1)); 
      position: absolute; 
      /* Penting: Matikan pointer events pada sphere agar drag area (main) yang menangkap event */
      pointer-events: none;
    }
    
    .sphere-item { 
      width: calc(var(--item-width) * var(--item-size-x)); 
      height: calc(var(--item-height) * var(--item-size-y)); 
      position: absolute; 
      top: -999px; bottom: -999px; left: -999px; right: -999px; margin: auto; 
      transform-origin: 50% 50%; 
      backface-visibility: hidden; /* Sembunyikan belakang agar ringan */
      transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) translateZ(var(--radius)); 
    }
    
    .item__image { 
      position: absolute; 
      inset: 5px; /* Sedikit padding agar tidak nempel */
      border-radius: var(--tile-radius, 12px); 
      overflow: hidden; 
      background: #121212;
      border: 1px solid rgba(255, 255, 255, 0.1); 
      
      /* Optimasi: Matikan shadow berat saat interaksi */
      box-shadow: ${isInteracting ? 'none' : '0 4px 10px rgba(0,0,0,0.3)'};
      transition: box-shadow 0.2s, border-color 0.2s;
    }
  `;

  return (
    <div
      ref={rootRef}
      className={`sphere-root relative h-full w-full cursor-grab select-none active:cursor-grabbing ${className}`}
      style={
        {
          ['--segments-x' as any]: segments,
          ['--segments-y' as any]: segments,
          ['--overlay-blur-color' as any]: overlayBlurColor,
        } as React.CSSProperties
      }
    >
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />

      <main
        ref={mainRef}
        className='absolute inset-0 grid touch-none place-items-center overflow-hidden'
      >
        <div className='stage'>
          <div ref={sphereRef} className='sphere'>
            {items.map((it, i) => (
              <div
                key={`${it.x}-${it.y}-${i}`}
                className='sphere-item absolute m-auto'
                style={
                  {
                    ['--offset-x' as any]: it.x,
                    ['--offset-y' as any]: it.y,
                    ['--item-size-x' as any]: it.sizeX,
                    ['--item-size-y' as any]: it.sizeY,
                  } as React.CSSProperties
                }
              >
                <div className='item__image'>
                  {/* OPTIMASI UTAMA: Gunakan Next/Image */}
                  <Image
                    src={it.src}
                    alt={it.alt || `Gallery Image ${i}`}
                    fill // Mengisi container item__image
                    sizes='(max-width: 768px) 150px, 200px' // Download size kecil sesuai kebutuhan
                    className='pointer-events-none object-cover'
                    // Kurangi kualitas sedikit untuk performa, 75 standard
                    quality={60}
                    // Opsional: Priority hanya untuk beberapa gambar awal, sisanya lazy
                    priority={i < 10}
                  />
                  {/* Overlay Hitam untuk Vignette di tiap gambar */}
                  <div className='pointer-events-none absolute inset-0 bg-black/20' />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- OVERLAY FADE --- */}
        <div
          className='pointer-events-none absolute inset-0 z-[5]'
          style={{
            background: `radial-gradient(circle at center, transparent 40%, var(--overlay-blur-color) 100%)`,
          }}
        />
      </main>
    </div>
  );
}

export default DomeGallery;
