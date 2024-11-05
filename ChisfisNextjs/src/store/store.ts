import { configureStore } from '@reduxjs/toolkit';
import forgotPasswordReducer from './slices/forgotPasswordSlice';
import loginSliceReducer from './slices/LoginSlice';
import signUpReducer from './slices/signUpSlice';
import userProfileReducer from './slices/userProfileSlice';

const store = configureStore({
   reducer: {
      forgotPassword: forgotPasswordReducer,
      login: loginSliceReducer,
      signUp: signUpReducer,
      userProfile: userProfileReducer
   },
   devTools: process.env.NODE_ENV !== 'production',
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware({
       serializableCheck: false, // Optional: disable serializable check if needed
     })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;