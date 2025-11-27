export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 250,
  slow: 400,
  slower: 600,
} as const;

export const EASING = {
  spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.6, 1)',
  bounce: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
} as const;

export const STAGGER_DELAYS = {
  xs: 50,
  sm: 75,
  md: 100,
  lg: 150,
  xl: 200,
} as const;

export function getStaggerDelay(index: number, delay: number = STAGGER_DELAYS.md): number {
  return index * delay;
}

export function getStaggerStyle(index: number, delay: number = STAGGER_DELAYS.md) {
  return {
    animationDelay: `${getStaggerDelay(index, delay)}ms`,
  };
}

export const TRANSITIONS = {
  fade: 'opacity',
  scale: 'transform',
  slide: 'transform',
  all: 'all',
  colors: 'background-color, border-color, color',
  shadow: 'box-shadow',
} as const;
