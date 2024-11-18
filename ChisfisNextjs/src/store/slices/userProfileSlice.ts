import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { getDateJoined } from "@/utils/helpers";

//TODO: fields naming from API Endpoint
interface UserProfileState {
  userId: string;
  avatar: string;
  companyName: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phoneNumber: string;
  about: string;
  languages: string[];
  createdAt: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  userId: '',
  avatar: '/images/avatars/default.png',
  companyName: '',
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  phoneNumber: '',
  about: '',
  createdAt: '',
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
        { ...formData, userId: userId }
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
    },
    resetUserProfile: () => initialState
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

export const getUserId = (state: RootState) => state.userProfile.userId;
export const getUserFirstName = (state: RootState) => state.userProfile.firstName;
export const getUserLastName = (state: RootState) => state.userProfile.lastName;
export const getUserFullName = (state: RootState) => {
  const { firstName, lastName } = state.userProfile;
  return `${firstName} ${lastName}`.trim();
};
export const getUserEmail = (state: RootState) => state.userProfile.email;
export const getUserAvatar = (state: RootState) => state.userProfile.avatar;
export const getUserLanguages = (state: RootState) => state.userProfile.languages;
export const getUserCompanyName = (state: RootState) => state.userProfile.companyName;
export const getUserLoading = (state: RootState) => state.userProfile.isLoading;
export const getUserAbout = (state: RootState) => state.userProfile.about;
export const getUserCreatedAt = (state: RootState) => {
  const { createdAt } = state.userProfile;
  return getDateJoined( createdAt );
};

export const { setUserProfile, setAvatar, resetUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;