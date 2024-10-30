import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface SignUpState {
  isLoading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: SignUpState = {
  isLoading: false,
  success: false,
  error: null,
};

// Async action to handle sign-up API call
export const signUpUser = createAsyncThunk(
  'signUp/signUpUser',
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Sign up failed.");
    }
  }
);

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    resetSignUpState: (state) => {
      state.isLoading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetSignUpState } = signUpSlice.actions;
export default signUpSlice.reducer;