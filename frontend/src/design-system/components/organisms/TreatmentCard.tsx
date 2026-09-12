import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Button } from '../atoms/Button';
import { Tag } from '../atoms/Tag';
import { Link } from '../atoms/Link';

export interface Treatment {
  name: string;
  description: string;
  fromPrice?: string;
  tags?: string[];
  href?: string;
  image?: string;
}

export interface TreatmentCardProps extends React.HTMLAttributes<HTMLDivElement> {
  treatment: Treatment;
  fromLabel?: string;
}

/**
 * Treatment / service card.
 */
const TreatmentCard = React.forwardRef<HTMLDivElement, TreatmentCardProps>(
  ({ className, treatment, ...props }, ref) => {
    return (
      <article
        className={cn(
          'group flex flex-col overflow-hidden rounded-card border border-cream-300 bg-cream-100 shadow-base transition-shadow hover:shadow-lg',
          className
        )}
        ref={ref}
        data-anim="card-hover"
        {...props}
      >
        {treatment.image && (
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={treatment.image}
              alt={treatment.name}
              loading="lazy"
              decoding="async"
              width={320}
              height={200}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {treatment.tags && treatment.tags.length > 0 && (
              <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                {treatment.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="flex flex-1 flex-col p-5">
          {!treatment.image && (
            <div className="mb-3 flex flex-wrap gap-2">
              {treatment.tags?.map((tag) => (
                <Tag key={tag} variant="default">
                  {tag}
                </Tag>
              ))}
            </div>
          )}
          <h3 className="text-xl font-semibold">{treatment.name}</h3>
          <p className="mb-4 flex-1 text-text-secondary">{treatment.description}</p>
          {treatment.href ? (
            <Link href={treatment.href} className="mt-4 inline-block">
              Learn more
            </Link>
          ) : (
            <Button className="mt-4 w-full" variant="outline" size="sm">
              Inquire now
            </Button>
          )}
        </div>
      </article>
    );
  }
);
TreatmentCard.displayName = 'TreatmentCard';

export { TreatmentCard };
