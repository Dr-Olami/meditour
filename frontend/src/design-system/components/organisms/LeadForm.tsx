import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../../../lib/utils';
import {
  leadSchema,
  type LeadPayload,
  type LeadSource,
  submitLead,
} from '../../../lib/crm';
import { Button } from '../atoms/Button';
import { Spinner } from '../atoms/Spinner';
import {
  FormInput,
  FormTextarea,
  FormSelect,
  FormCheckbox,
} from '../molecules/FormField';
import { buildWhatsAppLink } from '../../../lib/whatsapp';

export interface LeadFormProps extends React.HTMLAttributes<HTMLFormElement> {
  treatments?: { value: string; label: string }[];
  source?: LeadSource;
  defaultTreatment?: string;
  defaultDoctor?: string;
  defaultMessage?: string;
  doctorSlug?: string;
  hospitalSlug?: string;
  estimatedTotal?: number;
  onSuccess?: () => void;
}

type ContactMethod = 'whatsapp' | 'email' | 'call';

interface FormValues extends LeadPayload {
  noReports: boolean;
}

const PREFERRED_CONTACT_OPTIONS: { value: ContactMethod; label: string }[] = [
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Email' },
  { value: 'call', label: 'Phone call' },
];

const whatsappNumber =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.PUBLIC_WHATSAPP_NUMBER || '8801611892986'
    : '8801611892986';
const contactEmail =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env.PUBLIC_CONTACT_EMAIL || 'khan@meditour.com'
    : 'khan@meditour.com';

/**
 * Build a default inquiry message from optional pre-fill context.
 */
function buildDefaultMessage(
  doctorName?: string,
  treatment?: string,
  estimatedTotal?: number
): string {
  const parts: string[] = [];
  if (doctorName) {
    parts.push(`I would like to request an appointment with ${doctorName}.`);
  }
  if (treatment) {
    parts.push(`I am interested in ${treatment}.`);
  }
  if (estimatedTotal !== undefined) {
    parts.push(
      `The estimated total I saw was $${estimatedTotal.toLocaleString()}.`
    );
  }
  return parts.length > 0 ? parts.join(' ') : '';
}

/**
 * Lead capture form connected to the CRM.
 */
