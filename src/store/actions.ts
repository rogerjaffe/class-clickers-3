import { createAction, AnyAction, AsyncThunk } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;
type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;
type TError = { error: boolean; errorCode: string; errorMsg: string };
type TModes = "none" | "loggedIn" | "paid" | "trial" | "player";

export const setMode = createAction<TModes, "SET_MODE">("SET_MODE");
export const setCode = createAction<string, "SET_CODE">("SET_CODE");
export const setError = createAction<TError, "SET_ERROR">("SET_ERROR");
export const setLoggedIn = createAction<User, "SET_LOGGED_IN">("SET_LOGGED_IN");

export const addAction = createAction<number, "ADD">("ADD");
export const isPendingAction = (action: AnyAction): action is PendingAction => {
  return action.type.endsWith("/pending");
};
export const isFulfilledAction = (
  action: AnyAction
): action is FulfilledAction => {
  return action.type.endsWith("/fulfilled");
};
