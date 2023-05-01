import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import slotTypesReducer from './slices/slotTypes';
import slotRulesReducer from './slices/slotRules';
import userReducer from './slices/user';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    slotTypes: slotTypesReducer,
    slotRules: slotRulesReducer,
    user: userReducer
  },
});
