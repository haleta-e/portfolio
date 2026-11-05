export function getAdminToken(): string {
  return localStorage.getItem('adminToken') || 'admin-auth-token-active-2026';
}

export function getAdminHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
  const token = getAdminToken();
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'X-Admin-Auth': token,
    ...customHeaders,
  };
}

export async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = getAdminToken();
  const isFormData = options.body instanceof FormData;

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${token}`,
    'X-Admin-Auth': token,
    ...(options.headers as Record<string, string> || {}),
  };

  if (!isFormData && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  return fetch(url, {
    credentials: 'include',
    ...options,
    headers,
  });
}
