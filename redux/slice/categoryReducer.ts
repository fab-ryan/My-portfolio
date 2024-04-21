import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoryApi } from '../features';
import { CategoryResponses } from '@/types';



interface initialStateInterface {
  loading: boolean;
  data: CategoryResponses;
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

export const CategoryReducer = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      categoryApi.endpoints.getCategories.matchPending,
      (state, action) => {
        state.loading = true;
        state.error = '';
      },
    );
    builder.addMatcher(
      categoryApi.endpoints.getCategories.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
        state.loading = false;
      },
    );
    builder.addMatcher(
      categoryApi.endpoints.getCategories.matchRejected,
      (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    );
  },
});