const LeadForm = React.forwardRef<HTMLFormElement, LeadFormProps>(
  (
    {
      className,
      treatments,
      source,
      defaultTreatment,
      defaultDoctor,
      defaultMessage,
      doctorSlug,
      hospitalSlug,
      estimatedTotal,
      onSuccess,
      ...props
    },
    ref
  ) => {
    const initialMessage =
      defaultMessage ??
      buildDefaultMessage(defaultDoctor, defaultTreatment, estimatedTotal);

    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
      reset,
      setError,
    } = useForm<FormValues>({
      resolver: zodResolver(leadSchema),
      defaultValues: {
        source,
        treatment: defaultTreatment || '',
        message: initialMessage,
        doctorSlug,
        hospitalSlug,
        estimatedTotal,
        preferredContactMethod: 'whatsapp',
        hasReports: true,
        noReports: false,
      },
    });

    const noReports = watch('noReports');
    const submittedName = watch('name');
    const submittedTreatment = watch('treatment');

    const [status, setStatus] = React.useState<{
      type: 'success' | 'error';
      message: string;
    } | null>(null);

    const reportWhatsAppHref = React.useMemo(() => {
      const greeting = `Hi Khan Meditour, my name is ${submittedName || 'a prospective patient'}`;
      const treatmentPart = submittedTreatment
        ? ` and I am interested in ${submittedTreatment}`
        : '';
      return buildWhatsAppLink(
        whatsappNumber,
        `${greeting}${treatmentPart}. I would like to share my medical reports for review.`
      );
    }, [submittedName, submittedTreatment]);

    const onSubmit = async (data: FormValues) => {
      setStatus(null);
      const leadData = { ...data };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { noReports, ...rest } = leadData;
      const payload: LeadPayload = {
        ...rest,
        hasReports: !data.noReports,
        reportsSharedVia: data.noReports ? 'not_yet' : undefined,
      };
      const result = await submitLead(payload);
      if (result.ok) {
        reset();
        setStatus({
          type: 'success',
          message:
            "We'll review your case and connect you with a specialist within 24–48 hours. Please send your reports via WhatsApp or email if you haven't already.",
        });
        onSuccess?.();
      } else {
        setError('root', { message: result.message });
        setStatus({ type: 'error', message: result.message });
      }
    };

    return (
      <form
        className={cn('space-y-5', className)}
        onSubmit={handleSubmit(onSubmit)}
        ref={ref}
        {...props}
      >
        <FormInput
          label="Full name"
          name="name"
          required
          error={errors.name?.message}
          inputProps={{ ...register('name'), placeholder: 'Your name' }}
        />
        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            label="Email"
            name="email"
            error={errors.email?.message}
            inputProps={{
              ...register('email'),
              type: 'email',
              placeholder: 'you@example.com',
            }}
          />
          <FormInput
            label="Phone / WhatsApp"
            name="phone"
            required
            error={errors.phone?.message}
            inputProps={{
              ...register('phone'),
              type: 'tel',
              placeholder: '+880...',
            }}
          />
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            label="Country"
            name="country"
            error={errors.country?.message}
            inputProps={{ ...register('country'), placeholder: 'Your country' }}
          />
          <FormSelect
            label="Preferred contact method"
            name="preferredContactMethod"
            options={PREFERRED_CONTACT_OPTIONS}
            selectProps={register('preferredContactMethod')}
            error={errors.preferredContactMethod?.message}
          />
        </div>
        {treatments && treatments.length > 0 && (
          <FormSelect
            label="Treatment of interest"
            name="treatment"
            options={treatments}
            selectProps={register('treatment')}
            error={errors.treatment?.message}
          />
        )}
        <FormCheckbox
          label="I don't have my reports yet"
          name="noReports"
          hint="If checked, please describe your symptoms or condition below so we can guide you."
          checkboxProps={{
            ...register('noReports'),
            label: "I don't have my reports yet",
          }}
          error={errors.noReports?.message}
        />
        {noReports && (
          <FormTextarea
            label="Symptoms / condition"
            name="message"
            error={errors.message?.message}
            textareaProps={{
              ...register('message'),
              rows: 3,
              placeholder: 'Tell us your symptoms or current diagnosis...',
            }}
          />
        )}
        {!noReports && (
          <FormTextarea
            label="How can we help you?"
            name="message"
            error={errors.message?.message}
            textareaProps={{
              ...register('message'),
              rows: 4,
              placeholder: 'Tell us more...',
            }}
          />
        )}
        <input type="hidden" {...register('source')} />
        <input type="hidden" {...register('doctorSlug')} />
        <input type="hidden" {...register('hospitalSlug')} />
        <input type="hidden" {...register('estimatedTotal')} />
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Spinner size={20} className="mr-2" /> : null}
          Send inquiry
        </Button>
        {status && (
          <div
            role="alert"
            className={cn(
              'rounded-card p-4 text-center text-sm',
              status.type === 'success'
                ? 'bg-success/10 text-success'
                : 'bg-error/10 text-error'
            )}
          >
            <p>{status.message}</p>
            {status.type === 'success' && (
              <p className="mt-2 flex flex-wrap items-center justify-center gap-2">
                <a
                  href={reportWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-2"
                >
                  Send reports on WhatsApp
                </a>
                <span className="text-ink/40" aria-hidden="true">
                  /
                </span>
                <a
                  href={`mailto:${contactEmail}?subject=Medical%20reports%20for%20${encodeURIComponent(
                    submittedName || 'inquiry'
                  )}`}
                  className="inline-flex items-center gap-1 font-semibold underline underline-offset-2"
                >
                  Email reports
                </a>
              </p>
            )}
          </div>
        )}
      </form>
    );
  }
);
LeadForm.displayName = 'LeadForm';

export { LeadForm };
