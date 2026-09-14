import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client for lead capture and medical report uploads.
 *
 * Reason: the anon key is safe to expose in the browser — Row Level Security
 * policies restrict access to INSERT-only on the leads table and
 * INSERT-only on the medical-reports storage bucket. Reads/deletes are
 * blocked for the anon role.
 */
const supabaseUrl =
  (import.meta.env.PUBLIC_SUPABASE_URL as string) || 'https://zvtpopydmhsltfwyubsz.supabase.co';
const supabaseAnonKey =
  (import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string) ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2dHBvcHlkbWhzbHRmd3l1YnN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0MTc1OTQsImV4cCI6MjEwNDk5MzU5NH0.Zfy2Bi4lyt_wAcrb-Mse3Q5tTavAhS__ACI-O36ZLlg';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Storage bucket name for medical report uploads. */
export const MEDICAL_REPORTS_BUCKET = 'medical-reports';

/** Maximum file size: 10 MB. */
export const MAX_FILE_SIZE = 10 * 1024 * 1024;

/** Allowed file MIME types for medical reports. */
export const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];

/** Human-readable list of allowed extensions (for error messages). */
export const ALLOWED_FILE_EXTENSIONS = 'PDF, JPG, PNG';
