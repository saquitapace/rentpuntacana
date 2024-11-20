import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from './slices/signUpSlice';
import authReducer from './slices/authSlice';
import userProfileReducer from './slices/userProfileSlice';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    auth: authReducer,
    userProfile: userProfileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;