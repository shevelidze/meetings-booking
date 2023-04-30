import { apiService } from './api';

export class UserServiceError extends Error {}

export const userService = {
  async getUser() {
    const response = await apiService.fetch(`/user`);

    if (!response.ok) {
      throw new UserServiceError('Failed to get user information.');
    }

    return await response.json();
  },

  async updateUser(updateUserDto) {
    const response = await apiService.fetchJson('POST', `/user`, updateUserDto);

    if (!response.ok) {
      throw new UserServiceError('Failed to update user information.');
    }

    return await response.json();
  },
};