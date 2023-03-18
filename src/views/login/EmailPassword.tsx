import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, Auth, signInWithEmailAndPassword } from "firebase/auth";
import "./EmailPassword.css";
import { useContext, useEffect, useState } from "react";
import { FirebaseAppContext } from "../../main";
import { useAppDispatch } from "../../store";
import { setError, setLoggedIn } from "../../store/actions";

const LoginChoices = () => {
  const navigate = useNavigate();
  const firebaseApp = useContext(FirebaseAppContext);
  const [auth, setAuth] = useState<Auth>(getAuth(firebaseApp));
  const [email, setEmail] = useState<string>("rogerjaffe@gmail.com");
  const [password, setPassword] = useState<string>("password");
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAuth(getAuth(firebaseApp));
  }, []);

  const onChange =
    (setter: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setter(event.currentTarget.value);

  const loginClick = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        dispatch(setLoggedIn(userCredential.user));
      })
      .catch((error) => {
        dispatch(
          setError({
            error: true,
            errorCode: error.code,
            errorMsg: error.message,
          })
        );
      });
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3 col-sm-12 mb-3">
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
      <div className="col-md-6 offset-md-3 col-sm-12 mb-3">
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
      <div className="col-md-6 offset-md-3 col-sm-12 mb-3 btn-login-left">
        <button
          aria-label="Login"
          className="btn btn-primary btn-login-block"
          onClick={loginClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginChoices;
