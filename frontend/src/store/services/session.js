const ACCESS_TOKEN_LOCAL_STORAGE_KEY = 'sessionAccessToken';

export const sessionService = {
  setAccessToken(token) {
    localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, token);
  },
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
  },
  clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
  },
};
