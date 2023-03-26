import { createSlice } from '@reduxjs/toolkit';

import { authService, InvalidCredentialException } from '../services';
import { sessionService } from '../services/session';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {
    authorized: (state) => {
      state.status = 'authorized';
      state.error = null;
    },
    unauthorized: (state) => {
      state.status = 'unauthorized';
      state.error = null;
    },
    restoringSession: (state) => {
      state.status = 'restoringSession';
      state.error = null;
    },
    pending: (state) => {
      state.status = 'pending';
      state.error = null;
    },
    error: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const { authorized, restoringSession, unauthorized, pending, error } =
  authSlice.actions;

export function restoreSession() {
  return async (dispatch) => {
    dispatch(restoringSession());

    dispatch(
      (await authService.sessionIsValid()) ? authorized() : unauthorized()
    );
  };
}

export function login(email, password) {
  return async (dispatch) => {
    dispatch(pending());

    try {
      const loginResult = await authService.login(email, password);

      if (loginResult !== null) {
        sessionService.setAccessToken(loginResult.accessToken);
        dispatch(authorized());
      } else {
        dispatch(unauthorized());
      }
    } catch (e) {
      if (e instanceof InvalidCredentialException) {
        dispatch(error(e.message));
      } else {
        throw e;
      }
    }
  };
}

export function logout() {
  return async (dispatch) => {
    sessionService.clearAccessToken();
    dispatch(unauthorized());
  };
}

export function selectAuth(state) {
  return state.auth;
}

export default authSlice.reducer;
