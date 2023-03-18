import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, Auth } from "firebase/auth";
import "./LoginChoices.css";
import { useContext, useEffect, useState } from "react";
import { FirebaseAppContext } from "../../main";
import { useAppDispatch } from "../../store";
import { CODE_LENGTH, MODES } from "../../assets/constants";
import { setMode, setCode } from "../../store/actions";
import getRandomId from "../../utilities/getRandomId";

const LoginChoices = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const trialMode = () => {
    dispatch(setCode(getRandomId(CODE_LENGTH)));
    dispatch(setMode(MODES.TRIAL_MODE));
    navigate("/controller");
  };

  return (
    <div className="row">
      <div className="col-12">
        <h5>Login with:</h5>
      </div>
      <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12 mb-3">
        <button
          aria-label="Login"
          className="btn btn-primary btn-login-block"
          onClick={() => navigate("/login/email")}
        >
          Email / Password
        </button>
      </div>
      <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12 mb-3">
        <button
          aria-label="Login"
          className="btn btn-primary btn-login-block"
          onClick={trialMode}
        >
          Use trial version
        </button>
      </div>
    </div>
  );
};

export default LoginChoices;
