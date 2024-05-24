import { BaseQueryFn } from '@reduxjs/toolkit/query';

export interface BackendError {
  message: string;
  statusCode?: number;
}

export const baseURL =
  import.meta.env.VITE_REACT_APP_MODE === 'development'
    ? import.meta.env.VITE_REACT_APP_DEV_URL
    : import.meta.env.VITE_REACT_APP_PROD_URL;

export interface FetchOptions<T = unknown> {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: T;
  headers?: HeadersInit;
}

export interface ApiResponse<T> {
  data: T;
  error?: { message: string };
}

export async function fetchFromBackend<T>(
  endpoint: string,
  { method = 'GET', body, headers = {} }: FetchOptions = {}
): Promise<T> {
  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': import.meta.env.VITE_REACT_APP_API_KEY,
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(`${baseURL}/${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: 'Error parsing error response' }));
    throw new Error(
      JSON.stringify({
        status: response.status.toString(),
        message: errorData.message,
      })
    );
  }

  return (await response.json()) as Promise<T>;
}

interface FetchArgs {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  headers?: HeadersInit;
}

interface FetchError {
  status: string;
  message: string;
}

export const baseQuery: BaseQueryFn<FetchArgs, unknown, FetchError> = async (
  args
) => {
  try {
    const data = await fetchFromBackend<unknown>(args.url, {
      method: args.method,
      body: args.body,
      headers: args.headers,
    });
    return { data };
  } catch (error) {
    const e = error as BackendError;
    return {
      error: {
        status: e.statusCode?.toString() || 'FETCH_ERROR',
        message: e.message,
      },
    };
  }
};
