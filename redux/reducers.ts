import { combineReducers } from '@reduxjs/toolkit';
import { BlogsReducer,CategoryReducer, AuthReducer,skillReducer,commentsSlice, likeSlice } from './slice';
import { blogApi,categoryApi, authApi, skillApi,commentApi,likeApi, queriesApi, projectApi } from './features';

const rootReducer = combineReducers({
  [blogApi.reducerPath]: blogApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [skillApi.reducerPath]: skillApi.reducer,
  [commentApi.reducerPath]: commentApi.reducer,
  [likeApi.reducerPath]: likeApi.reducer,
  [queriesApi.reducerPath]: queriesApi.reducer,
  [projectApi.reducerPath]: projectApi.reducer,
  blogs: BlogsReducer.reducer,
  categories: CategoryReducer.reducer,
  auth: AuthReducer.reducer,
  skills: skillReducer.reducer,
  comments: commentsSlice.reducer,
  likes: likeSlice.reducer,
});

export default rootReducer;
