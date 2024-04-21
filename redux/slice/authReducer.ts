import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../features';
import { AuthResponse } from '@/types';

interface initialStateInterface {
  loading: boolean;
  data: AuthResponse;
  error?: string;
}

const initialState: initialStateInterface = {
  loading: false,
  data: {
    success: false,
    data: {
      access_token: '',
      role:''
    },
    message: '',
    statusCode: 0,
  },
  error: '',
} as initialStateInterface;

export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('token');
  return;
});

export const AuthReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchPending,
      (state, action) => {
        state.loading = true;
        state.error = '';
      },
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
        state.loading = false;
      },
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    );
   
  },
});

