import { createSlice } from "@reduxjs/toolkit";

const CODSlice = createSlice({
  name: "COD",
  initialState: false,
  reducers: {
    COD: (state, action) => {
      return action.payload;
    },
  },
});

export const { COD } = CODSlice.actions;
export default CODSlice.reducer;
