import { createSlice } from '@reduxjs/toolkit';

import { userService } from '../services';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    status: 'idle',
    value: null,
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
  loaded: userLoaded,
  loading: userLoading,
  pending: userPending,
} = userSlice.actions;

export function loadUser() {
  return async (dispatch) => {
    dispatch(userLoading());

    const user = await userService.getUser();

    dispatch(userLoaded(user));
  };
}

export function updateUser(updateUserDto) {
  return async (dispatch) => {
    dispatch(userLoading());

    const user = await userService.updateUser(updateUserDto);

    dispatch(userLoaded(user));
  };
}


export function selectUser(state) {
  return state.user;
}

export default userSlice.reducer;
