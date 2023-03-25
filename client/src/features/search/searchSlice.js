import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    text: ""
  },
  reducers: {
    searchQuery: (state, action) => {
      return action.payload;
    },
  },
});

export const { searchQuery } = searchSlice.actions;
export default searchSlice.reducer;
