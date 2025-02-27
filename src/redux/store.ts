import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slices/newsSlice";
import searchReducer from "./slices/searchSlice";
import categoryReducer from "./slices/categorySlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    search: searchReducer,
    category: categoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
