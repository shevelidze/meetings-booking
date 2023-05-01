import { apiService } from './api';

export const slotTypeService = {
  async create(creation) {
    const response = await apiService.fetchJson('POST', '/slot_type', creation);

    if (!response.ok) {
      throw new Error('Failed to create a slot type.');
    }

    return await response.json();
  },
  async getAll() {
    const response = await apiService.fetch('/slot_type', { method: 'GET' });

    if (!response.ok) {
      throw new Error('Failed to get all slot types.');
    }

    return await response.json();
  },
  async update(id, update) {
    const response = await apiService.fetchJson(
      'PATCH',
      `/slot_type/${id}`,
      update
    );

    if (!response.ok) {
      throw new Error('Failed to update a slot type.');
    }

    return await response.json();
  },
  async delete(id) {
    const response = await apiService.fetchJson('DELETE', `/slot_type/${id}`);

    if (!response.ok) {
      throw new Error('Failed to delete a slot type.');
    }
  },
};
