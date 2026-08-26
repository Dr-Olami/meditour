import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface FilterChipsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  options: string[];
  active: string;
  onSelect: (value: string) => void;
}

const SPEED_PX_PER_SECOND = 90;
const MIN_DURATION_SECONDS = 12;
const DEFAULT_DURATION_SECONDS = 30;

const chipBaseClasses =
  'shrink-0 rounded-pill px-4 py-2 text-sm font-medium transition-colors duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500';

/**
 * Split a list in half for a two-row marquee layout.
 * The first half contains the first ceil(n/2) items so the rows stay balanced.
 */
function splitOptions<T>(options: T[]): [T[], T[]] {
  const mid = Math.ceil(options.length / 2);
  return [options.slice(0, mid), options.slice(mid)];
}

function ChipButton({
  option,
  active,
  onSelect,
}: {
  option: string;
  active: string;
  onSelect: (value: string) => void;
}) {
  const isActive = option === active;
  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      aria-pressed={isActive}
      className={cn(
        chipBaseClasses,
        isActive
          ? 'bg-ink text-cream-100'
          : 'border border-cream-300 bg-cream-100 text-ink hover:bg-cream-200'
      )}
    >
      {option}
    </button>
  );
}

function MarqueeRow({
  options,
  active,
  onSelect,
  direction,
}: {
  options: string[];
  active: string;
  onSelect: (value: string) => void;
  direction: 'left' | 'right';
}) {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [duration, setDuration] = React.useState(DEFAULT_DURATION_SECONDS);

  const updateDuration = React.useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    if (halfWidth > 0) {
      setDuration(Math.max(MIN_DURATION_SECONDS, halfWidth / SPEED_PX_PER_SECOND));
    }
  }, []);

  React.useEffect(() => {
    updateDuration();
    const el = trackRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateDuration);
    ro.observe(el);
    return () => ro.disconnect();
  }, [options, updateDuration]);

  return (
    <div className="overflow-hidden" data-row>
      <div
        ref={trackRef}
        className={cn(
          'flex w-max gap-2 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]',
          direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {options.map((option) => (
          <ChipButton key={option} option={option} active={active} onSelect={onSelect} />
        ))}
        {options.map((option) => (
          <ChipButton key={`${option}-dup`} option={option} active={active} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
}

/**
 * Two-row auto-scrolling carousel of filter pills.
 *
 * Each row loops seamlessly by duplicating its content. The scroll speed is
 * derived from the measured track width so the animation feels consistent
 * regardless of the number or length of labels. Animation pauses on hover and
 * when focus is inside the row so users can comfortably click or keyboard-navigate.
 */
const FilterChips = React.forwardRef<HTMLDivElement, FilterChipsProps>(
  ({ className, options, active, onSelect, ...props }, ref) => {
    const [row1, row2] = React.useMemo(() => splitOptions(options), [options]);

    if (options.length === 0) return null;

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Filter options"
        className={cn('flex flex-col gap-2 overflow-hidden', className)}
        {...props}
      >
        <MarqueeRow options={row1} active={active} onSelect={onSelect} direction="left" />
        {row2.length > 0 && (
          <MarqueeRow options={row2} active={active} onSelect={onSelect} direction="right" />
        )}
      </div>
    );
  }
);
FilterChips.displayName = 'FilterChips';

export { FilterChips };
