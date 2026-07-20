import type { gsap } from 'gsap';

export interface MotionPreset {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
}

export const fadeInUp: MotionPreset = {
  from: { opacity: 0, y: 24 },
  to: { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
};

export const staggerChildren: MotionPreset = {
  from: { opacity: 0, y: 16 },
  to: {
    opacity: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
  },
};

export const scrollReveal: MotionPreset = {
  from: { opacity: 0, y: 32 },
  to: {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
  },
};

export const counterUp: MotionPreset = {
  from: { innerText: '0' },
  to: {
    innerText: '100',
    duration: 1.5,
    ease: 'power1.out',
    snap: { innerText: 1 },
  },
};

export const heroParallax: MotionPreset = {
  from: { y: 0 },
  to: {
    y: -60,
    ease: 'none',
  },
};

export const cardHoverLift = {
  y: -8,
  duration: 0.25,
  ease: 'power2.out',
};

export const timelineDraw: MotionPreset = {
  from: { scaleY: 0, transformOrigin: 'top center' },
  to: {
    scaleY: 1,
    duration: 1,
    ease: 'power2.out',
  },
};

export const staggerCards: MotionPreset = {
  from: { opacity: 0, y: 24, scale: 0.98 },
  to: {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.6,
    stagger: 0.08,
    ease: 'power3.out',
  },
};

export const headlineReveal: MotionPreset = {
  from: { opacity: 0, y: 20, rotateX: -10 },
  to: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    duration: 0.6,
    stagger: 0.04,
    ease: 'power3.out',
  },
};

export const pressButton = {
  down: { scale: 0.96, duration: 0.1, ease: 'power2.out' },
  up: { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.5)' },
};
