import { combineReducers } from '@reduxjs/toolkit';
import { BlogsReducer,CategoryReducer, AuthReducer,skillReducer } from './slice';
import { blogApi,categoryApi, authApi, skillApi } from './features';

const rootReducer = combineReducers({
  [blogApi.reducerPath]: blogApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [skillApi.reducerPath]: skillApi.reducer,
  blogs: BlogsReducer.reducer,
  categories: CategoryReducer.reducer,
  auth: AuthReducer.reducer,
  skills: skillReducer.reducer,
});

export default rootReducer;
