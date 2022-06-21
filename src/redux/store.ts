import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../containers/counter/counterSlice';
import configurator from './configurator';

export const store = configureStore( { reducer: { configurator } } );

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;
type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
( window as any ).store = store;

export type {
  AppDispatch,
  RootState,
  AppThunk
};
