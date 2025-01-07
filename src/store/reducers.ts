import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { apiReducers } from './services/service.reducers';
import { sliceReducers } from './slices/slice.reducers';
import storage from './storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['lang', 'sidebar', 'theme', 'auth'],
};

const reducers = combineReducers({
  ...sliceReducers,
  ...apiReducers,
});

export const rootReducer = persistReducer(persistConfig, reducers);
