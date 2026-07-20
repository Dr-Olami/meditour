import * as React from 'react';
import { cn } from '../../../lib/utils';
import { Input, type InputProps } from '../atoms/Input';
import { Textarea, type TextareaProps } from '../atoms/Textarea';
import { Select, type SelectProps } from '../atoms/Select';
import { Checkbox, type CheckboxProps } from '../atoms/Checkbox';
import { Label } from '../atoms/Label';

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children?: React.ReactNode;
}

/**
 * Wrapper that composes a label, input-like control, hint and error text.
 */
const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    { className, label, name, required, error, hint, children, ...props },
    ref
  ) => {
    return (
      <div className={cn('space-y-1', className)} ref={ref} {...props}>
        <Label htmlFor={name} required={required}>
          {label}
        </Label>
        {children}
        {hint && <p className="text-sm text-text-muted">{hint}</p>}
        {error && (
          <p id={`${name}-error`} className="text-sm text-accent-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);
FormField.displayName = 'FormField';

export interface FormInputProps extends Omit<FormFieldProps, 'children'> {
  inputProps?: Omit<InputProps, 'id' | 'name'>;
}

/**
 * Form field using the Input atom.
 */
const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ inputProps, error, ...fieldProps }, ref) => {
    return (
      <FormField error={error} {...fieldProps}>
        <Input
          id={fieldProps.name}
          name={fieldProps.name}
          state={error ? 'error' : 'default'}
          aria-describedby={error ? `${fieldProps.name}-error` : undefined}
          aria-invalid={!!error}
          ref={ref}
          {...inputProps}
        />
      </FormField>
    );
  }
);
FormInput.displayName = 'FormInput';

export interface FormTextareaProps extends Omit<FormFieldProps, 'children'> {
  textareaProps?: Omit<TextareaProps, 'id' | 'name'>;
}

/**
 * Form field using the Textarea atom.
 */
const FormTextarea = React.forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ textareaProps, error, ...fieldProps }, ref) => {
    return (
      <FormField error={error} {...fieldProps}>
        <Textarea
          id={fieldProps.name}
          name={fieldProps.name}
          state={error ? 'error' : 'default'}
          aria-describedby={error ? `${fieldProps.name}-error` : undefined}
          aria-invalid={!!error}
          ref={ref}
          {...textareaProps}
        />
      </FormField>
    );
  }
);
FormTextarea.displayName = 'FormTextarea';

export interface FormSelectProps extends Omit<FormFieldProps, 'children'> {
  selectProps?: Omit<SelectProps, 'id' | 'name'>;
  options: { value: string; label: string }[];
}

/**
 * Form field using the Select atom.
 */
const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ selectProps, options, error, ...fieldProps }, ref) => {
    return (
      <FormField error={error} {...fieldProps}>
        <Select
          id={fieldProps.name}
          name={fieldProps.name}
          state={error ? 'error' : 'default'}
          aria-describedby={error ? `${fieldProps.name}-error` : undefined}
          aria-invalid={!!error}
          ref={ref}
          {...selectProps}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FormField>
    );
  }
);
FormSelect.displayName = 'FormSelect';

export interface FormCheckboxProps extends Omit<FormFieldProps, 'children'> {
  checkboxProps?: Omit<CheckboxProps, 'id' | 'name'>;
}

/**
 * Form field using the Checkbox atom.
 */
const FormCheckbox = React.forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ checkboxProps, error, ...fieldProps }, ref) => {
    return (
      <FormField error={error} {...fieldProps}>
        <Checkbox
          id={fieldProps.name}
          name={fieldProps.name}
          ref={ref}
          {...checkboxProps}
        />
      </FormField>
    );
  }
);
FormCheckbox.displayName = 'FormCheckbox';

export { FormField, FormInput, FormTextarea, FormSelect, FormCheckbox };
