import { User } from "firebase/auth";
import { TStatus } from "../api/firebase";
import { TUserObj } from "../types/TUser";
import { TControl } from "./thunks/setControlInFbThunk";

type TState = {
  auth: boolean;
  isPaid: boolean;
  isTrial: boolean;
  isTeacher: boolean;
  isStudent: boolean;
  code: string;
  control: TControl;
  error: boolean;
  errorCode: string;
  errorMsg: string;
  user: TUserObj | null;
  correctPoints: number;
  wrongPoints: number;
  invalidCode: boolean;
  status: TStatus | null;
};

export const initialState: TState = {
  auth: false,
  isPaid: false,
  isTrial: false,
  isTeacher: false,
  isStudent: false,
  code: "",
  error: false,
  errorCode: "",
  errorMsg: "",
  user: null,
  correctPoints: 10,
  wrongPoints: 5,
  invalidCode: false,
  status: null,
};
