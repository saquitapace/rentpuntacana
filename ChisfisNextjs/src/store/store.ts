import { configureStore } from '@reduxjs/toolkit';
import forgotPasswordReducer from './slices/forgotPasswordSlice';
import loginSliceReducer from './slices/LoginSlice';
import signUpReducer from './slices/signUpSlice';

const store = configureStore({
   reducer: {
      forgotPassword: forgotPasswordReducer,
      login: loginSliceReducer,
      signUp: signUpReducer
   },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;