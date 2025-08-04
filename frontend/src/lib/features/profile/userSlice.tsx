import {createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {apiProfile, apiProfileUpdate} from "@/features/profile/api/apiUrlProfile";
import axios from "axios";
import { uploadImage } from "./uploadImage";
import { RootState } from '@/lib/store'


export interface UserProfile {
    about: string | null;
    age: number | null;
    country: string | null;
    email: string;
    email_verified_at: string | null;
    id: number;
    image_path: string;
    level: string | null;
    name: string;
    stack: string | null;
}

interface UserState {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
}

interface SaveProfileArgs {
    data: Partial<UserProfile>,
    file?: File;
}

const initialState: UserState = {
    user: null,
    loading: false,
    error: null,
}

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (_, {rejectWithValue}) => {
    try {
        const token = Cookies.get('token');
        if (!token) throw new Error('No token found');
        const response = await axios.get(apiProfile, {
            headers: {Authorization: `Bearer ${token}`}
        })
        return response.data.user;
    } catch (error) {
        console.error('[fetchUserData]', error);
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message ?? 'Server error');
        }
        return rejectWithValue('Failed to fetch the user')
    }
});

export const saveUserProfile = createAsyncThunk<
  UserProfile,
  SaveProfileArgs,
  { state: RootState }
>(
  'user/saveUserProfile',
  async ({ data, file }: SaveProfileArgs, { rejectWithValue, getState }) => {
    try {
      const token = Cookies.get('token');
      if (!token) throw new Error('No token');

      if (file) {
        const uploadedUrl = await uploadImage(file);
        data.image_path = uploadedUrl;
      }

      console.log('Sending profile data:', data);

      const response = await axios.put(apiProfileUpdate, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.user;
    } catch (error) {
      console.error('[saveUserProfile]', error);
      return rejectWithValue('Failed to update profile');
    }
  }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state: UserState, action: PayloadAction<UserProfile>) {
            state.user = action.payload;
        },
        logout(state: UserState) {
            state.user = null;
            Cookies.remove('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state: UserState) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state: UserState, action: PayloadAction<UserProfile>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserData.rejected, (state: UserState, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(saveUserProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveUserProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(saveUserProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;