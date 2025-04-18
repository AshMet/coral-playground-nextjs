/* eslint-disable import/no-cycle */
import type { ThunkAction, Action } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

import sessionReducer from "./sessionSlice";

export const store = configureStore({
  reducer: {
    session: sessionReducer,
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
