'use client';

/**
 * Patches the global fetch() to prepend the Next.js basePath to absolute /api/* paths.
 * This is needed because Next.js basePath only auto-prefixes <Link> and router navigation,
 * NOT raw fetch() calls. Without this, fetch('/api/foo') goes to the wrong host when
 * the app runs under a subpath like /classroom.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

if (typeof window !== 'undefined' && basePath) {
  const originalFetch = window.fetch;
  window.fetch = function patchedFetch(
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> {
    if (typeof input === 'string' && input.startsWith('/') && !input.startsWith(basePath + '/')) {
      return originalFetch.call(this, `${basePath}${input}`, init);
    }
    return originalFetch.call(this, input, init);
  };
}

export function FetchPatch() {
  return null;
}
