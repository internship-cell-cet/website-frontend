import { createAsyncThunk } from '@reduxjs/toolkit';
import { createJobAPI, fetchApplicantDetailsAPI, providedJobsAPI, selectApplicantAPI, hireApplicantAPI } from './providerAPIs';

export const createJob = createAsyncThunk(
  'job/createJob',
  async (data, thunkAPI) => {
    try {
      const result = await createJobAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const providedJobs = createAsyncThunk(
  'job/providedJobs',
  async (thunkAPI) => {
    try {
      const result = await providedJobsAPI();
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchApplicants = createAsyncThunk(
  'job/fetchApplicants',
  async (data, thunkAPI) => {
    try {
      const result = await fetchApplicantDetailsAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const selectApplicant = createAsyncThunk(
  'job/selectApplicant',
  async (data, thunkAPI) => {
    try {
      const result = await selectApplicantAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const hireApplicant = createAsyncThunk(
  'job/hireApplicant',
  async (data, thunkAPI) => {
    try {
      const result = await hireApplicantAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
