import { createAsyncThunk } from "@reduxjs/toolkit";

export const addWithDelayThunk = createAsyncThunk(
  "ADD_WITH_DELAY",
  (increment: number, thunkAPI) => {
    return new Promise<number>((resolve) => {
      setTimeout(() => {
        resolve(increment);
      }, 1000);
    });
  }
);
