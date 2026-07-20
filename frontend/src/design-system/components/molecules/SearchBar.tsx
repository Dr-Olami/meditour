import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

export interface SearchBarProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

/**
 * Search input with submit button.
 */
const SearchBar = React.forwardRef<HTMLFormElement, SearchBarProps>(
  ({ className, placeholder = 'Search...', onSearch, ...props }, ref) => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const value = String(formData.get('search') ?? '');
      onSearch?.(value);
    };

    return (
      <form
        className={cn('flex w-full gap-2', className)}
        onSubmit={handleSubmit}
        ref={ref}
        {...props}
      >
        <div className="relative flex-1">
          <Input
            name="search"
            type="search"
            placeholder={placeholder}
            className="pl-10"
            aria-label={placeholder}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            <Icon name="chevron-right" size={16} />
          </span>
        </div>
        <Button type="submit" aria-label="Search">
          Search
        </Button>
      </form>
    );
  }
);
SearchBar.displayName = 'SearchBar';

export { SearchBar };
