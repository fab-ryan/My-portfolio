import {
  Action,
  configureStore,
  Store,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import rootReducer from './reducers';
import { blogApi, categoryApi, authApi, skillApi } from './features';
export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        immutableCheck: false,
        serializableCheck: false,
        ignoredActions: [REHYDRATE, FLUSH, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(blogApi.middleware)
      .concat(categoryApi.middleware)
      .concat(skillApi.middleware)
      .concat(authApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export type ThunkDispatchType = ThunkDispatch<RootState, any, Action<string>>;

export type StoreType = Store<RootState, Action<string>> & {
  dispatch: ThunkDispatchType;
};

export type ThunkActionType<T = Promise<void>> = ThunkAction<
  T,
  RootState,
  null,
  Action<string>
>;
