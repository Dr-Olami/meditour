import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  shouldShowIntro,
  markIntroSeen,
  INTRO_STORAGE_KEY,
  INTRO_TIMINGS,
  INTRO_TOTAL_MS,
} from '../../../src/design-system/motion/brandedIntro';

/** Build a minimal Storage-like stub with an in-memory map. */
function makeStorage(): Storage {
  const store = new Map<string, string>();
  return {
    length: 0,
    clear: () => store.clear(),
    getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
    setItem: (key: string, value: string) => {
      store.set(key, String(value));
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    key: () => null,
  };
}

describe('brandedIntro — shouldShowIntro', () => {
  it('returns true on a fresh session without reduced motion (expected use)', () => {
    const storage = makeStorage();
    expect(shouldShowIntro(storage, false)).toBe(true);
  });

  it('returns false once the intro has been marked seen this session (edge case)', () => {
    const storage = makeStorage();
    markIntroSeen(storage);
    expect(shouldShowIntro(storage, false)).toBe(false);
  });

  it('returns false when the user prefers reduced motion, even on a fresh session (edge case)', () => {
    const storage = makeStorage();
    expect(shouldShowIntro(storage, true)).toBe(false);
  });

  it('returns false when reduced motion is requested even if not yet seen (failure case)', () => {
    const storage = makeStorage();
    // Reason: reduced-motion must win over "first visit" — accessibility
    // outranks the branded moment.
    expect(shouldShowIntro(storage, true)).toBe(false);
    expect(storage.getItem(INTRO_STORAGE_KEY)).toBeNull();
  });
});

describe('brandedIntro — markIntroSeen', () => {
  it('writes the sentinel value so shouldShowIntro returns false afterwards', () => {
    const storage = makeStorage();
    markIntroSeen(storage);
    expect(storage.getItem(INTRO_STORAGE_KEY)).toBe('1');
    expect(shouldShowIntro(storage, false)).toBe(false);
  });

  it('swallows storage failures instead of throwing (failure case)', () => {
    const failing: Pick<Storage, 'setItem'> = {
      setItem: () => {
        throw new Error('private mode');
      },
    };
    expect(() => markIntroSeen(failing)).not.toThrow();
  });
});

describe('brandedIntro — timings', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('keeps the total intro duration within the 1.2s UX budget', () => {
    // Reason: a branded intro longer than ~1.2s starts to feel like a barrier.
    expect(INTRO_TOTAL_MS).toBeLessThanOrEqual(1200);
  });

  it('composes the total from the three phases', () => {
    expect(INTRO_TOTAL_MS).toBe(
      INTRO_TIMINGS.drawIn + INTRO_TIMINGS.hold + INTRO_TIMINGS.wipe
    );
  });
});
