import { configureStore } from "@reduxjs/toolkit";

import searchReducer from "./searchSlice";
import indicatorReducer from "./indicatorSlice";
import userInfoReducer from "./userInfoSlice";
import playersTableReducer from "./playersTableSlice";
import playersDataReducer from "./playersDataSlice";
import { playersApi } from "./playersApi";


export const store = configureStore({
  reducer: {
    indicator: indicatorReducer,
    userInfo: userInfoReducer,
    search: searchReducer,
    playersApi: playersApi.reducer,
    playersTable: playersTableReducer,
    playersData: playersDataReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(playersApi.middleware);
  },
});
