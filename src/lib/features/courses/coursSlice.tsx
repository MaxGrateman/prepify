import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {apiCourses} from "@/features/courses/api/apiUrlCourses";


export interface ICourse {
    id: number;
    name: string | null;
    description: string | null;
}

interface CourseState {
    courses: ICourse[];
    loading: boolean;
    error: string | null;
}

const initialState: CourseState = {
    courses: [],
    loading: false,
    error: null
}

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
    const response = await axios.get<ICourse[]>(apiCourses, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    })
    return response.data
})

const coursesSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCourses.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCourses.fulfilled, (state, action) => {
                state.courses = action.payload;
                state.loading = false;
            })
            .addCase(fetchCourses.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch courses';
            })
    },
})

export default coursesSlice.reducer;

