import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  fadeInUp,
  scrollReveal,
  staggerChildren,
  counterUp,
  timelineDraw,
  cardHoverLift,
  staggerCards,
  headlineReveal,
  pressButton,
} from './presets';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface AnimationScope {
  revert: () => void;
}

/**
 * Wrap each word of an element's text in a span so it can be animated
 * without a paid SplitText plugin.
 */
function splitWords(el: HTMLElement): HTMLSpanElement[] {
  const words = el.textContent?.trim().split(/\s+/) ?? [];
  el.innerHTML = '';
  const spans: HTMLSpanElement[] = [];
  words.forEach((word, index) => {
    const span = document.createElement('span');
    span.textContent = word;
    span.style.display = 'inline-block';
    span.style.willChange = 'transform, opacity';
    el.appendChild(span);
    spans.push(span);
    if (index < words.length - 1) {
      el.appendChild(document.createTextNode(' '));
    }
  });
  return spans;
}

/**
 * Parse a human-readable stat like "3,500+", "98%", or "25+" into a number.
 * Returns null for non-numeric values (e.g. "24/7").
 */
function parseCounterTarget(text: string): number | null {
  const cleaned = text.replace(/,/g, '').replace(/[^0-9.]/g, '');
  const value = cleaned ? Number(cleaned) : NaN;
  return Number.isFinite(value) && value > 0 ? value : null;
}

function runFadeInUp(scope: HTMLElement): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="fade-in-up"]').forEach((el) => {
    tweens.push(
      gsap.fromTo(
        el,
        fadeInUp.from,
        {
          ...fadeInUp.to,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      )
    );
  });
  return tweens;
}

function runScrollReveal(scope: HTMLElement): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="scroll-reveal"]').forEach((el) => {
    tweens.push(
      gsap.fromTo(
        el,
        scrollReveal.from,
        {
          ...scrollReveal.to,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      )
    );
  });
  return tweens;
}

function runStaggerChildren(scope: HTMLElement): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];
  scope.querySelectorAll<HTMLElement>('[data-animagger-children"]').forEach((container) => {
    const children = Array.from(container.children).filter(
      (child) => !(child as HTMLElement).hasAttribute('data-anim-exclude')
    ) as HTMLElement[];
    if (children.length === 0) return;
    tweens.push(
      gsap.fromTo(
        children,
        staggerChildren.from,
        {
          ...staggerChildren.to,
          scrollTrigger: { trigger: container, start: 'top 85%', once: true },
        }
      )
    );
  });
  return tweens;
}

function runStaggerCards(scope: HTMLElement): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="stagger-cards"]').forEach((grid) => {
    const cards = Array.from(grid.children).filter(
      (child) => !(child as HTMLElement).hasAttribute('data-anim-exclude')
    ) as HTMLElement[];
    if (cards.length === 0) return;
    tweens.push(
      gsap.fromTo(
        cards,
        staggerCards.from,
        {
          ...staggerCards.to,
          scrollTrigger: { trigger: grid, start: 'top 85%', once: true },
        }
      )
    );
  });
  return tweens;
}

