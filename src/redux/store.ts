import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import 'immutable';
import {persistReducer, persistStore} from 'redux-persist';
import toastReducer from './slice/toast-slice';


const rootReducer = combineReducers({
  toast: toastReducer,
  
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['toast'],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  // devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
const persistor = persistStore(store);
persistor.flush();
export const storeDispatch = store.dispatch;
export const storeState = store.getState;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default {store, persistor};
