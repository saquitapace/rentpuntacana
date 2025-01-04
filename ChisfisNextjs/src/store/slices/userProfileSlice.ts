import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface UserProfileState {
  userId: string;
  accountType: string;
  avatar: string;
  companyName: string;
  fullName: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  location: string;
  phoneNumber: string;
  about: string;
  languages: string[];
  socials: string[] ,
  createdAt: string;
  isLoading: boolean;
  error: string | null;
  password: string | null;
  email_verified: boolean;
  auth_type : string | null;
  address: string | null;
  jwt: string | null;
  jwtExpiresAt: string | null;
}

const initialState: UserProfileState = {
  userId: '',
  accountType: '',
  avatar: '',
  companyName: '',
  fullName: '',
  displayName: '',
  firstName: '',
  lastName: '',
  email: '',
  socials:[],
  location: '',
  phoneNumber: '',
  about: 'Hi! I am new here.',
  languages: ['English'],
  address: null,
  createdAt: '',
  isLoading: false,
  error: null,
  password: null,
  email_verified: false,
  auth_type: null,
  jwt: null,
  jwtExpiresAt: null
};

export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/user-data');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch user profile');
      }
      
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'userProfile/updateUserProfile',
  async (userData: Partial<UserProfileState>, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/user-data', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }
      
      return data.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<Partial<UserProfileState>>) => {
      return { ...state, ...action.payload };
    },
    clearUserProfile: (state) => {
      return initialState;
    },
    setAvatar: (state, action: PayloadAction<string>) => {
      state.avatar = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isLoading: false,
          error: null
        };
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        return {
          ...state,
          ...action.payload,
          isLoading: false,
          error: null,
          languages: Array.isArray(action.payload.languages) 
            ? action.payload.languages 
            : typeof action.payload.languages === 'string'
            ? JSON.parse(action.payload.languages)
            : ['English']
        };
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUserProfile, clearUserProfile, setAvatar } = userProfileSlice.actions;

// Selectors
export const getUserProfile = (state: RootState) => state.userProfile;
export const getUserId = (state: RootState) => state.userProfile?.userId || '';
export const getUserAccountType = (state: RootState) => state.userProfile?.accountType || '';
export const getUserFirstName = (state: RootState) => state.userProfile?.firstName || '';
export const getUserLastName = (state: RootState) => state.userProfile?.lastName || '';
export const getUserEmail = (state: RootState) => state.userProfile?.email || '';
export const getUserAvatar = (state: RootState) => state.userProfile?.avatar || '';
export const getUserAbout = (state: RootState) => 
  state.userProfile?.about || 'Hi! I am new here.';
export const getUserLoading = (state: RootState) => state.userProfile?.isLoading || false;
export const getUserCreatedAt = (state: RootState) => state.userProfile?.createdAt || '';
export const getUserFullName = (state: RootState) => 
  `${state.userProfile?.firstName || ''} ${state.userProfile?.lastName || ''}`.trim();
export const getUserLanguages = (state: RootState) => {
  try {
    if (!state.userProfile?.languages) {
      return ['English']; // Return default if no languages set
    }
    
    // If languages is a string (from DB), parse it
    if (typeof state.userProfile.languages === 'string') {
      const parsed = JSON.parse(state.userProfile.languages);
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['English'];
    }
    
    // If languages is already an array, return it if not empty
    if (Array.isArray(state.userProfile.languages)) {
      return state.userProfile.languages.length > 0 ? 
        state.userProfile.languages : ['English'];
    }
    
    return ['English']; // Default fallback
  } catch (error) {
    console.error('Error parsing languages:', error);
    return ['English'];
  }
};

export default userProfileSlice.reducer;