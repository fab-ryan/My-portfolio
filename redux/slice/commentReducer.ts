import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { commentApi, likeApi } from '../features';
import { CommentsResponse, LikesResponse } from '@/types';

interface initialStateInterface {
  loading: boolean;
  data: CommentsResponse;
  error?: string;
}

const initialState: initialStateInterface = {
  loading: false,
  data: {
    data: [],
    statusCode: 0,
    message: '',
    success: false,
  },
};
interface initialStateLikeInterface {
  loading: boolean;
  data: LikesResponse;
  error?: string;
}

const initialStateLike: initialStateLikeInterface = {
  loading: false,
  data: {
    data: [],
    statusCode: 0,
    message: '',
    success: false,
  },
};

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      commentApi.endpoints.getComments.matchPending,
      (state) => {
        state.loading = true;
      },
    );
    builder.addMatcher(
      commentApi.endpoints.getComments.matchFulfilled,
      (state, action) => {
        state.loading = false;
        state.data = action.payload;
      },
    );
    builder.addMatcher(
      commentApi.endpoints.getComments.matchRejected,
      (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },
    );
    builder.addMatcher(
      commentApi.endpoints.createComment.matchFulfilled,
      (state, action) => {
        const currentData = state.data.data;
        currentData.push(action.payload.data);
        state.data = {
          ...state.data,
          data: currentData,
        };
      },
    );
  },
});

export const likeSlice = createSlice({
  name: 'likes',
  initialState: initialStateLike,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      likeApi.endpoints.like.matchFulfilled,
      (state, action) => {
        const currentData = state.data.data;
        currentData.push(action.payload.data);
      },
    );
    builder.addMatcher(
      likeApi.endpoints.like.matchRejected,
      (state, action) => {
        state.error = action.error.message;
      },
    );
    builder.addMatcher(likeApi.endpoints.getLikes.matchPending, (state) => {
      state.loading = true;
    });
    builder.addMatcher(
      likeApi.endpoints.getLikes.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
        state.loading = false;
      },
    );
    builder.addMatcher(
      likeApi.endpoints.getLikes.matchRejected,
      (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    );
  },
});

export const {} = commentsSlice.actions;
