import { createSlice } from "@reduxjs/toolkit";

const drawerSlice = createSlice({
  name: "cart",
  initialState: false,
  reducers: {
    setVisible: (state, action) => {
      return action.payload;
    },
  },
});

export const { setVisible } = drawerSlice.actions;
export default drawerSlice.reducer;
