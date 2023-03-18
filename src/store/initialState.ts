import { User } from "firebase/auth";

type TState = {
  code: string;
  error: boolean;
  errorCode: string;
  errorMsg: string;
  user: User | null;
  mode: "none" | "loggedIn" | "paid" | "trial" | "player";
  correctPoints: number;
  wrongPoints: number;
  invalidCode: boolean;
};

export const initialState: TState = {
  code: "",
  error: false,
  errorCode: "",
  errorMsg: "",
  user: null,
  mode: "none", // none | paid | trial | player
  correctPoints: 10,
  wrongPoints: 5,
  invalidCode: false,
};
