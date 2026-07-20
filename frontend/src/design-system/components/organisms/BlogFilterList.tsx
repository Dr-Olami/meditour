import * as React from 'react';
import { cn } from '../../../lib/utils';
import { BlogCard, type BlogPostSummary } from './BlogCard';

export interface BlogFilterListProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: BlogPostSummary[];
  tags: string[];
  locale: string;
  readMoreLabel?: string;
  allLabel?: string;
}

/**
 * Filterable grid of blog posts.
 *
 * Shows tag chips for every post tag and re-filters the list client-side when
 * a tag is selected. Defaults to showing all posts.
 */
export function BlogFilterList({
  className,
  posts,
  tags,
  locale,
  readMoreLabel,
  allLabel = 'All',
  ...props
}: BlogFilterListProps) {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  const filtered = React.useMemo(() => {
    if (!selectedTag) return posts;
    return posts.filter((post) => post.tags?.includes(selectedTag));
  }, [posts, selectedTag]);

  return (
    <div className={cn('space-y-8', className)} {...props}>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by tag">
        <button
          type="button"
          role="tab"
          aria-selected={selectedTag === null}
          onClick={() => setSelectedTag(null)}
          className={cn(
            'rounded-pill px-4 py-1.5 text-sm font-medium transition-colors',
            selectedTag === null
              ? 'bg-ink text-white'
              : 'border border-cream-300 bg-cream-100 text-ink/70 hover:bg-cream-200'
          )}
        >
          {allLabel}
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            role="tab"
            aria-selected={selectedTag === tag}
            onClick={() => setSelectedTag(tag)}
            className={cn(
              'rounded-pill px-4 py-1.5 text-sm font-medium transition-colors',
              selectedTag === tag
                ? 'bg-ink text-white'
                : 'border border-cream-300 bg-cream-100 text-ink/70 hover:bg-cream-200'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-ink/60">No posts match the selected tag.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              href={`/${locale === 'bn' ? 'bn/' : ''}blog/${post.slug}`}
              readMoreLabel={readMoreLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
}
