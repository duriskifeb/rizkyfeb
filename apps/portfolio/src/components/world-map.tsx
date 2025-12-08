'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import * as d3 from 'd3';
import type { FeatureCollection, Feature } from 'geojson';
import type { HackathonData } from './hackathons';

interface WorldMapProps {
  hackathons: HackathonData[];
}

// Get color based on prize amount
const getPinColor = (amount: string): string => {
  const numAmount = Number.parseInt(amount.replace(/[^0-9]/g, ''), 10) || 0;
  if (numAmount >= 10000) return '#FFD700'; // Gold
  if (numAmount >= 5000) return '#FF8C00'; // Orange
  if (numAmount >= 2000) return '#3B82F6'; // Blue
  if (numAmount >= 1000) return '#8B5CF6'; // Purple
  return '#22C55E'; // Green
};

export const WorldMap: React.FC<WorldMapProps> = ({ hackathons }) => {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ group: HackathonData[]; coordinates: [number, number] } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Group hackathons by location
  const locationGroups = useMemo(() => {
    const groups = new Map<string, HackathonData[]>();
    hackathons.forEach((hackathon) => {
      const key = `${hackathon.coordinates[0]},${hackathon.coordinates[1]}`;
      if (!groups.has(key)) {
        groups.set(key, []);
      }
      const existingGroup = groups.get(key);
      if (existingGroup) {
        existingGroup.push(hackathon);
      } else {
        groups.set(key, [hackathon]);
      }
    });
    return groups;
  }, [hackathons]);

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount}`;
  };

  // Globe rendering logic
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const container = canvas.parentElement;
    if (!container) return;

    const containerWidth = container.clientWidth;
    const containerHeight = Math.min(containerWidth * 0.75, 800);
    const radius = Math.min(containerWidth, containerHeight) / 2.5;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = containerWidth * dpr;
    canvas.height = containerHeight * dpr;
    canvas.style.width = `${containerWidth}px`;
    canvas.style.height = `${containerHeight}px`;
    context.scale(dpr, dpr);

    // Create projection
    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    let landFeatures: FeatureCollection | null = null;
    const rotation = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.15;

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i] as [number, number];
        const [xj, yj] = polygon[j] as [number, number];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point: [number, number], feature: Feature): boolean => {
      const geometry = feature.geometry;
      if (geometry.type === 'Polygon') {
        const coordinates = geometry.coordinates as number[][][];
        const outerRing = coordinates[0];
        if (!outerRing || !pointInPolygon(point, outerRing)) return false;
        for (let i = 1; i < coordinates.length; i++) {
          const hole = coordinates[i];
          if (hole && pointInPolygon(point, hole)) return false;
        }
        return true;
      }
      if (geometry.type === 'MultiPolygon') {
        const multiPolygonCoords = geometry.coordinates as unknown as number[][][][];
        for (const polygon of multiPolygonCoords) {
          const outerPolygon = polygon[0];
          if (outerPolygon && pointInPolygon(point, outerPolygon)) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              const hole = polygon[i];
              if (hole && pointInPolygon(point, hole)) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
      }
      return false;
    };

    const generateDotsInPolygon = (feature: Feature, dotSpacing = 16) => {
      const dots: [number, number][] = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const stepSize = dotSpacing * 0.08;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point: [number, number] = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }
      return dots;
    };

    const allDots: [number, number][] = [];

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight);
      const currentScale = projection.scale() || radius;
      const scaleFactor = Number(currentScale) / Number(radius);

      // Draw ocean (globe background) - transparent
      context.beginPath();
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = 'transparent';
      context.fill();
      context.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      context.lineWidth = Number(2 * scaleFactor);
      context.stroke();

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        context.lineWidth = Number(scaleFactor);
        context.globalAlpha = 0.25;
        context.stroke();
        context.globalAlpha = 1;

        // Draw land outlines
        context.beginPath();
        landFeatures.features.forEach((feature) => {
          path(feature);
        });
        context.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        context.lineWidth = Number(scaleFactor);
        context.stroke();

        // Draw halftone dots
        allDots.forEach(([lng, lat]) => {
          const projected = projection([lng, lat]);
          if (
            projected &&
            projected[0] >= 0 &&
            projected[0] <= containerWidth &&
            projected[1] >= 0 &&
            projected[1] <= containerHeight
          ) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = 'rgba(153, 153, 153, 0.4)';
            context.fill();
          }
        });
      }

      // Draw hackathon pins
      locationGroups.forEach((group, key) => {
        const coords = key.split(',').map(Number);
        const lng = coords[0];
        const lat = coords[1];
        if (lng === undefined || lat === undefined) return;
        
        const sortedGroup = group.sort((a, b) => b.date.getTime() - a.date.getTime());
        const latestHackathon = sortedGroup[0];
        
        if (!latestHackathon) return;

        const projected = projection([lng, lat]);
        if (!projected?.[0] || !projected[1]) return;

        const projX = Number(projected[0]);
        const projY = Number(projected[1]);
        const count = group.length;
        const totalPrize = group.reduce((sum, h) => {
          const amount = h.amount.replace(/[^0-9]/g, '');
          return sum + (amount ? Number.parseInt(amount, 10) : 0);
        }, 0);

        const pinColor = getPinColor(latestHackathon.amount);
        const pinSize = Math.min(6 + count * 1.5 + (totalPrize / 2000), 16) * scaleFactor;
        const isHovered = hoveredPin === key;

        // Outer glow
        if (isHovered) {
          const hex = pinColor.replace('#', '');
          const r = Number.parseInt(hex.substring(0, 2), 16);
          const g = Number.parseInt(hex.substring(2, 4), 16);
          const b = Number.parseInt(hex.substring(4, 6), 16);
          context.beginPath();
          context.arc(projX, projY, pinSize + 8, 0, 2 * Math.PI);
          context.fillStyle = `rgba(${String(r)}, ${String(g)}, ${String(b)}, 0.3)`;
          context.fill();
        }

        // Pulse ring
        context.beginPath();
        context.arc(projX, projY, pinSize + 4, 0, 2 * Math.PI);
        context.strokeStyle = pinColor;
        context.lineWidth = Number(2 * scaleFactor);
        context.globalAlpha = 0.5;
        context.stroke();
        context.globalAlpha = 1;

        // Main pin
        context.beginPath();
        context.arc(projX, projY, pinSize, 0, 2 * Math.PI);
        context.fillStyle = pinColor;
        context.fill();
        context.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        context.lineWidth = Number(2 * scaleFactor);
        context.stroke();

        // Count badge
        if (count > 1) {
          context.fillStyle = 'white';
          context.font = `bold ${String(Math.min(10 + count, 14) * scaleFactor)}px sans-serif`;
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillText(count.toString(), projX, projY);
        }
      });
    };

    const loadWorldData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          'https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json'
        );
        if (!response.ok) throw new Error('Failed to load land data');

        const data = await response.json() as FeatureCollection;
        landFeatures = data;

        allDots.length = 0;
        landFeatures.features.forEach((feature) => {
          const dots = generateDotsInPolygon(feature, 16);
          dots.forEach((dot) => {
            allDots.push(dot);
          });
        });

        render();
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load land map data');
        setIsLoading(false);
      }
    };

    const rotate = () => {
      if (autoRotate) {
        rotation[0] = (rotation[0] ?? 0) + rotationSpeed;
        projection.rotate(rotation as [number, number, number]);
        render();
      }
    };

    const rotationTimer = d3.timer(rotate);

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation = [...rotation];
      const rect = canvas.getBoundingClientRect();

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const sensitivity = 0.5;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = (startRotation[0] ?? 0) + dx * sensitivity;
        rotation[1] = (startRotation[1] ?? 0) - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation as [number, number, number]);
        render();

        // Check for pin hover during drag
        const mouseX = moveEvent.clientX - rect.left;
        const mouseY = moveEvent.clientY - rect.top;

        const hoveredKey = Array.from(locationGroups.entries()).find(([key]) => {
          const coords = key.split(',').map(Number);
          const lng = coords[0];
          const lat = coords[1];
          if (lng === undefined || lat === undefined) return false;
          const projected = projection([lng, lat]);
          if (projected) {
            const projX = Number(projected[0]);
            const projY = Number(projected[1]);
            const distance = Math.sqrt(
              Math.pow(projX - mouseX, 2) + Math.pow(projY - mouseY, 2)
            );
            return distance < 20;
          }
          return false;
        });

        if (hoveredKey) {
          const [key, group] = hoveredKey;
          const coords = key.split(',').map(Number);
          const lng = coords[0] ?? 0;
          const lat = coords[1] ?? 0;
          setHoveredPin(key);
          setSelectedLocation({ group, coordinates: [lng, lat] });
          setTooltipPosition({ x: moveEvent.clientX, y: moveEvent.clientY });
        } else {
          setHoveredPin(null);
          setSelectedLocation(null);
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        setTimeout(() => {
          autoRotate = true;
        }, 2000);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
      const currentScale = projection.scale() || radius;
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, currentScale * scaleFactor));
      projection.scale(newRadius);
      render();
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;

      const hoveredKey = Array.from(locationGroups.entries()).find(([key]) => {
        const coords = key.split(',').map(Number);
        const lng = coords[0];
        const lat = coords[1];
        if (lng === undefined || lat === undefined) return false;
        const projected = projection([lng, lat]);
        if (projected) {
          const projX = Number(projected[0]);
          const projY = Number(projected[1]);
          const distance = Math.sqrt(
            Math.pow(projX - mouseX, 2) + Math.pow(projY - mouseY, 2)
          );
          return distance < 20;
        }
        return false;
      });

      if (hoveredKey) {
        const [key, group] = hoveredKey;
        const coords = key.split(',').map(Number);
        const lng = coords[0] ?? 0;
        const lat = coords[1] ?? 0;
        setHoveredPin(key);
        setSelectedLocation({ group, coordinates: [lng, lat] });
        setTooltipPosition({ x: event.clientX, y: event.clientY });
      } else {
        setHoveredPin(null);
        setSelectedLocation(null);
      }
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('wheel', handleWheel);
    canvas.addEventListener('mousemove', handleMouseMove);

    loadWorldData().catch((err: unknown) => {
      console.error('Failed to load world data:', err);
    });

    return () => {
      rotationTimer.stop();
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('wheel', handleWheel);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [locationGroups, hoveredPin]);

  return (
    <div
      ref={ref}
      className='relative z-[2] min-h-screen py-24 overflow-hidden'
      id='world-map'
    >
      {/* Animated background particles */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            className='absolute rounded-full bg-white/5'
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${String(Math.random() * 100)}%`,
              top: `${String(Math.random() * 100)}%`,
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className='relative mx-auto max-w-7xl px-4 sm:px-6'>
        {/* Header */}
        <motion.div
          className='mb-12 text-center'
          initial={{ opacity: 0, y: -30 }}
          style={{ opacity }}
          transition={{ duration: 0.8, stiffness: 100, type: 'spring' }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className='mb-6 font-elgocAlt text-[4rem] sm:text-[6rem] md:text-[8rem] leading-[0.9] text-white'>
            Victory Map
          </h2>
          <p className='font-beatriceMedium text-lg text-white/60'>
            Hackathon Locations & Wins
          </p>
        </motion.div>

        {/* Globe Container */}
        <motion.div
          className='relative overflow-hidden'
          initial={{ opacity: 0, scale: 0.95 }}
          style={{ opacity }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <div className='relative w-full' style={{ aspectRatio: '4/3', minHeight: '600px' }}>
            {error ? (
              <div className='flex items-center justify-center h-full p-8'>
                <div className='text-center'>
                  <p className='text-red-400 font-semibold mb-2'>Error loading Earth visualization</p>
                  <p className='text-white/60 text-sm'>{error}</p>
                </div>
              </div>
            ) : (
              <>
                <canvas
                  ref={canvasRef}
                  className='w-full h-full cursor-grab active:cursor-grabbing bg-transparent'
                />
                {isLoading && (
                  <div className='absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm'>
                    <div className='text-white/70'>Loading globe...</div>
                  </div>
                )}
                <div className='absolute bottom-4 left-4 text-xs text-white/50 px-3 py-2 rounded-lg bg-black/50 backdrop-blur-md'>
                  Drag to rotate • Scroll to zoom
                </div>
              </>
            )}
          </div>

          {/* Enhanced Tooltip */}
          <AnimatePresence>
            {selectedLocation ? (
              <motion.div
                className='fixed z-50 pointer-events-none'
                style={{
                  left: typeof window !== 'undefined' ? Math.min(tooltipPosition.x + 15, window.innerWidth - 320) : tooltipPosition.x + 15,
                  top: Math.max(tooltipPosition.y - 10, 10),
                }}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className='rounded-xl border border-white/20 bg-black/95 backdrop-blur-md p-4 shadow-2xl max-w-xs'>
                  <div className='mb-3 pb-3 border-b border-white/10'>
                    <h3 className='font-beatriceMedium text-sm font-bold text-white mb-1'>
                      {selectedLocation.group.length > 1 
                        ? `${String(selectedLocation.group.length)} Hackathons` 
                        : selectedLocation.group[0]?.name ?? 'Unknown'}
                    </h3>
                    {selectedLocation.group.length === 1 && selectedLocation.group[0] ? (
                      <p className='text-xs text-white/60'>{selectedLocation.group[0].prize}</p>
                    ) : null}
                  </div>

                  {selectedLocation.group.length > 1 ? (
                    <div className='space-y-2 max-h-64 overflow-y-auto pr-2'>
                      {selectedLocation.group.map((hackathon, idx) => (
                        <div key={`${hackathon.name}-${String(idx)}`} className='flex items-start justify-between gap-2 p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors'>
                          <div className='flex-1 min-w-0'>
                            <p className='text-xs font-semibold text-white truncate'>{hackathon.name}</p>
                            <p className='text-xs text-white/60'>{hackathon.prize}</p>
                            <div className='flex items-center gap-2 mt-1'>
                              <span className='text-xs text-white/50'>{hackathon.track}</span>
                              <span className='text-xs font-bold text-blue-400'>{hackathon.amount}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  
                  {selectedLocation.group.length === 1 && selectedLocation.group[0] ? (
                    <div className='flex items-center justify-between'>
                      <span className='text-xs text-white/50'>{selectedLocation.group[0].track}</span>
                      <span className='text-xs font-semibold text-blue-400'>
                        {selectedLocation.group[0].amount}
                      </span>
                    </div>
                  ) : null}
                  
                  {selectedLocation.group.length > 1 && (
                    <div className='mt-3 pt-3 border-t border-white/10'>
                      <div className='flex items-center justify-between text-xs'>
                        <span className='text-white/60'>Total Prize:</span>
                        <span className='font-bold text-green-400'>
                          {formatCurrency(
                            selectedLocation.group.reduce((sum, h) => {
                              const amount = h.amount.replace(/[^0-9]/g, '');
                              return sum + (amount ? Number.parseInt(amount, 10) : 0);
                            }, 0)
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>

          {/* Legend */}
          <div className='absolute top-4 right-4 flex flex-col gap-2'>
            <div className='flex flex-wrap gap-2 justify-end'>
              <div className='flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 backdrop-blur-md px-3 py-2'>
                <div className='w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400' />
                <span className='text-xs text-white/70'>&lt; $1K</span>
              </div>
              <div className='flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 backdrop-blur-md px-3 py-2'>
                <div className='w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400' />
                <span className='text-xs text-white/70'>$1K-$2K</span>
              </div>
              <div className='flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 backdrop-blur-md px-3 py-2'>
                <div className='w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400' />
                <span className='text-xs text-white/70'>$2K-$5K</span>
              </div>
              <div className='flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 backdrop-blur-md px-3 py-2'>
                <div className='w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-400' />
                <span className='text-xs text-white/70'>$5K-$10K</span>
              </div>
              <div className='flex items-center gap-2 rounded-lg border border-white/10 bg-black/70 backdrop-blur-md px-3 py-2'>
                <div className='w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400' />
                <span className='text-xs text-white/70'>&gt; $10K</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
