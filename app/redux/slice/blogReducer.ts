import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { blogApi } from '../features';
import { BlogResponses } from '@/types';

interface initialStateInterface {
  loading: boolean;
  data: BlogResponses;
  error?: string;
}
const initialState: initialStateInterface = {
  loading: false,
  data: {
    success: false,
    data: [],
    message: '',
    statusCode: 0,
  },
  error: '',
} as initialStateInterface;

export const BlogsReducer = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      blogApi.endpoints.getBlogs.matchPending,
      (state, action) => {
        state.loading = true;
        state.error = '';
      },
    );
    builder.addMatcher(
      blogApi.endpoints.getBlogs.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
        state.loading = false;
      },
    );
    builder.addMatcher(
      blogApi.endpoints.getBlogs.matchRejected,
      (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    );

    builder.addMatcher(
      blogApi.endpoints.getAdminBlogs.matchPending,
      (state, action) => {
        state.loading = true;
        state.error = '';
      },
    );
    builder.addMatcher(
      blogApi.endpoints.getAdminBlogs.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
        state.loading = false;
      },
    );
    builder.addMatcher(
      blogApi.endpoints.getAdminBlogs.matchRejected,
      (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    );
    builder.addMatcher(
      blogApi.endpoints.UpdateBlog.matchPending,
      (state, action) => {
        state.loading = true;
        state.error = '';
      },
    );
    builder.addMatcher(
      blogApi.endpoints.UpdateBlog.matchFulfilled,
      (state, action) => {
        const updatedBlog = action.payload.data;
        const index = state.data.data.findIndex(
          (blog) => blog._id === updatedBlog._id,
        );
        state.data.data[index] = updatedBlog;
        state.loading = false;
      },
    );

    builder.addMatcher(blogApi.endpoints.changeBlogStatus.matchFulfilled, (state, action) => {
      const updatedBlog = action.payload.data;
      const index = state.data.data.findIndex((blog) => blog._id === updatedBlog._id);
      state.data.data[index] = updatedBlog;
    })
    builder.addMatcher(blogApi.endpoints.changeBlogStatus.matchRejected, (state, action) => {
      state.error = action.error.message;
    })
    builder.addMatcher(blogApi.endpoints.deleteBlog.matchFulfilled, (state, action) => {
      const deletedBlog = action.payload.data;
      state.data.data = state.data.data.filter((blog) => blog._id !== deletedBlog._id);
    })
    builder.addMatcher(blogApi.endpoints.deleteBlog.matchRejected, (state, action) => {
      state.error = action.error.message;
    })
  },
});
