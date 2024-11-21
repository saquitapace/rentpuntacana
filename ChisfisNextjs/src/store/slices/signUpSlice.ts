import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const signUpUser = createAsyncThunk(
  'signUp/signUpUser',
  async (formData: any, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.error || data.details || 'Failed to create account');
      }
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Sign up failed.");
    }
  }
);

const signUpSlice = createSlice({
  name: 'signUp',
  initialState: {
    isLoading: false,
    success: false,
    error: null as string | null,
  },
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
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSignUpState } = signUpSlice.actions;
export default signUpSlice.reducer;