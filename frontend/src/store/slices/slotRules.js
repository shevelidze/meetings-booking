import { createSlice } from '@reduxjs/toolkit';

import { slotRuleService } from '../services';

const slotRulesSlice = createSlice({
  name: 'slotRules',
  initialState: {
    status: 'idle',
    value: [],
  },
  reducers: {
    loading(state) {
      state.status = 'loading';
    },
    loaded(state, action) {
      state.status = 'loaded';
      state.value = action.payload;
    },
    pending(state) {
      state.status = 'pending';
    },
  },
});

export const {
  loaded: slotRulesLoaded,
  loading: slotRulesLoading,
  pending: slotRulesPending,
} = slotRulesSlice.actions;

export function loadSlotRules() {
  return async (dispatch) => {
    dispatch(slotRulesLoading());

    const slotRules = await slotRuleService.getAll();

    dispatch(slotRulesLoaded(slotRules));
  };
}

export function createSlotRule(creation) {
  return async (dispatch, getState) => {
    dispatch(slotRulesPending());

    const newSlotRule = await slotRuleService.create(creation);

    dispatch(
      slotRulesLoaded([...selectSlotRules(getState()).value, newSlotRule])
    );
  };
}

export function selectSlotRules(state) {
  return state.slotRules;
}

export default slotRulesSlice.reducer;
