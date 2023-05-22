import { createSlice } from '@reduxjs/toolkit';

import { slotRuleService } from '../services';
import { error } from './auth';

const slotRulesSlice = createSlice({
  name: 'slotRules',
  initialState: {
    status: 'idle',
    value: [],
    error: null,
  },
  reducers: {
    loading(state) {
      state.status = 'loading';
      state.error = null;
    },
    loaded(state, action) {
      state.status = 'loaded';
      state.value = action.payload;
      state.error = null;
    },
    pending(state) {
      state.status = 'pending';
      state.error = null;
    },
    error(state, action) {
      state.status = 'loaded';
      state.error = action.payload;
    },
  },
});

export const {
  loaded: slotRulesLoaded,
  loading: slotRulesLoading,
  pending: slotRulesPending,
  error: slotRulesError,
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

    try {
      const newSlotRule = await slotRuleService.create(creation);

      dispatch(
        slotRulesLoaded([...selectSlotRules(getState()).value, newSlotRule])
      );
    } catch (e) { 
      dispatch(slotRulesError(e?.message || "Unknown Error"));
    }
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

    try {
      const updatedSlotRule = await slotRuleService.update(id, update);

      dispatch(
        slotRulesLoaded(
          selectSlotRules(getState()).value.map((mapSlotRule) => {
            return mapSlotRule.id !== id ? mapSlotRule : updatedSlotRule;
          })
        )
      );
    } catch (e) {
      dispatch(slotRulesError(e?.message || "Unknown Error"));
    }
  };
}

export function selectSlotRules(state) {
  return state.slotRules;
}

export default slotRulesSlice.reducer;
