import { createSlice } from '@reduxjs/toolkit';

import { slotTypeService } from '@/store/services';

const slotTypesSlice = createSlice({
  name: 'slotTypes',
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
  loaded: slotTypesLoaded,
  loading: slotTypesLoading,
  pending: slotTypesPending,
} = slotTypesSlice.actions;

export function loadSlotTypes() {
  return async (dispatch) => {
    dispatch(slotTypesLoading());

    const slotTypes = await slotTypeService.getAll();

    dispatch(slotTypesLoaded(slotTypes));
  };
}

export function createSlotType(creation) {
  return async (dispatch, getState) => {
    dispatch(slotTypesPending());

    const newSlotType = await slotTypeService.create(creation);

    dispatch(
      slotTypesLoaded([...selectSlotTypes(getState()).value, newSlotType])
    );
  };
}

export function deleteSlotType(id) {
  return async (dispatch, getState) => {
    dispatch(slotTypesPending());

    await slotTypeService.delete(id);

    dispatch(
      slotTypesLoaded(
        selectSlotTypes(getState()).value.filter(
          (filterSlotType) => filterSlotType.id !== id
        )
      )
    );
  };
}

export function updateSlotType(id, update) {
  return async (dispatch, getState) => {
    dispatch(slotTypesPending());

    const updatedSlotType = await slotTypeService.update(id, update);

    dispatch(
      slotTypesLoaded(
        selectSlotTypes(getState()).value.map((mapSlotType) => {
          return mapSlotType.id !== id ? mapSlotType : updatedSlotType;
        })
      )
    );
  };
}

export function selectSlotTypes(state) {
  return state.slotTypes;
}

export default slotTypesSlice.reducer;
