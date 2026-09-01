const PRODUCTION_API_ORIGIN = 'https://admin.probuildintim.com';

export const EVENT_SLUG = import.meta.env.VITE_EVENT_SLUG || 'probuild-intim-2026';

/** Dev → Vite proxy (/api). Production → always admin.probuildintim.com */
export function resolveApiBase() {
  if (import.meta.env.DEV) return '/api';

  const origin = PRODUCTION_API_ORIGIN.replace(/\/$/, '');
  return origin.endsWith('/api') ? origin : `${origin}/api`;
}

export function resolveApiUrl(path) {
  const base = resolveApiBase();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export class VisitorRsvpError extends Error {
  constructor(message, { status, errors } = {}) {
    super(message);
    this.name = 'VisitorRsvpError';
    this.status = status;
    this.errors = errors;
  }
}

/** Parse Nuxt/H3 error body (errors may live under data.data.errors) */
function parseApiErrorBody(data, httpStatus) {
  const status = data?.statusCode ?? httpStatus;
  const message =
    data?.data?.message ||
    data?.message ||
    `HTTP ${status}`;
  const errors = data?.data?.errors ?? data?.errors ?? null;
  return { status, message, errors };
}

function parseSuccessBody(data) {
  return {
    success: data?.success ?? true,
    message: data?.message || data?.data?.message || '',
    registrationId: data?.registrationId || data?.data?.registrationId || '',
  };
}

/** Map Laravel-style API validation errors to form field keys */
export function mapApiErrors(apiErrors) {
  if (!apiErrors || typeof apiErrors !== 'object') return {};

  const mapped = {};
  for (const [key, messages] of Object.entries(apiErrors)) {
    const msg = Array.isArray(messages) ? messages[0] : String(messages);

    const groupMatch = key.match(/^groupMembers\.(\d+)\.(\w+)$/);
    if (groupMatch) {
      mapped[`groupMember_${groupMatch[2]}_${groupMatch[1]}`] = msg;
      continue;
    }

    mapped[key] = msg;
  }
  return mapped;
}

async function postVisitorPayload(url, payload) {
  const pageOrigin = typeof window !== 'undefined' ? window.location.origin : 'ssr';
  let requestOrigin = '';
  try {
    requestOrigin = new URL(url).origin;
  } catch {
    requestOrigin = 'invalid-url';
  }
  const isCrossOrigin = pageOrigin !== 'ssr' && requestOrigin !== pageOrigin;

  // #region agent log
  fetch('http://127.0.0.1:7639/ingest/7916bf69-6717-459c-8dcf-e3d38511f257',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f52846'},body:JSON.stringify({sessionId:'f52846',runId:'post-fix',hypothesisId:'H6',location:'visitorRegistrationApi.js:postVisitorPayload:pre-fetch',message:'RSVP request starting',data:{url,resolvedBase:resolveApiBase(),pageOrigin,isDev:import.meta.env.DEV,bakedViteApiUrl:import.meta.env.VITE_API_URL||null},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch (fetchErr) {
    // #region agent log
    fetch('http://127.0.0.1:7639/ingest/7916bf69-6717-459c-8dcf-e3d38511f257',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f52846'},body:JSON.stringify({sessionId:'f52846',runId:'pre-fix',hypothesisId:'H2-H4',location:'visitorRegistrationApi.js:postVisitorPayload:fetch-error',message:'Fetch failed (likely CORS/network)',data:{url,isCrossOrigin,errorName:fetchErr?.name,errorMessage:fetchErr?.message},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    throw fetchErr;
  }

  const data = await res.json().catch(() => ({}));

  // #region agent log
  fetch('http://127.0.0.1:7639/ingest/7916bf69-6717-459c-8dcf-e3d38511f257',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f52846'},body:JSON.stringify({sessionId:'f52846',runId:'post-fix',hypothesisId:'H3-H5',location:'visitorRegistrationApi.js:postVisitorPayload:response',message:'RSVP response received',data:{url,status:res.status,ok:res.ok,isCrossOrigin,apiMessage:data?.message||data?.data?.message||null},timestamp:Date.now()})}).catch(()=>{});
  // #endregion

  if (!res.ok) {
    const { status, message, errors } = parseApiErrorBody(data, res.status);
    throw new VisitorRsvpError(message, { status, errors });
  }

  return parseSuccessBody(data);
}

export async function submitVisitorRsvp(payload) {
  const endpoints = [
    '/visitor-rsvp',
    `/events/${EVENT_SLUG}/visitors`,
  ];

  let lastError;

  for (let i = 0; i < endpoints.length; i += 1) {
    const path = endpoints[i];
    try {
      return await postVisitorPayload(resolveApiUrl(path), payload);
    } catch (err) {
      if (!(err instanceof VisitorRsvpError)) {
        throw new VisitorRsvpError(
          'Gagal terhubung ke server. Periksa koneksi internet Anda.',
          { status: 0 }
        );
      }

      lastError = err;

      // Try generic event endpoint if shortcut alias returns 404
      if (i === 0 && err.status === 404) continue;

      throw err;
    }
  }

  throw lastError;
}
