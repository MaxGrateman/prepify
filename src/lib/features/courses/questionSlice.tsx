import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


interface ICategory {
    id: number;
    name: string | null;
}

interface ILevel {
    id: number;
    name: string | null;
}

interface IQuestion {
    id: number;
    text: string | null;
}

interface IAnswer {
    id: number;
    text: string | null;
    question: IQuestion;
    category: ICategory;
    level: ILevel;
    is_correct: boolean;
}

interface AnswerState {
    answers: IAnswer[];
    loading: boolean;
    error: string | null;
}

const initialState: AnswerState = {
    answers: [],
    loading: false,
    error: null,
}

interface FetchAnswersParams {
    level: string;
    apiQuestionsURL: string;
}

export const fetchQuestionsByLevel = createAsyncThunk(
    'answers/fetchAnswersByLevel',
    async({apiQuestionsURL}: FetchAnswersParams, {rejectWithValue}) => {
        try {
            const response = await axios.get<IAnswer[]>(apiQuestionsURL,{
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

const answersSlice = createSlice({
    name: 'answers',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchQuestionsByLevel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchQuestionsByLevel.fulfilled, (state, action) => {
                state.answers = action.payload;
                state.loading = false;
            })
            .addCase(fetchQuestionsByLevel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default answersSlice.reducer;