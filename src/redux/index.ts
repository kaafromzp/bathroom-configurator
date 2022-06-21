export type { AppDispatch, RootState, AppThunk } from './store';

export {
  setSelectedObject,
  setColors,
  setColorById,
  deleteColorById,
  setPath,
  configuratorSlice
} from './configurator';
export type { ConfiguratorState } from './configurator';
export { useAppDispatch, useAppSelector } from './hooks';
export { store } from './store';
