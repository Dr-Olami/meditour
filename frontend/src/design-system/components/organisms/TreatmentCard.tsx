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
}

export interface TreatmentCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  treatment: Treatment;
  fromLabel?: string;
}

/**
 * Treatment / service card.
 */
const TreatmentCard = React.forwardRef<HTMLDivElement, TreatmentCardProps>(
  ({ className, treatment, fromLabel = 'From', ...props }, ref) => {
    return (
      <article
        className={cn(
          'group flex flex-col rounded-card border border-cream-300 bg-cream-100 p-5 shadow-base transition-shadow hover:shadow-lg',
          className
        )}
        ref={ref}
        data-anim="card-hover"
        {...props}
      >
        <div className="mb-3 flex flex-wrap gap-2">
          {treatment.tags?.map((tag) => (
            <Tag key={tag} variant="default">
              {tag}
            </Tag>
          ))}
        </div>
        <h3 className="text-xl font-semibold">{treatment.name}</h3>
        <p className="mb-4 flex-1 text-text-secondary">{treatment.description}</p>
        {treatment.fromPrice && (
          <p className="text-sm font-medium text-ink">
            {fromLabel} {treatment.fromPrice}
          </p>
        )}
        {treatment.href ? (
          <Link href={treatment.href} className="mt-4 inline-block">
            Learn more
          </Link>
        ) : (
          <Button className="mt-4 w-full" variant="outline" size="sm">
            Inquire now
          </Button>
        )}
      </article>
    );
  }
);
TreatmentCard.displayName = 'TreatmentCard';

export { TreatmentCard };
