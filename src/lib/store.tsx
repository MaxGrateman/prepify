import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/profile/userSlice';
import coursesReducer from './features/courses/coursSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        courses: coursesReducer,
    },
});

// Export types for use with the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;