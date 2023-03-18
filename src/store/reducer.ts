import { createReducer } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import {
  addAction,
  isFulfilledAction,
  isPendingAction,
  setCode,
  setError,
  setLoggedIn,
  setMode,
} from "./actions";
import { addWithDelayThunk } from "./thunks";

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state, action) => {
      state.error = action.payload.error;
      state.errorCode = action.payload.errorCode;
      state.errorMsg = action.payload.errorMsg;
    })
    .addCase(setLoggedIn, (state, action) => {
      state.user = action.payload;
      state.mode = "loggedIn";
    })
    .addCase(setMode, (state, action) => {
      state.mode = action.payload;
    })
    .addCase(setCode, (state, action) => {
      state.code = action.payload;
    })
    .addCase(addWithDelayThunk.fulfilled, (state, action) => {
      // state.count += action.payload;
    })
    .addMatcher(isPendingAction, (state, action) => {
      // state.addWithDelayPending = true;
    })
    .addMatcher(isFulfilledAction, (state, action) => {
      // state.addWithDelayPending = false;
    });
});

export default reducer;
