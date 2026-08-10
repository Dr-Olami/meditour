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
  bottomWideCard?: ServiceCard;
  exploreLabel?: string;
  contactLabel?: string;
}

const cardButtonClass =
  'inline-flex h-11 flex-1 items-center justify-center rounded-pill px-4 text-xs font-semibold sm:min-w-[16rem] sm:px-6 sm:text-sm';

const wideCardButtonClass =
  'inline-flex h-11 w-full items-center justify-center rounded-pill px-5 text-xs font-semibold sm:w-auto sm:min-w-[12rem] sm:px-6 sm:text-sm md:min-w-[14rem] lg:min-w-[16rem]';

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
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />

      {/* Content */}
      <div className="relative flex flex-1 flex-col justify-end p-6 md:justify-between md:p-8" data-anim="stagger-children">
        <div
          className={cn(
            'flex flex-col justify-end md:flex-1 md:justify-start'
          )}
        >
          <h3 className="font-display text-2xl font-extrabold text-white md:text-5xl" data-anim="headline-reveal">
            {card.title}
          </h3>
          <p className="mt-2 max-w-md text-sm font-medium text-white/80 md:text-xl" data-anim="fade-in-up">
            {card.subtitle}
          </p>
        </div>

        <div className={cn('mt-4 md:mt-auto flex gap-3 sm:gap-4', variant === 'wide' ? 'w-full justify-center sm:flex-wrap' : 'w-full justify-center sm:flex-wrap')} data-anim="fade-in-up">
          <Button asChild variant="primary" className={variant === 'wide' ? wideCardButtonClass : cardButtonClass}>
            <a href={card.exploreHref}>{exploreLabel}</a>
          </Button>
          <Button
            asChild
            variant="secondary"
            className={cn(
              variant === 'wide' ? wideCardButtonClass : cardButtonClass,
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
 * Service cards section: a wide top card, two side-by-side middle cards,
 * and an optional wide bottom card.
 */
const ServiceCardsSection = React.forwardRef<
  HTMLElement,
  ServiceCardsSectionProps
>((
    {
      className,
      topCard,
      bottomCards,
      bottomWideCard,
      exploreLabel = 'Explore More',
      contactLabel = 'Contact Us',
      ...props
    },
    ref
  ) => {
    return (
      <section
        className={cn('bg-cream-100 pt-8 pb-20', className)}
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
            {bottomWideCard && (
              <ServiceCardContent
                card={bottomWideCard}
                variant="wide"
                exploreLabel={exploreLabel}
                contactLabel={contactLabel}
              />
            )}
          </div>
        </div>
      </section>
    );
  });

ServiceCardsSection.displayName = 'ServiceCardsSection';

export { ServiceCardsSection };
