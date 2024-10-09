import { combineReducers } from '@reduxjs/toolkit';
import enrollSlice from './slices/enroll';
import userSlice from './slices/user';
import navigationSlice from './slices/navigation';

const reducer = combineReducers({
  enrollSlice,
  userSlice,
  navigationSlice,
});

export type ReducerType = ReturnType<typeof reducer>;
export default reducer;
