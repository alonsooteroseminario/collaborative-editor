'use client';

import appSuiteSlice from '@/app/store/slice/appSuiteSlice';
import formSlice from '@/app/store/slice/formSlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    appSuite: appSuiteSlice,
    form: formSlice
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false, // This disables the SerializableStateInvariantMiddleware
  }),
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;