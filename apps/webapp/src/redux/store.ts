import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reducer from './root';
import storage from 'redux-persist/lib/storage/session';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['enrollSlice', 'userSlice'],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
