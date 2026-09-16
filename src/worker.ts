interface AssetFetcher {
  fetch(request: Request): Promise<Response>;
}

interface Env {
  ASSETS: AssetFetcher;
}

const securityHeaders: Record<string, string> = {
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Cross-Origin-Opener-Policy': 'same-origin',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.protocol === 'http:') {
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }
    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    for (const [key, value] of Object.entries(securityHeaders)) {
      headers.set(key, value);
    }

    if (/\.(?:avif|webp|png|jpe?g|svg|ico|woff2?)$/i.test(url.pathname)) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (response.ok) {
      headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies {
  fetch(request: Request, env: Env): Promise<Response>;
};
