import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import { initialState } from './models';
import reducer from './reducer';

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware(),
  preloadedState: initialState,
  devTools: !IS_PRODUCTION_BUILD
});

export type DispatchType = typeof store.dispatch;

export default store;
