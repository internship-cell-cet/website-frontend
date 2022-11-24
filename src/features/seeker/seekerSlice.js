import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { appliedJobsAPI, fetchProvidersAPI, recentJobsAPI, searchJobsAPI } from './seekerAPIs';

const initialState = { provider: null };

export const recentJobs = createAsyncThunk(
  'job/recentJobs',
  async (thunkAPI) => {
    try {
      const result = await recentJobsAPI();
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const appliedJobs = createAsyncThunk(
  'job/appliedJobs',
  async (thunkAPI) => {
    try {
      const result = await appliedJobsAPI();
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchProviders = createAsyncThunk(
  'seekers/fetchProviders',
  async (data, thunkAPI) => {
    try {
      const result = await fetchProvidersAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const searchJobs = createAsyncThunk(
  'seekers/searchJobs',
  async (data, thunkAPI) => {
    try {
      const result = await searchJobsAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const seekerSlice = createSlice({
  name: 'providers',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {},
  extraReducers: {
    [fetchProviders.fulfilled]: (state, action) => {
      state.provider = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export default seekerSlice.reducer;
