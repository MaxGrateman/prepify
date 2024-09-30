import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/profile/userSlice';
import coursesReducer from './features/courses/coursSlice'
import questionReducer from "@/lib/features/courses/questionSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        courses: coursesReducer,
        questions: questionReducer,
    },
});

// Export types for use with the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;