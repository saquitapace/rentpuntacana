import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserProfileState {
  avatar: string;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  about: string;
  languages: string[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  avatar: '/images/avatars/default.png',
  companyName: '',
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  phoneNumber: '',
  about: '',
  languages: [],
  isLoading: false,
  error: null
};

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async ({ formData, userId }: { formData: Partial<UserProfileState>; userId: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/updateUser`,
        { ...formData, user_id: userId }
      );

      if (response.status === 200) {
        console.log("Profile updated successfully");
        return response.data;
      } else {
        return rejectWithValue('Failed to update profile');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<Partial<UserProfileState>>) => {
      Object.assign(state, action.payload);
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<Partial<UserProfileState>>) => {
        state.isLoading = false;
        Object.assign(state, action.payload);
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setUserProfile, setAvatar } = userProfileSlice.actions;
export default userProfileSlice.reducer;