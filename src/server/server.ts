interface BackendError {
  message: string;
  statusCode?: number;
}

const isDev = import.meta.env.VITE_REACT_APP_MODE === 'development';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown> | Array<unknown>;
  headers?: Record<string, string>;
}

export async function fetchFromBackend<T = never>(
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
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(
    `${isDev ? import.meta.env.VITE_REACT_APP_DEV_URL : import.meta.env.VITE_REACT_APP_PROD_URL}/${endpoint}`,
    config
  );

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
