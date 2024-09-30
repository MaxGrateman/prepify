import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


interface IQuestion {
    id: number;
    text: string | null;
    category: {
        id: number;
        name: string | null;
    }
    level: {
        id: number;
        name: string | null;
    }
}

interface QuestionState {
    questions: IQuestion[];
    loading: boolean;
    error: string | null;
}

const initialState: QuestionState = {
    questions: [],
    loading: false,
    error: null,
}

interface FetchQuestionsParams {
    level: string;
    apiQuestionsURL: string;
}

export const fetchQuestionsByLevel = createAsyncThunk(
    'questions/fetchQuestionsByLevel',
    async({apiQuestionsURL}: FetchQuestionsParams, {rejectWithValue}) => {
        try {
            const response = await axios.get<IQuestion[]>(apiQuestionsURL,{
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            })
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to load questions')
        }
    }
);

const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestionsByLevel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestionsByLevel.fulfilled, (state, action) => {
                state.questions = action.payload;
                state.loading = false;
            })
            .addCase(fetchQuestionsByLevel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default questionSlice.reducer;