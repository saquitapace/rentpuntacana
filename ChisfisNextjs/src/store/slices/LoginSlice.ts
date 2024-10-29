import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoginState {
  email: string;
  password: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  email: '',
  password: '',
  isLoading: false,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.isLoading = false;
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = loginSlice.actions;
export default loginSlice.reducer;