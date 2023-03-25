import { apiService } from './api';
import { sessionService } from './session';

export class InvalidCredentialException extends Error {}

export const authService = {
  async login(email, password) {
    const response = await apiService.fetchJson('POST', '/auth/login', {
      email,
      password,
    });

    if (response.status === 400) {
      throw new InvalidCredentialException((await response.json()).message);
    } else if (!response.ok) {
      throw new Error('Unknown error during logging in.');
    }

    return await response.json();
  },

  async sessionIsValid() {
    if (sessionService.getAccessToken() === null) {
      return false;
    }

    const response = await apiService.fetch('/auth/check_session', {
      method: 'POST',
    });

    return response.ok;
  },
};
