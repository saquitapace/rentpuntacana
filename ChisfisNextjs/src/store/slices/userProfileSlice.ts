import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfileState {
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  about: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  avatar: '/images/avatars/default.png',
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  phoneNumber: '',
  about: '',
  loading: false,
  error: null
};

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<Partial<UserProfileState>>) => {
      return { ...state, ...action.payload };
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

export const { setUserProfile, setAvatar, setLoading, setError } = userProfileSlice.actions;
export default userProfileSlice.reducer; 