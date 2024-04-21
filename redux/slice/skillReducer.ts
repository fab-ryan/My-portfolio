import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { skillApi } from '../features';
import { SkillResponses } from '@/types';

interface initialStateInterface {
  loading: boolean;
  data: SkillResponses;
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

export const skillReducer = createSlice({
  name: 'skill',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      skillApi.endpoints.getSkills.matchPending,
      (state, action) => {
        state.loading = true;
        state.error = '';
      },
    );
    builder.addMatcher(
      skillApi.endpoints.getSkills.matchFulfilled,
      (state, action) => {
        state.data = action.payload;
        state.loading = false;
      },
    );
    builder.addMatcher(
      skillApi.endpoints.getSkills.matchRejected,
      (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      },
    );
    builder.addMatcher(
      skillApi.endpoints.createSkill.matchFulfilled,
      (state, action) => {
        state.data.data.push(action.payload.data);
      },
    );
    builder.addMatcher(
      skillApi.endpoints.updateSkill.matchFulfilled,
      (state, action) => {
        const index = state.data.data.findIndex(
          (skill) => skill._id === action.payload.data._id,
        );
        state.data.data[index] = action.payload.data;
      },
    );
    builder.addMatcher(
      skillApi.endpoints.deleteSkill.matchFulfilled,
      (state, action) => {
        state.data.data = state.data.data.filter(
          (skill) => skill._id !== action.payload.data._id,
        );
      },
    );
  },
});
