import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../../../lib/utils';
import {
  leadSchema,
  type LeadPayload,
  type LeadSource,
  submitLead,
  uploadMedicalReport,
  attachMedicalReports,
  validateMedicalFile,
} from '../../../lib/crm';
import { ALLOWED_FILE_EXTENSIONS, MAX_FILE_SIZE } from '../../../lib/supabase';
import { Button } from '../atoms/Button';
import { Spinner } from '../atoms/Spinner';
import { FormInput, FormTextarea, FormSelect, FormCheckbox } from '../molecules/FormField';
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
    ? import.meta.env.PUBLIC_CONTACT_EMAIL || 'contact@khanmeditour.com'
    : 'contact@khanmeditour.com';

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
    parts.push(`The estimated total I saw was $${estimatedTotal.toLocaleString()}.`);
  }
  return parts.length > 0 ? parts.join(' ') : '';
}

/**
 * Lead capture form connected to the CRM (Supabase).
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
      defaultMessage ?? buildDefaultMessage(defaultDoctor, defaultTreatment, estimatedTotal);

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

    // Reason: manage file uploads in local state — react-hook-form doesn't
    // handle File objects well with its default register.
    const [files, setFiles] = React.useState<File[]>([]);
    const [fileErrors, setFileErrors] = React.useState<string[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = Array.from(e.target.files ?? []);
      const validated: File[] = [];
      const errors: string[] = [];

      for (const file of selected) {
        const err = validateMedicalFile(file);
        if (err) {
          errors.push(`${file.name}: ${err}`);
        } else {
          validated.push(file);
        }
      }

      setFiles((prev) => [...prev, ...validated]);
      setFileErrors(errors);
    };

    const removeFile = (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    };

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { noReports: _noReports, ...rest } = data;
      const payload: LeadPayload = {
        ...rest,
        hasReports: !data.noReports,
        reportsSharedVia: data.noReports ? 'not_yet' : files.length > 0 ? 'whatsapp' : undefined,
      };

      // Reason: submit the lead first to get the lead ID, then upload files
      // and attach them to the lead record.
      const result = await submitLead(payload);
      if (result.ok && result.leadId) {
        // Upload medical reports if any files were attached
        if (files.length > 0) {
          const uploadedPaths: string[] = [];
          for (const file of files) {
            const uploadResult = await uploadMedicalReport(file, String(result.leadId));
            if (uploadResult.path) {
              uploadedPaths.push(uploadResult.path);
            }
          }
          if (uploadedPaths.length > 0) {
            await attachMedicalReports(result.leadId, uploadedPaths);
          }
        }

        // Reason: push to dataLayer so GTM can fire the form_submit
        // conversion event when a lead is successfully submitted.
        if (typeof window !== 'undefined') {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: 'form_submit',
            form_source: source || 'general-contact',
          });
        }
        reset();
        setFiles([]);
        setFileErrors([]);
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
        {/* Medical report file upload — shown when the patient has reports */}
        {!noReports && (
          <div className="space-y-2">
            <label htmlFor="medical-reports" className="block text-sm font-semibold text-ink">
              Medical reports (optional)
            </label>
            <p className="text-sm text-text-muted">
              Upload your medical records for review. Supported formats: {ALLOWED_FILE_EXTENSIONS}.
              Max {MAX_FILE_SIZE / (1024 * 1024)}MB per file.
            </p>
            <input
              ref={fileInputRef}
              id="medical-reports"
              name="medical-reports"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-ink file:mr-4 file:rounded-full file:border-0 file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-violet-700 hover:file:bg-violet-100"
            />
            {fileErrors.length > 0 && (
              <ul className="text-sm text-accent-600" role="alert">
                {fileErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
            {files.length > 0 && (
              <ul className="space-y-1.5">
                {files.map((file, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-card border border-cream-300 bg-cream-100 px-3 py-2 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="text-ink/40 shrink-0"
                      >
                        <path
                          d="M4 1.5h5L13 5.5v9a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path d="M9 1.5V5.5h4" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                      <span className="truncate">{file.name}</span>
                      <span className="text-ink/40">({(file.size / 1024).toFixed(0)} KB)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-ink/40 hover:text-accent-600"
                      aria-label={`Remove ${file.name}`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4 4l8 8M12 4l-8 8"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <input type="hidden" {...register('source')} />
        <input type="hidden" {...register('doctorSlug')} />
        <input type="hidden" {...register('hospitalSlug')} />
        <input type="hidden" {...register('estimatedTotal')} />
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Spinner size={20} className="mr-2" /> : null}
          Send inquiry
        </Button>
        {status && (
          <div
            role="alert"
            className={cn(
              'rounded-card p-5 text-center text-sm',
              status.type === 'success' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
            )}
          >
            <div className="mb-2 flex items-center justify-center gap-2">
              {status.type === 'success' && (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M8 12l2.5 2.5L16 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
              <p className="font-semibold">{status.message}</p>
            </div>
            {status.type === 'success' && (
              <>
                <p className="text-ink/70 mt-3 text-sm font-medium">
                  Send your medical reports for a faster response:
                </p>
                <p className="mt-2 flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={reportWhatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-card bg-success px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M13.6 2.32A7.85 7.85 0 0 0 8.02 0C3.67 0 .13 3.54.13 7.89c0 1.4.37 2.76 1.06 3.96L.07 16l4.28-1.12a7.86 7.86 0 0 0 3.77.96h.003c4.35 0 7.89-3.54 7.89-7.89 0-2.11-.82-4.09-2.31-5.58zM8.02 14.5a6.5 6.5 0 0 1-3.31-.9l-.24-.14-2.74.72.73-2.67-.16-.25a6.48 6.48 0 0 1-.99-3.46c0-3.6 2.93-6.53 6.54-6.53 1.75 0 3.39.68 4.63 1.92a6.5 6.5 0 0 1 1.91 4.62c0 3.6-2.93 6.53-6.53 6.53z" />
                    </svg>
                    Send on WhatsApp
                  </a>
                  <a
                    href={`mailto:${contactEmail}?subject=Medical%20reports%20for%20${encodeURIComponent(
                      submittedName || 'inquiry'
                    )}`}
                    className="inline-flex items-center gap-1 rounded-card border border-cream-300 bg-cream-100 px-4 py-2 font-semibold text-ink transition-opacity hover:opacity-90"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <rect
                        x="2"
                        y="3"
                        width="12"
                        height="10"
                        rx="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path d="M2 4l6 5 6-5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    Email reports
                  </a>
                </p>
              </>
            )}
          </div>
        )}
      </form>
    );
  }
);
LeadForm.displayName = 'LeadForm';

export { LeadForm };
