import { createSlice } from "@reduxjs/toolkit";

let initialState = []


if(typeof window !== undefined){
    if(localStorage.getItem("cart")) {
        initialState = JSON.parse(localStorage.getItem("cart"))
    } else {
        initialState = []
    }
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      return action.payload;
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
