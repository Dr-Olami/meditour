import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { initAnimations } from './engine';

/**
 * Initialise GSAP animations for elements with `data-anim` attributes.
 * Feature developers write no GSAP code.
 */
export function useAnimations(scope: RefObject<HTMLElement>) {
  const triggered = useRef(false);

  useEffect(() => {
    if (triggered.current || typeof window === 'undefined' || !scope.current) return;

    triggered.current = true;
    const animation = initAnimations(scope.current);

    return () => {
      animation.revert();
    };
  }, [scope]);
}
