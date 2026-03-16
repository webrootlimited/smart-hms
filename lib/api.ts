import instance from "@/utils/instance";
import getToken from "@/auth/getToken";

async function authHeaders() {
  const token = await getToken();
  return { Authorization: `Bearer ${token}` };
}

export async function apiFetch<T = unknown>(url: string, params?: Record<string, string>): Promise<T> {
  const headers = await authHeaders();
  const { data } = await instance.get(url, { headers, params });
  return data;
}

export async function apiPut<T = unknown>(url: string, body?: unknown): Promise<T> {
  const headers = await authHeaders();
  const { data } = await instance.put(url, body, { headers });
  return data;
}

export async function apiPost<T = unknown>(url: string, body?: unknown): Promise<T> {
  const headers = await authHeaders();
  const { data } = await instance.post(url, body, { headers });
  return data;
}

export async function apiDelete<T = unknown>(url: string): Promise<T> {
  const headers = await authHeaders();
  const { data } = await instance.delete(url, { headers });
  return data;
}

export async function apiPatch<T = unknown>(url: string, body?: unknown): Promise<T> {
  const headers = await authHeaders();
  const { data } = await instance.patch(url, body, { headers });
  return data;
}
