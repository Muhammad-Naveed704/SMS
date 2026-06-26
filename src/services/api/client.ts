import type { AxiosRequestConfig } from "axios";
import { api } from "./axios";
import type { ApiResponse } from "./types";

/** Typed GET — unwraps `{ success, data }` envelope */
export async function apiGet<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.get<ApiResponse<T>>(url, config);
  return response.data.data;
}

/** Typed POST */
export async function apiPost<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.post<ApiResponse<T>>(url, body, config);
  return response.data.data;
}

/** Typed PATCH */
export async function apiPatch<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig
): Promise<T> {
  const response = await api.patch<ApiResponse<T>>(url, body, config);
  return response.data.data;
}

/** Typed DELETE */
export async function apiDelete<T = null>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const response = await api.delete<ApiResponse<T>>(url, config);
  return response.data.data;
}
