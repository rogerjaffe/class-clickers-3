import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { initialState } from "./initialState";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.concat(logger)
});

export type TState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
