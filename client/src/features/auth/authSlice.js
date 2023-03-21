import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: null,
  reducers: {
    loggedInUser: (state, action) => {
      return action.payload;
    },
    logout: (state, action) => {
      return action.payload;
    },
  },
});

export const { loggedInUser, logout } = authSlice.actions;
export default authSlice.reducer;
