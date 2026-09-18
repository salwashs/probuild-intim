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
  constructor(message, { status, errors, detail } = {}) {
    super(message);
    this.name = 'VisitorRsvpError';
    this.status = status;
    this.errors = errors;
    this.detail = detail || '';
  }
}

/** Parse Nuxt/H3 error body (errors may live under data.data.errors) */
function parseApiErrorBody(data, httpStatus) {
  const status = data?.statusCode ?? httpStatus;
  const message =
    data?.data?.message ||
    data?.message ||
    (typeof data?.raw === 'string' && data.raw.trim()
      ? data.raw.trim().slice(0, 180)
      : `HTTP ${status}`);
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

/** Map API validation errors to form field keys */
export function mapApiErrors(apiErrors) {
  if (!apiErrors || typeof apiErrors !== 'object') return {};

  const mapped = {};
  for (const [key, messages] of Object.entries(apiErrors)) {
    mapped[key] = Array.isArray(messages) ? messages[0] : String(messages);
  }
  return mapped;
}

function buildErrorDetail(url, httpStatus, data, rawText) {
  const parts = [
    `URL: ${url}`,
    `HTTP: ${httpStatus}`,
  ];
  if (data && typeof data === 'object' && Object.keys(data).length > 0) {
    try {
      parts.push(`Body: ${JSON.stringify(data, null, 2)}`);
    } catch {
      parts.push(`Body: ${String(rawText || '').slice(0, 2000)}`);
    }
  } else if (rawText) {
    parts.push(`Body: ${String(rawText).slice(0, 2000)}`);
  }
  return parts.join('\n');
}

async function postVisitorPayload(url, payload) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const rawText = await res.text();
  let data = {};
  try {
    data = rawText ? JSON.parse(rawText) : {};
  } catch {
    data = { raw: rawText };
  }

  if (!res.ok) {
    const { status, message, errors } = parseApiErrorBody(data, res.status);
    // #region agent log
    fetch('http://127.0.0.1:7366/ingest/b4c9394e-995b-4ebb-be2d-e3f30facecf0',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'a40deb'},body:JSON.stringify({sessionId:'a40deb',runId:'pre-fix',hypothesisId:'A',location:'visitorRegistrationApi.js:postVisitorPayload',message:'Visitor API error',data:{url,httpStatus:res.status,status,message,errorKeys:errors?Object.keys(errors):[],requiredLikeErrors:errors||null},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    throw new VisitorRsvpError(message, {
      status,
      errors,
      detail: buildErrorDetail(url, res.status, data, rawText),
    });
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
          {
            status: 0,
            detail: err instanceof Error ? err.message : String(err),
          }
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
