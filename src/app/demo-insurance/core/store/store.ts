import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import clientReducer from '../../general/client/clientSlice';
import insuranceTypeReducer from '../../general/insurance-type/insuranceTypeSlice';
import insurancePolicyReducer from '../../general/insurance-policy/insurancePolicySlice';

export const store = configureStore({
  reducer: {
    clients: clientReducer,
    insuranceTypes: insuranceTypeReducer,
    insurancePolicies: insurancePolicyReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
