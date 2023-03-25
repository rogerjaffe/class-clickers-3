import { createReducer } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import {
  authLost,
  clearError,
  isFulfilledAction,
  isPendingAction,
  logout,
  setCode,
  setError,
  setStatus,
  setLoggedIn,
  setPaidMode,
  setTrialMode,
} from "./actions";
import { addWithDelayThunk } from "./thunks/thunks";

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setError, (state, action) => {
      state.error = true;
      state.errorCode = action.payload.errorCode;
      state.errorMsg = action.payload.errorMsg;
    })
    .addCase(clearError, (state, action) => {
      state.error = false;
      state.errorCode = "";
      state.errorMsg = "";
    })
    .addCase(setLoggedIn, (state, action) => {
      state.user = action.payload;
      state.isTeacher = true;
      state.isTrial = true;
      state.isPaid = false;
      state.auth = true;
    })
    .addCase(authLost, (state, action) => {
      state.user = null;
      state.auth = false;
      state.isPaid = false;
      state.isTeacher = false;
    })
    .addCase(logout, (state, action) => {
      state.user = null;
      state.auth = false;
      state.isPaid = false;
    })
    .addCase(setTrialMode, (state, action) => {
      state.isTrial = true;
      state.isPaid = false;
    })
    .addCase(setPaidMode, (state, action) => {
      state.isTrial = false;
      state.isPaid = true;
    })
    .addCase(setStatus, (state, action) => {
      if (action.payload) {
        state.user.isRegistered = true;
        state.user.lastName = action.payload.lastName;
        state.user.firstName = action.payload.firstName;
        if (action.payload.expires > Date.now()) {
          state.isTrial = false;
          state.isPaid = true;
          state.user.isExpired = false;
        } else {
          state.isTrial = true;
          state.isPaid = false;
          state.user.isExpired = true;
        }
      }
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
