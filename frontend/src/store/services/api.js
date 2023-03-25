import { sessionService } from './session';

const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export const apiService = {
  fetch(input, init) {
    return fetch(API_BASE_URL + input, {
      ...init,
      headers: {
        Authorization: `Bearer ${sessionService.getAccessToken()}`,
        ...init.headers,
      },
    });
  },
  fetchJson(method, input, body) {
    return this.fetch(input, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },
};
