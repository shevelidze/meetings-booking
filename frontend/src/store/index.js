import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import slotTypesReducer from './slices/slotTypes';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    slotTypes: slotTypesReducer,
  },
});
