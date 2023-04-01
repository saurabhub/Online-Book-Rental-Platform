import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/auth/authSlice"
import searchReducer from "./features/search/searchSlice"
import cartReducer from "./features/cart/cartSlice"
import drawerReducer from "./features/cart/drawerSlice"
import couponReducer from "./features/cart/couponSlice"
import CODReducer from "./features/cart/CODSlice"



export const store = configureStore({
    reducer: {
        user: userReducer,
        search: searchReducer,
        cart: cartReducer,
        drawer: drawerReducer,
        isCoupon: couponReducer,
        isCOD: CODReducer,
    }, 
})