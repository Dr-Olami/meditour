import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../atoms/Button';

export interface ServiceCard {
  title: string;
  subtitle: string;
  image: string;
  exploreHref: string;
  contactHref: string;
}

export interface ServiceCardsSectionProps
  extends React.HTMLAttributes<HTMLElement> {
  topCard: ServiceCard;
  bottomCards: [ServiceCard, ServiceCard];
  exploreLabel?: string;
  contactLabel?: string;
}

const cardButtonClass =
  'inline-flex h-11 min-w-[16rem] items-center justify-center rounded-pill px-6 text-sm font-semibold';

const ServiceCardContent = ({
  card,
  variant,
  exploreLabel,
  contactLabel,
}: {
  card: ServiceCard;
  variant: 'wide' | 'tall';
  exploreLabel: string;
  contactLabel: string;
}) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-card shadow-base',
        variant === 'wide'
          ? 'col-span-1 min-h-[500px] md:col-span-2 md:h-[600px]'
          : 'col-span-1 min-h-[510px] md:h-[600px]'
      )}
    >
      {/* Background image */}
      <img
        src={card.image}
        alt={card.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative flex flex-1 flex-col justify-end p-6 md:justify-between md:p-8">
        <div
          className={cn(
            'flex flex-col justify-end md:flex-1 md:justify-start'
          )}
        >
          <h3 className="font-display text-2xl font-extrabold text-white md:text-5xl">
            {card.title}
          </h3>
          <p className="mt-2 max-w-md text-sm font-medium text-white/80 md:text-xl">
            {card.subtitle}
          </p>
        </div>

        <div className="mt-4 md:mt-auto flex w-full flex-wrap gap-4 justify-center">
          <Button asChild variant="primary" className={cardButtonClass}>
            <a href={card.exploreHref}>{exploreLabel}</a>
          </Button>
          <Button
            asChild
            variant="secondary"
            className={cn(
              cardButtonClass,
              'bg-white text-ink hover:bg-cream-100'
            )}
          >
            <a href={card.contactHref}>{contactLabel}</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

/**
 * Two-row service cards section: a wide top card and two side-by-side bottom cards.
 */
const ServiceCardsSection = React.forwardRef<
  HTMLElement,
  ServiceCardsSectionProps
>((
    {
      className,
      topCard,
      bottomCards,
      exploreLabel = 'Explore More',
      contactLabel = 'Contact Us',
      ...props
    },
    ref
  ) => {
    return (
      <section
        className={cn('bg-cream-100 py-20', className)}
        ref={ref}
        {...props}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2" data-anim="stagger-cards">
            <ServiceCardContent
              card={topCard}
              variant="wide"
              exploreLabel={exploreLabel}
              contactLabel={contactLabel}
            />
            <ServiceCardContent
              card={bottomCards[0]}
              variant="tall"
              exploreLabel={exploreLabel}
              contactLabel={contactLabel}
            />
            <ServiceCardContent
              card={bottomCards[1]}
              variant="tall"
              exploreLabel={exploreLabel}
              contactLabel={contactLabel}
            />
          </div>
        </div>
      </section>
    );
  });

ServiceCardsSection.displayName = 'ServiceCardsSection';

export { ServiceCardsSection };
