import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterReducer from '../containers/counter/counterSlice';
import configurator from '../containers/Configurator/redux';

export const store = configureStore( { reducer: { configurator } } );

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
( window as any ).store = store;
