interface BackendError {
  message: string;
  statusCode?: number;
}

const baseUrl = 'https://hammerhead-app-jouqe.ondigitalocean.app';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown> | Array<unknown>;
  headers?: Record<string, string>;
}

export async function fetchFromBackend<T = never>(
  endpoint: string,
  { method = 'GET', body, headers = {} }: FetchOptions = {}
): Promise<T> {
  const apiKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY as string;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey, // Dodajemy klucz API do nagłówków
      ...headers,
    },
  };

  console.log(config.headers);

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${baseUrl}/${endpoint}`, config);

  if (!response.ok) {
    let error: BackendError;
    try {
      const errorData: BackendError = await response.json();
      error = {
        message: errorData.message,
        statusCode: response.status,
      };
    } catch {
      error = {
        message: 'Error fetching data',
        statusCode: response.status,
      };
    }
    throw error;
  }
  return (await response.json()) as T;
}
