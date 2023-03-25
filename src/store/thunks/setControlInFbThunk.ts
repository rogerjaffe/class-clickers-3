import fb, { TStatus } from "../../api/firebase";
import {
  setError,
  setLoggedIn,
  setPaidMode,
  setStatus,
  setTrialMode,
} from "../actions";
import mixpanel from "mixpanel-browser";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import * as R from "ramda";
import { NavigateFunction } from "react-router";
import { TThunkExtraArgument } from "../../main";
import { STATES } from "../../assets/constants";

// export const addWithDelayThunk = createAsyncThunk(
//   "ADD_WITH_DELAY",
//   (increment: number, thunkAPI) => {
//     return new Promise<number>((resolve) => {
//       setTimeout(() => {
//         resolve(increment);
//       }, 1000);
//     });
//   }
// );

type TSetControlInFbThunk = {
  id: string;
  app: FirebaseApp;
};

type TControl = {
  id: string;
  appState: number;
  enable: boolean;
  time: number;
};

export const setControlInFbThunk = createAsyncThunk(
  "SET_CONTROL_IN_FB",
  async (parms: TSetControlInFbThunk, thunkAPI) => {
    const { id } = parms;
    const { dispatch, extra } = thunkAPI;
    const { app } = extra as TThunkExtraArgument;
    const control = {
      id,
      appState: STATES.ARMED,
      enable: false,
      time: Date.now(),
    } as TControl;
    const db = getDatabase(app);
    set(ref(db, "sessions/" + id), control);
  }
);
//   }
// );
