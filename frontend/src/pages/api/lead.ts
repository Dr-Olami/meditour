import type { APIRoute } from 'astro';
import { leadSchema } from '../../lib/crm';

export const prerender = false;

/**
 * Server-side lead submission endpoint.
 * Validates the payload with Zod and forwards it to the configured CRM.
 */
export const POST: APIRoute = async ({ request }) => {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        message: 'Validation failed',
        errors: parsed.error.flatten().fieldErrors,
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const crmUrl = import.meta.env.CRM_API_URL;
  const crmKey = import.meta.env.CRM_API_KEY;

  if (!crmUrl || !crmKey) {
    return new Response(
      JSON.stringify({ message: 'CRM not configured on server' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const crmResponse = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': crmKey,
      },
      body: JSON.stringify(parsed.data),
    });

    if (!crmResponse.ok) {
      const error = await crmResponse.text();
      throw new Error(error || 'CRM request failed');
    }

    return new Response(JSON.stringify({ message: 'Lead submitted' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'CRM forwarding failed';
    return new Response(JSON.stringify({ message }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
