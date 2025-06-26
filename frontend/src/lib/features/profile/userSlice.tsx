import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import {apiProfile} from "@/features/profile/api/apiUrlProfile";
import axios from "axios";


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
    place_of_work: string | null;
    stack: string | null;
}

interface UserState {
    user: UserProfile | null;
    loading: boolean;
    error: string | null;
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
        return rejectWithValue('Failed to fetch the user')
    }
});

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
            });

    },
});

export const {setUser, logout} = userSlice.actions;
export default userSlice.reducer;