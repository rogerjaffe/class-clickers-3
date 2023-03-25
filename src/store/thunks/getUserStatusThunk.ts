import { createAsyncThunk } from "@reduxjs/toolkit";
import fb, { TStatus } from "../../api/firebase";
import { setPaidMode, setStatus, setTrialMode } from "../actions";
import { TThunkExtraArgument } from "../../main";

export type TGetUserStatusThunk = {
  uid: string;
};

export const getUserStatusThunk = createAsyncThunk(
  "GET_USER_STATUS",
  async (parms: TGetUserStatusThunk, thunkAPI) => {
    const { uid } = parms;
    const { dispatch, extra } = thunkAPI;
    const { app } = extra as TThunkExtraArgument;
    const status = (await fb.getUserStatus(app, uid)) as TStatus;
    dispatch(setStatus(status));
  }
);
