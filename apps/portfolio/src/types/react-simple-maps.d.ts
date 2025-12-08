declare module 'react-simple-maps' {
  import type { ReactNode } from 'react';

  export interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
  }

  export interface ComposableMapProps {
    projectionConfig?: ProjectionConfig;
    width?: number;
    height?: number;
    className?: string;
    children?: ReactNode;
  }

  export interface GeographyData {
    rsmKey: string;
    [key: string]: unknown;
  }

  export interface GeographyProps {
    geography: GeographyData;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    fill?: string;
    stroke?: string;
    className?: string;
  }

  export interface MarkerProps {
    coordinates: [number, number];
    children?: ReactNode;
  }

  export interface ZoomableGroupProps {
    zoom?: number;
    center?: [number, number];
    onMoveStart?: (position: { coordinates: [number, number]; zoom: number }) => void;
    onMoveEnd?: (position: { coordinates: [number, number]; zoom: number }) => void;
    children?: ReactNode;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<{ geography: string; children: (props: { geographies: GeographyData[] }) => ReactNode }>;
  export const Geography: React.FC<GeographyProps>;
  export const Marker: React.FC<MarkerProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
}

