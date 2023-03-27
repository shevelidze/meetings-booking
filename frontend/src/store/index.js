import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth';
import slotTypesReducer from './slices/slotTypes';
import slotRulesReducer from './slices/slotRules';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    slotTypes: slotTypesReducer,
    slotRules: slotRulesReducer,
  },
});
