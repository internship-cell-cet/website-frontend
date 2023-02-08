import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  signinAPI,
  signupAPI,
  providerRegisterAPI,
  seekerRegisterAPI,
  checkIsAuthenticatedAPI,
  imageUploadAPI,
  resumeUploadAPI,
  applyJobAPI,
} from "./userAPIs";

const initialState = { user: null };

export const signin = createAsyncThunk(
  "users/signin",
  async (data, thunkAPI) => {
    try {
      const result = await signinAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "users/signup",
  async (data, thunkAPI) => {
    try {
      const result = await signupAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerProvider = createAsyncThunk(
  "users/providerReg",
  async (data, thunkAPI) => {
    try {
      const result = await providerRegisterAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerSeeker = createAsyncThunk(
  "users/seekerReg",
  async (data, thunkAPI) => {
    try {
      console.log('registerSeeker ',data);
      const result = await seekerRegisterAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const imageUpload = createAsyncThunk(
  "users/seekerImage",
  async (data, thunkAPI) => {
    try {
      const result = await imageUploadAPI(data);
      return result.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resumeUpload = createAsyncThunk(
  "users/seekerResume",
  async (data, thunkAPI) => {
    try {
      const result = await resumeUploadAPI(data);
      return result.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const authenticate = createAsyncThunk(
  "users/authenticate",
  async (thunkAPI) => {
    try {
      const result = await checkIsAuthenticatedAPI();
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const applyJob = createAsyncThunk(
  "users/applyJob",
  async (data, thunkAPI) => {
    try {
      const result = await applyJobAPI(data);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: "users",
  initialState,
  /* eslint-disable no-param-reassign */
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [signup.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [registerProvider.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [registerSeeker.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [authenticate.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [imageUpload.fulfilled]: (state, action) => {
      state.user.image = action.payload.image;
    },
    [resumeUpload.fulfilled]: (state, action) => {
      state.user.resume = action.payload.resume;
    },
    [applyJob.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
  /* eslint-enable no-param-reassign */
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
