import { apiService } from './api';

export const slotRuleService = {
  async create(creation) {
    const response = await apiService.fetchJson('POST', '/slot_rule', creation);

    if (!response.ok) {
      throw new Error('Failed to create a slot rule.');
    }

    return await response.json();
  },
  async getAll() {
    const response = await apiService.fetch('/slot_rule');

    if (!response.ok) {
      throw new Error('Failed to get all slot rules.');
    }

    return await response.json();
  },
  async update(id, update) {
    const response = await apiService.fetchJson(
      'PATCH',
      `/slot_rule/${id}`,
      update
    );

    if (!response.ok) {
      throw new Error('Failed to update a slot rule.');
    }

    return await response.json();
  },
  async delete(id) {
    const response = await apiService.fetchJson('DELETE', `/slot_rule/${id}`);

    if (!response.ok) {
      throw new Error('Failed to delete a slot rule.');
    }
  },
};
