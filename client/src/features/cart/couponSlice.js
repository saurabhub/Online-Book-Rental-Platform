import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "coupon",
  initialState: false,
  reducers: {
    couponApplied: (state, action) => {
      return action.payload;
    },
  },
});

export const { couponApplied } = couponSlice.actions;
export default couponSlice.reducer;
