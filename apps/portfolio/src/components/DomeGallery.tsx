'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';

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
const DEFAULT_IMAGES: ImageItem[] = [
  'https://picsum.photos/id/10/600/600',
  'https://picsum.photos/id/20/600/600',
  'https://picsum.photos/id/30/600/600',
];

const DEFAULTS = {
  maxVerticalRotationDeg: 15,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35,
};

// --- Helpers ---
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(v, min), max);

const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;

const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function buildItems(pool: ImageItem[], seg: number): ItemDef[] {
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

  // Pastikan array ini bertipe fix object, bukan undefined
  const usedImages: { src: string; alt: string }[] = Array.from(
    { length: totalSlots },
    (_, i) =>
      normalizedImages[i % normalizedImages.length] || { src: '', alt: '' }
  );

  for (let i = 1; i < usedImages.length; i++) {
    const current = usedImages[i];
    const previous = usedImages[i - 1];

    if (current && previous && current.src === previous.src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        const candidate = usedImages[j];
        if (candidate && candidate.src !== current.src) {
          // --- BAGIAN FIX ---
          // Gunakan tanda seru (!) untuk memaksa TypeScript yakin nilainya ada
          const tmp = usedImages[i]!;
          usedImages[i] = usedImages[j]!;
          usedImages[j] = tmp;
          // ------------------
          break;
        }
      }
    }
  }

  return coords.map((c, i) => {
    const img = usedImages[i];
    return {
      ...c,
      src: img?.src || '',
      alt: img?.alt || '',
    };
  });
}

function computeItemBaseRotation(
  offsetX: number,
  offsetY: number,
  sizeX: number,
  sizeY: number,
  segments: number
) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

// --- MAIN COMPONENT ---
export function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = '#000000',
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const frameRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const viewerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scrimRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const focusedElRef = useRef<HTMLElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const originalTilePositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const cancelTapRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pointerTypeRef = useRef<'mouse' | 'pen' | 'touch'>('mouse');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const tapTargetRef = useRef<HTMLElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openingRef = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const openStartedAtRef = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lastDragEndAt = useRef(0);
  const scrollLockedRef = useRef(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add('dg-scroll-lock');
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
    scrollLockedRef.current = false;
    document.body.classList.remove('dg-scroll-lock');
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = (xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  };

  const lockedRadiusRef = useRef<number | null>(null);

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
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
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
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight,
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
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        const evt = event as PointerEvent;
        draggingRef.current = true;
        startPosRef.current = { x: evt.clientX, y: evt.clientY };
        startRotRef.current = { ...rotationRef.current };
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
          }
          startPosRef.current = null;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: false } }
  );

  const cssStyles = `
    .sphere-root { --radius: 520px; --viewer-pad: 72px; --circ: calc(var(--radius) * 3.14); --rot-y: calc((360deg / var(--segments-x)) / 2); --rot-x: calc((360deg / var(--segments-y)) / 2); --item-width: calc(var(--circ) / var(--segments-x)); --item-height: calc(var(--circ) / var(--segments-y)); }
    .sphere-root * { box-sizing: border-box; }
    .sphere, .sphere-item, .item__image { transform-style: preserve-3d; }
    .stage { width: 100%; height: 100%; display: grid; place-items: center; position: absolute; inset: 0; margin: auto; perspective: calc(var(--radius) * 2); perspective-origin: 50% 50%; }
    .sphere { transform: translateZ(calc(var(--radius) * -1)); will-change: transform; position: absolute; }
    .sphere-item { width: calc(var(--item-width) * var(--item-size-x)); height: calc(var(--item-height) * var(--item-size-y)); position: absolute; top: -999px; bottom: -999px; left: -999px; right: -999px; margin: auto; transform-origin: 50% 50%; backface-visibility: hidden; transition: transform 300ms; transform: rotateY(calc(var(--rot-y) * (var(--offset-x) + ((var(--item-size-x) - 1) / 2)) + var(--rot-y-delta, 0deg))) rotateX(calc(var(--rot-x) * (var(--offset-y) - ((var(--item-size-y) - 1) / 2)) + var(--rot-x-delta, 0deg))) translateZ(var(--radius)); }
    .item__image { position: absolute; inset: 10px; border-radius: var(--tile-radius, 12px); overflow: hidden; cursor: grab; backface-visibility: hidden; transition: transform 300ms; transform: translateZ(0); box-shadow: 0 0 10px rgba(0,0,0,0.5); }
    .item__image:active { cursor: grabbing; }
  `;

  return (
    <div
      ref={rootRef}
      className={`sphere-root relative h-full w-full ${className}`}
      style={
        {
          ['--segments-x' as any]: segments,
          ['--segments-y' as any]: segments,
        } as React.CSSProperties
      }
    >
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <main
        ref={mainRef}
        className='absolute inset-0 grid place-items-center overflow-hidden bg-transparent'
      >
        <div className='stage'>
          <div ref={sphereRef} className='sphere'>
            {items.map((it, i) => (
              <div
                key={`${it.x}-${it.y}-${i}`}
                className='sphere-item absolute m-auto'
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                style={
                  {
                    ['--offset-x' as any]: it.x,
                    ['--offset-y' as any]: it.y,
                    ['--item-size-x' as any]: it.sizeX,
                    ['--item-size-y' as any]: it.sizeY,
                  } as React.CSSProperties
                }
              >
                <div className='item__image bg-neutral-800'>
                  <img
                    src={it.src}
                    alt={it.alt}
                    className='pointer-events-none h-full w-full object-cover'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default DomeGallery;
