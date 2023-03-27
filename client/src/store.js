import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/auth/authSlice"
import searchReducer from "./features/search/searchSlice"
import cartReducer from "./features/cart/cartSlice"
import drawerReducer from "./features/cart/drawerSlice"



export const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        cart: cartReducer,
        drawer: drawerReducer,
    }, 
})