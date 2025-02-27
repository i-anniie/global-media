import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NewsState {
  articles: any[];
}

const initialState: NewsState = {
  articles: [],
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<any[]>) => {
      state.articles = action.payload;
    },
  },
});

export const { setNews } = newsSlice.actions;
export default newsSlice.reducer;
