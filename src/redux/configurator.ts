import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RootState, AppThunk } from '../../redux/store';
import { RGBColor } from 'react-color';
export type colors = {[key: string]: RGBColor}

export interface ConfiguratorState {
  selectedObject: string | null;
  colors: colors;
  path: string;
}

const initialState: ConfiguratorState = {
  selectedObject: null,
  colors: {},
  path: 'assets/scene1/'
};

export const configuratorSlice = createSlice( {
  name: 'configurator',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setSelectedObject: ( state, action: PayloadAction<string | null> ) => {
      state.selectedObject = action.payload;
    },
    setColors: ( state, action: PayloadAction<colors> ) => {
      state.colors = action.payload;
    },
    setColorById: ( state, action: PayloadAction<{uuid: string, color: RGBColor}> ) => {
      state.colors = { ...state.colors, [ action.payload.uuid ]: action.payload.color };
    },
    deleteColorById: ( state, action: PayloadAction<{uuid: string}> ) => {
      Reflect.deleteProperty( state.colors, action.payload.uuid );
    },
    setPath: ( state, action: PayloadAction<string> ) => {
      state.path = action.payload;
    }
  }
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: ( builder ) => {
  // }
} );

export const { setSelectedObject, setColors, setColorById, deleteColorById, setPath } = configuratorSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = ( state: RootState ) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = ( amount: number ): AppThunk => (
//   dispatch,
//   getState
// ) => {
//   const currentValue = selectCount( getState() );
//   if ( currentValue % 2 === 1 ) {
//     dispatch( incrementByAmount( amount ) );
//   }
// };

export default configuratorSlice.reducer;
( window as any ).configuratorSlice = configuratorSlice;
