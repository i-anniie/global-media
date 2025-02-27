import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  keyword: string;
}

const initialState: SearchState = {
  keyword: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
  },
});

export const { setSearchKeyword } = searchSlice.actions;
export default searchSlice.reducer;
