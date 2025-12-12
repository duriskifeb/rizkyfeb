'use client';

import { useEffect, useRef } from 'react';



import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';


// =============================
// UTILITIES
// =============================
type GL = Renderer['gl'];

function debounce<T extends (...args: any[]) => void>(func: T, wait: number) {
  let timeout: number;
  return function (this: any, ...args: Parameters<T>) {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

function lerp(p1: number, p2: number, t: number): number {
  return p1 + (p2 - p1) * t;
}

function getFontSize(font: string): number {
  const match = font.match(/(\d+)px/);
  return parseInt(match?.[1] ?? '30', 10);
}

function createTextTexture(
  gl: GL,
  text: string,
  font: string = 'bold 30px monospace',
  color: string = 'black'
): { texture: Texture; width: number; height: number } {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) throw new Error('Could not get 2d context');

  context.font = font;
  const metrics = context.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const fontSize = getFontSize(font);
  const textHeight = Math.ceil(fontSize * 1.2);

  canvas.width = textWidth + 20;
  canvas.height = textHeight + 20;

  context.font = font;
  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;

  return { texture, width: canvas.width, height: canvas.height };
}

// ===========================================
// TITLE CLASS
// ===========================================
class Title {
  mesh: Mesh;

  constructor({
    gl,
    plane,
    renderer,
    text,
    textColor = '#ffffff',
    font = 'bold 30px sans-serif',
  }: any) {
    const { texture, width, height } = createTextTexture(
      gl,
      text,
      font,
      textColor
    );

    const geometry = new Plane(gl);
    const program = new Program(gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if (color.a < 0.1) discard;
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: texture },
      },
      transparent: true,
    });

    this.mesh = new Mesh(gl, { geometry, program });

    const aspect = width / height;
    const textHeightScaled = plane.scale.y * 0.15;
    const textWidthScaled = textHeightScaled * aspect;

    this.mesh.scale.set(textWidthScaled, textHeightScaled, 1);
    this.mesh.position.y = -plane.scale.y * 0.6;

    this.mesh.setParent(plane);
  }
}

// ===========================================
// MEDIA CLASS (ISI FOTO + ANIMASI BEND)
// ===========================================
class Media {
  gl: any;
  plane: Mesh;
  program: Program;
  title: Title;
  x: number = 0;
  extra: number = 0;
  speed: number = 0;
  width: number = 0;
  widthTotal: number = 0;

  constructor({
    gl,
    renderer,
    scene,
    geometry,
    image,
    text,
    index,
    length,
    screen,
    viewport,
    bend,
    textColor,
    borderRadius,
  }: any) {
    this.gl = gl;

    const texture = new Texture(gl);

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = image;

    img.onload = () => {
      texture.image = img;
    };

    this.program = new Program(gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          gl_FragColor = color;
        }
      `,
      uniforms: {
        tMap: { value: texture },
      },
    });

    this.plane = new Mesh(gl, { geometry, program: this.program });
    this.plane.setParent(scene);

    this.title = new Title({
      gl,
      plane: this.plane,
      renderer,
      text,
      textColor,
    });

    this.onResize({ screen, viewport, index, length });
  }

  onResize({ screen, viewport, index, length }: any) {
    const scale = screen.height / 1500;
    this.plane.scale.y = (viewport.height * (900 * scale)) / screen.height;
    this.plane.scale.x = (viewport.width * (700 * scale)) / screen.width;

    this.width = this.plane.scale.x + 2;
    this.widthTotal = this.width * length;
    this.x = this.width * index;
  }

  update(scroll: any) {
    this.plane.position.x = this.x - scroll.current - this.extra;
  }
}

// ===========================================
// MAIN APP
// ===========================================
class App {
  renderer: Renderer;
  gl: any;
  camera: Camera;
  scene: Transform;
  plane: Plane;
  medias: Media[] = [];
  raf = 0;

  scroll = {
    current: 0,
    target: 0,
    last: 0,
    ease: 0.05,
  };

  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.container = container;

    this.renderer = new Renderer({ alpha: true });
    this.gl = this.renderer.gl;
    this.container.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl);
    this.camera.position.z = 20;

    this.scene = new Transform();

    this.plane = new Plane(this.gl, { widthSegments: 50, heightSegments: 50 });

    this.onResize();
    this.createItems();
    this.update();

    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('wheel', (e) => this.onWheel(e));
  }

  createItems() {
    const items = [
      { image: 'https://picsum.photos/seed/11/800/600', text: 'Gallery 1' },
      { image: 'https://picsum.photos/seed/22/800/600', text: 'Gallery 2' },
      { image: 'https://picsum.photos/seed/33/800/600', text: 'Gallery 3' },
      { image: 'https://picsum.photos/seed/44/800/600', text: 'Gallery 4' },
    ];

    const length = items.length * 2;

    items.concat(items).forEach((item, index) => {
      this.medias.push(
        new Media({
          gl: this.gl,
          renderer: this.renderer,
          scene: this.scene,
          geometry: this.plane,
          image: item.image,
          text: item.text,
          index,
          length,
          screen: this.screen,
          viewport: this.viewport,
          bend: 1,
          textColor: '#fff',
          borderRadius: 0.1,
        })
      );
    });
  }

  get screen() {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  get viewport() {
    const perspective = this.camera.position.z;
    const height =
      2 * Math.tan((this.camera.fov / 2) * (Math.PI / 180)) * perspective;
    const width =
      (height * this.renderer.gl.canvas.width) / this.renderer.gl.canvas.height;
    return { width, height };
  }

  onWheel(e: WheelEvent) {
    this.scroll.target += e.deltaY * 0.2;
  }

  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.perspective({
      aspect: window.innerWidth / window.innerHeight,
    });
  }

  update = () => {
    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    this.medias.forEach((m) => m.update(this.scroll));

    this.renderer.render({
      scene: this.scene,
      camera: this.camera,
    });

    this.scroll.last = this.scroll.current;
    this.raf = requestAnimationFrame(this.update);
  };
}

// ===========================================
// REACT WRAPPER
// ===========================================
export const CircularGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const app = new App(containerRef.current);

    return () => {
      cancelAnimationFrame(app.raf);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '80vh',
        position: 'relative',
      }}
    />
  );
};