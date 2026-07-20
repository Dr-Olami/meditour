import * as React from 'react';
import { cn } from '../../../lib/utils';

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

/**
 * File upload input atom.
 */
const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label
        className={cn(
          'flex cursor-pointer flex-col items-center justify-center rounded-base border-2 border-dashed border-border-strong bg-bg-subtle px-6 py-8 text-center transition-colors hover:border-ink hover:bg-bg-muted',
          className
        )}
      >
        <span className="text-sm font-medium text-text-secondary">
          {label || 'Click to upload a file'}
        </span>
        <input type="file" className="sr-only" ref={ref} {...props} />
      </label>
    );
  }
);
FileUpload.displayName = 'FileUpload';

export { FileUpload };
