import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import switchReducer from "./slices/switchSlice";
import userSpinReducer from "./slices/userSpinSlice";
import segmentReducer from "./slices/segmentSlice";

export const store = configureStore({
  reducer: {
    switch: switchReducer,
    userSpin: userSpinReducer,
    segment: segmentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
