import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/auth/authSlice"
import searchReducer from "./features/search/searchSlice"



export const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
    }, 
})