/* Basic fetch wrapper for API calls. */
import {env} from '../env';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const buildUrl = path => {
  if (path.startsWith('http')) {
    return path;
  }
  const base = env.apiBaseUrl.replace(/\/$/, '');
  const cleanedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanedPath}`;
};

const handleResponse = async response => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(data?.message || 'Request failed');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

const request = async (method, path, {body, headers, token} = {}) => {
  const url = buildUrl(path);
  const mergedHeaders = {...defaultHeaders, ...headers};

  if (token) {
    mergedHeaders.Authorization = `Bearer ${token}`;
  }

  const options = {
    method,
    headers: mergedHeaders,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  return handleResponse(response);
};

export const apiClient = {
  get: (path, options) => request('GET', path, options),
  post: (path, body, options = {}) => request('POST', path, {...options, body}),
  put: (path, body, options = {}) => request('PUT', path, {...options, body}),
  del: (path, options) => request('DELETE', path, options),
};

export default apiClient;
