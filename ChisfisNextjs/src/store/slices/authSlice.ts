import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signIn } from 'next-auth/react';

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null
};

export const signInUser = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        return rejectWithValue(result.error);
      }

      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Sign in failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = true;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetAuthState, setUser } = authSlice.actions;
export default authSlice.reducer; 