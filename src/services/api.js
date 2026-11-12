import { config } from '../config.js';

/** Reenvía una petición a la API en Rust y devuelve { status, body }. */
export async function forward(method, path, { body, authorization } = {}) {
  const headers = { Accept: 'application/json' };
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (authorization) headers.Authorization = authorization;

  const res = await fetch(`${config.apiUrl}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { error: text }; }
  return { status: res.status, body: data };
}
