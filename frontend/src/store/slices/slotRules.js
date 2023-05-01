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

export function deleteSlotRule(id) {
  return async (dispatch, getState) => {
    dispatch(slotRulesPending());

    await slotRuleService.delete(id);

    dispatch(
      slotRulesLoaded(
        selectSlotRules(getState()).value.filter(
          (filterSlotRule) => filterSlotRule.id !== id
        )
      )
    );
  };
}

export function updateSlotRule(id, update) {
  return async (dispatch, getState) => {
    dispatch(slotRulesPending());

    const updatedSlotRule = await slotRuleService.update(id, update);

    dispatch(
      slotRulesLoaded(
        selectSlotRules(getState()).value.map((mapSlotRule) => {
          return mapSlotRule.id !== id ? mapSlotRule : updatedSlotRule;
        })
      )
    );
  };
}

export function selectSlotRules(state) {
  return state.slotRules;
}

export default slotRulesSlice.reducer;
