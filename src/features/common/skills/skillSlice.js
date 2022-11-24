import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSkillsAPI } from './skillAPI';

const initialState = {
  skills: null,
  isLoadingSkills: false,
};

export const getSkills = createAsyncThunk(
  'users/getSkills',
  async (thunkAPI) => {
    try {
      const result = await getSkillsAPI();
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const skillSlice = createSlice({
  name: 'skills',
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {},
  extraReducers: {
    [getSkills.pending]: (state) => {
      state.isLoadingSkills = true;
    },
    [getSkills.fulfilled]: (state, action) => {
      state.skills = action.payload;
      state.isLoadingSkills = false;
    },
    [getSkills.rejected]: (state) => {
      state.isLoadingSkills = false;
    },
  },
  /* eslint-enable no-param-reassign */
});

export default skillSlice.reducer;
