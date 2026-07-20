import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Icon } from '../atoms/Icon';

export interface RelatedTreatmentLink {
  name: string;
  href: string;
}

export interface BlogPostLayoutProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  coverImage?: string;
  publishedAt: string;
  updatedAt?: string;
  author: string;
  tags?: string[];
  relatedTreatments?: RelatedTreatmentLink[];
  ctaHref: string;
  ctaLabel: string;
  backHref: string;
  backLabel: string;
  bodyHtml: string;
  byLabel?: string;
  updatedLabel?: string;
}

/**
 * Article shell for a blog post.
 *
 * Renders the post header, cover image, body HTML, tags, author byline and a
 * contextual CTA back into the lead funnel.
 */
const BlogPostLayout = React.forwardRef<HTMLElement, BlogPostLayoutProps>(
  (
    {
      className,
      title,
      coverImage,
      publishedAt,
      updatedAt,
      author,
      tags,
      relatedTreatments,
      ctaHref,
      ctaLabel,
      backHref,
      backLabel,
      bodyHtml,
      byLabel = 'By',
      updatedLabel = 'Updated on',
      ...props
    },
    ref
  ) => {
    return (
      <article
        ref={ref}
        className={cn('container py-24 md:py-28', className)}
        {...props}
      >
        <a
          href={backHref}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-ink/60 hover:text-ink"
        >
          <Icon name="arrow-left" size={16} />
          {backLabel}
        </a>

        <header className="mb-8 max-w-3xl">
          {tags && tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-cream-300 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
            {title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink/60">
            <span>
              {byLabel} <span className="font-medium text-ink">{author}</span>
            </span>
            <time dateTime={publishedAt}>{publishedAt}</time>
            {updatedAt && (
              <span>
                {updatedLabel} <time dateTime={updatedAt}>{updatedAt}</time>
              </span>
            )}
          </div>
        </header>

        {coverImage && (
          <div className="mb-12 overflow-hidden rounded-card border border-cream-300">
            <img
              src={coverImage}
              alt={title}
              className="aspect-[16/9] w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-[1fr_22rem]">
          <div
            className="prose prose-ink max-w-none"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />

          <aside className="space-y-8">
            {relatedTreatments && relatedTreatments.length > 0 && (
              <div className="rounded-card border border-cream-300 bg-cream-100 p-6">
                <h2 className="mb-4 font-display text-lg font-semibold text-ink">
                  Related treatments
                </h2>
                <ul className="space-y-3">
                  {relatedTreatments.map((treatment) => (
                    <li key={treatment.name}>
                      <a
                        href={treatment.href}
                        className="flex items-center gap-2 text-sm font-medium text-violet-700 hover:underline"
                      >
                        <Icon name="arrow-right" size={14} />
                        {treatment.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-card border border-cream-300 bg-cream-100 p-6">
              <h2 className="mb-2 font-display text-lg font-semibold text-ink">
                Need help with treatment?
              </h2>
              <p className="mb-4 text-sm text-ink/60">
                Get a free cost estimate and personalised hospital recommendations.
              </p>
              <a
                href={ctaHref}
                className="inline-flex w-full items-center justify-center rounded-card bg-ink px-5 py-3 text-sm font-semibold text-white shadow-md hover:text-white"
              >
                {ctaLabel}
              </a>
            </div>
          </aside>
        </div>
      </article>
    );
  }
);
BlogPostLayout.displayName = 'BlogPostLayout';

export { BlogPostLayout };