function runCounterUp(scope: HTMLElement): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="counter-up"]').forEach((el) => {
    const explicit = el.getAttribute('data-counter-target');
    const target =
      explicit != null && explicit !== '' ? Number(explicit) : parseCounterTarget(el.textContent ?? '');
    if (target == null) return;

    const suffix = el.textContent?.replace(/[0-9,\s]/g, '').trim() ?? '';
    const obj = { value: 0 };
    tweens.push(
      gsap.fromTo(
        obj,
        { value: 0 },
        {
          value,
          duration: counterUp.to.duration,
          ease: counterUp.to.ease,
          snap: { value: 1 },
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(obj.value).toLocaleString()}${suffix}`;
          },
        }
      )
    );
  });
  return tweens;
}

function runHeroParallax(scope: HTMLElement): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="hero-parallax"]').forEach((el) => {
    tweens.push(
      gsap.to(el, {
        y: -60,
        ease: 'none',
        scrollTrigger: { trigger: el, scrub: 1 },
      })
    );
  });
  return tweens;
}

function runTimelineDraw(scope: HTMLElement): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="timeline-draw"]').forEach((el) => {
    tweens.push(
      gsap.fromTo(
        el,
        timelineDraw.from,
        {
          ...timelineDraw.to,
          scrollTrigger: { trigger: el, start: 'top 80%', once: true },
        }
      )
    );
  });
  return tweens;
}

function runHeadlineReveal(scope: HTMLElement): gsap.core.Tween[] {
  const tweens: gsap.core.Tween[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="headline-reveal"]').forEach((el) => {
    if (!el.textContent?.trim()) return;
    const words = splitWords(el);
    tweens.push(
      gsap.fromTo(
        words,
        headlineReveal.from,
        {
          ...headlineReveal.to,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }
      )
    );
  });
  return tweens;
}

function runCardHover(scope: HTMLElement): (() => void)[] {
  const cleanups: (() => void)[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="card-hover"]').forEach((card) => {
    const enter = () => gsap.to(card, cardHoverLift);
    const leave = () => gsap.to(card, { y: 0, duration: 0.25, ease: 'power2.out' });
    card.addEventListener('mouseenter', enter);
    card.addEventListener('mouseleave', leave);
    cleanups.push(() => {
      card.removeEventListener('mouseenter', enter);
      card.removeEventListener('mouseleave', leave);
    });
  });
  return cleanups;
}

function runTiltCard(scope: HTMLElement): (() => void)[] {
  const cleanups: (() => void)[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="tilt-card"]').forEach((card) => {
    gsap.set(card, { transformPerspective: 800 });
    const handleMove = (event: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -10;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.02,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    const handleLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
    };
    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
    cleanups.push(() => {
      card.removeEventListener('mousemove', handleMove);
      card.removeEventListener('mouseleave', handleLeave);
    });
  });
  return cleanups;
}

function runMagnetic(scope: HTMLElement): (() => void)[] {
  const cleanups: (() => void)[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="magnetic"]').forEach((button) => {
    const handleMove = (event: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      gsap.to(button, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    const handleLeave = () => {
      gsap.to(button, { x: 0, y: 0, duration: 0.4, ease: 'elastic.out(1, 0.5)' });
    };
    button.addEventListener('mousemove', handleMove);
    button.addEventListener('mouseleave', handleLeave);
    cleanups.push(() => {
      button.removeEventListener('mousemove', handleMove);
      button.removeEventListener('mouseleave', handleLeave);
    });
  });
  return cleanups;
}

function runPressButton(scope: HTMLElement): (() => void)[] {
  const cleanups: (() => void)[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="press-button"]').forEach((button) => {
    const down = () => gsap.to(button, pressButton.down);
    const up = () => gsap.to(button, pressButton.up);
    button.addEventListener('mousedown', down);
    button.addEventListener('mouseup', up);
    button.addEventListener('mouseleave', up);
    cleanups.push(() => {
      button.removeEventListener('mousedown', down);
      button.removeEventListener('mouseup', up);
      button.removeEventListener('mouseleave', up);
    });
  });
  return cleanups;
}

function runFaqAccordion(scope: HTMLElement): (() => void)[] {
  const cleanups: (() => void)[] = [];
  scope.querySelectorAll<HTMLElement>('[data-anim~="faq-accordion"]').forEach((container) => {
    container.querySelectorAll<HTMLDetailsElement>('details').forEach((details) => {
      const summary = details.querySelector('summary');
      const content = summary?.nextElementSibling as HTMLElement | null;
      if (!summary || !content) return;

      gsap.set(content, { height: 0, opacity: 0, overflow: 'hidden' });

      const toggle = (event: Event) => {
        event.preventDefault();
        const isOpen = details.hasAttribute('open');
        if (isOpen) {
          gsap.to(content, {
            height: 0,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.inOut',
            onComplete: () => details.removeAttribute('open'),
          });
        } else {
          details.setAttribute('open', '');
          gsap.fromTo(
            content,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.35, ease: 'power2.out' }
          );
        }
      };
      summary.addEventListener('click', toggle);
      cleanups.push(() => summary.removeEventListener('click', toggle));
    });
  });
  return cleanups;
}

/**
 * Initialise GSAP animations for elements with `data-anim` attributes.
 * Works for any DOM scope (React ref, Astro document, Storybook root).
 * Respects `prefers-reduced-motion` and returns a cleanup function.
 */
export function initAnimations(scope: HTMLElement | Document = document): AnimationScope {
  if (typeof window === 'undefined' || !scope) {
    return { revert: () => {} };
  }

  const root = scope instanceof Document ? document.body : scope;
  const mm = gsap.matchMedia();
  let eventCleanups: (() => void)[] = [];
  let tweens: gsap.core.Tween[] = [];

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    tweens = [
      ...runFadeInUp(root),
      ...runScrollReveal(root),
      ...runStaggerChildren(root),
      ...runStaggerCards(root),
      ...runCounterUp(root),
      ...runHeroParallax(root),
      ...runTimelineDraw(root),
      ...runHeadlineReveal(root),
    ];
    eventCleanups = [
      ...runCardHover(root),
      ...runTiltCard(root),
      ...runMagnetic(root),
      ...runPressButton(root),
      ...runFaqAccordion(root),
    ];
  });

  return {
    revert: () => {
      eventCleanups.forEach((cleanup) => cleanup());
      eventCleanups = [];
      tweens.forEach((tween) => tween.kill());
      tweens = [];
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && root.contains(st.trigger as Node)) {
          st.kill();
        }
      });
      mm.revert();
    },
  };
}
