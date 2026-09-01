const DEFAULT_API_ORIGIN = 'https://admin.probuildintim.com';

export const EVENT_SLUG = import.meta.env.VITE_EVENT_SLUG || 'probuild-intim-2026';

/** Normalize VITE_API_URL to always include /api prefix */
export function resolveApiBase() {
  const configured = (import.meta.env.VITE_API_URL || DEFAULT_API_ORIGIN).replace(/\/$/, '');
  if (configured.endsWith('/api')) return configured;
  return `${configured}/api`;
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
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

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
