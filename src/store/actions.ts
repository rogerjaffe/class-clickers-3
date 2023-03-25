import { createAction, AnyAction, AsyncThunk } from "@reduxjs/toolkit";
import { User } from "firebase/auth";
import { TStatus } from "../api/firebase";
import { TUser } from "../types/TUser";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
type TError = { errorCode: string; errorMsg: string };

export const setLoginError = createAction<string>("SET_LOGIN_ERROR");
export const setCode = createAction<string>("SET_CODE");
export const setTrialMode = createAction("SET_TRIAL_MODE");
export const setPaidMode = createAction("SET_PAID_MODE");
export const setStatus = createAction<TStatus>("SET_STATUS");
export const clearError = createAction("CLEAR_ERROR");
export const setError = createAction<TError>("SET_ERROR");
export const setLoggedIn = createAction<TUser>("SET_LOGGED_IN");
export const authLost = createAction("AUTH_LOST");
export const logout = createAction("LOGOUT");

export const addAction = createAction<number, "ADD">("ADD");
export const isPendingAction = (action: AnyAction): action is PendingAction => {
  return action.type.endsWith("/pending");
};
export const isFulfilledAction = (
  action: AnyAction
): action is FulfilledAction => {
  return action.type.endsWith("/fulfilled");
};
