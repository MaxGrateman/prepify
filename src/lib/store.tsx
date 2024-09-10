import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/profile/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// Export types for use with the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;