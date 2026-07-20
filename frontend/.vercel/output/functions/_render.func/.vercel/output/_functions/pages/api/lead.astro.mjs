import { l as leadSchema } from '../../chunks/crm_DiyeKSRM.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  {
    return new Response(
      JSON.stringify({ message: "CRM not configured on server" }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
