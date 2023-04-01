import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "drawer",
  initialState: false,
  reducers: {
    setVisible: (state, action) => {
      return action.payload;
    },
  },
});

export const { setVisible } = drawerSlice.actions;
export default drawerSlice.reducer;
