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
  params?: Record<string, string | number>; // Zmieniamy typ wartości na string | number
}

interface FetchError {
  status: string;
  message: string;
}

const createQueryString = (params: Record<string, string | number>): string => {
  const query = new URLSearchParams();
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      query.append(key, String(params[key])); // Konwertujemy wartość na string
    }
  }
  return query.toString();
};

export const baseQuery: BaseQueryFn<FetchArgs, unknown, FetchError> = async (
  args
) => {
  const token = localStorage.getItem('token');

  console.log(args);

  const queryString = args.params ? `?${createQueryString(args.params)}` : '';
  const urlWithParams = `${args.url}${queryString}`;

  try {
    const data = await fetchFromBackend<unknown>(urlWithParams, {
      method: args.method,
      body: args.body,
      headers: {
        ...args.headers,
        Authorization: token ? `Bearer ${token}` : '', // Dodajemy token JWT do nagłówków żądania
      },
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
