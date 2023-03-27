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
  async update() {},
  async delete() {},
};
