import React from "react";
import fb from "../../api/firebase";
import "./EmailPassword.css";
import { useState } from "react";
import { User } from "firebase/auth";
import { FirebaseApp } from "firebase/app";

export type TEmailPasswordUserObj = User & {
  accessToken?: string;
  metadata: {
    createdAt: number;
    lastSigninTime: number;
    lastLoginAt: number;
  };
};

interface TLoginChoicesProps {
  onLoginSuccess: (userObj: TEmailPasswordUserObj) => void;
  firebaseApp: FirebaseApp;
}

const LoginChoices = ({ onLoginSuccess, firebaseApp }: TLoginChoicesProps) => {
  const [email, setEmail] = useState<string>("abc@abc.com");
  const [password, setPassword] = useState<string>("password");
  const [loginError, setLoginError] = useState<string>("");

  const onChange =
    (setter: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.currentTarget.value);
      setLoginError("");
    };

  const loginClick = async () => {
    setLoginError("");
    try {
      const payload = await fb.signInWithEmailAndPassword(
        firebaseApp,
        email,
        password
      );
      const userObj = payload.user as unknown as TEmailPasswordUserObj;
      onLoginSuccess(userObj);
    } catch (error: any) {
      setLoginError(error.errorCode);
    }
  };

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <div className="login-labels">Email:</div>
        <input
          type="text"
          placeholder="Email"
          aria-label="Email"
          className="form-control"
          value={email}
          onChange={onChange(setEmail)}
        />
      </div>
      <div className="col-12 mb-3">
        <div className="login-labels">Password:</div>
        <input
          type="password"
          placeholder="Password"
          aria-label="Password"
          className="form-control"
          value={password}
          onChange={onChange(setPassword)}
        />
      </div>
      <div className="col-12 mb-3">
        <button
          aria-label="Login"
          className="btn btn-primary btn-login-block"
          onClick={loginClick}
        >
          Login
        </button>
      </div>
      {loginError === "auth/wrong-password" ||
      loginError === "auth/user-not-found" ? (
        <div className="col-12 mb-3 btn-login-left">
          <h6
            aria-label="Invalid username / password"
            className="error-message"
          >
            Invalid username / password
          </h6>
        </div>
      ) : null}
      {loginError === "auth/internal-error" ? (
        <div className="col-12 mb-3 btn-login-left">
          <h6 aria-label="Internet error" className="error-message">
            There was an internet error
          </h6>
        </div>
      ) : null}
    </div>
  );
};

export default LoginChoices;
