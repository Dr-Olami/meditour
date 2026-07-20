import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  date: string;
  tags?: string[];
}

export interface BlogCardProps extends React.HTMLAttributes<HTMLAnchorElement> {
  post: BlogPostSummary;
  href: string;
  readMoreLabel?: string;
}

const FALLBACK_IMAGE = '/images/blog-placeholder.jpg';

/**
 * Card linking to a blog post.
 *
 * Displays a cover image, title, excerpt, publish date and the first tag.
 */
const BlogCard = React.forwardRef<HTMLAnchorElement, BlogCardProps>(
  ({ className, post, href, readMoreLabel = 'Read more', ...props }, ref) => {
    return (
      <a
        ref={ref}
        href={href}
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-card border border-cream-300 bg-cream-100 shadow-base transition-transform duration-fast ease-out-expo hover:-translate-y-1 hover:shadow-lg',
          className
        )}
        data-anim="card-hover"
        {...props}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-cream-200">
          <img
            src={post.coverImage || FALLBACK_IMAGE}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-slow ease-out-expo group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          {post.tags && post.tags.length > 0 && (
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-ink backdrop-blur-sm">
              {post.tags[0]}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-ink/50">
            {post.date}
          </p>
          <h3 className="mb-2 font-display text-lg font-semibold leading-snug text-ink group-hover:text-ink-strong">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-ink/60">
            {post.excerpt}
          </p>
          <span className="text-sm font-semibold text-ink group-hover:underline">
            {readMoreLabel}
          </span>
        </div>
      </a>
    );
  }
);
BlogCard.displayName = 'BlogCard';

export { BlogCard };
