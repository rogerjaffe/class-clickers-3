import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { useContext, useEffect, useState } from "react";
import { FirebaseAppContext } from "../../main";
import { useAppDispatch } from "../../main";
import { TUser } from "../../types/TUser";
import { setLoggedIn } from "../../store/actions";
import EmailPassword, { TEmailPasswordUserObj } from "./EmailPassword";
import mixpanel from "mixpanel-browser";
import { getUserStatusThunk } from "../../store/thunks/getUserStatusThunk";
import Google, { TGoogleUserObj } from "./Google";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const firebaseApp = useContext(FirebaseAppContext);

  const assembleUser = (userObj: TGoogleUserObj | TEmailPasswordUserObj) => {
    const user = {
      accessToken: userObj.accessToken ?? "",
      email: userObj.email ?? "",
      emailVerified: userObj.emailVerified ?? false,
      createdAt: userObj.metadata.createdAt ?? 0,
      creationTime: userObj.metadata.creationTime ?? 0,
      isRegistered: false,
      lastSigninTime: userObj.metadata.lastSigninTime ?? 0,
      lastLoginAt: userObj.metadata.lastLoginAt ?? 0,
      paid: false,
      phoneNumber: userObj.phoneNumber ?? "",
      photoURL: userObj.photoURL ?? "",
      providerId: userObj.providerId ?? "",
      refreshToken: userObj.refreshToken ?? "",
      uid: userObj.uid ?? "",
    } as TUser;
    return user;
  };

  const onLoginSuccess = (userObj: TEmailPasswordUserObj | TGoogleUserObj) => {
    mixpanel.track("login-success", { email: userObj.email, uid: userObj.uid });
    const user = assembleUser(userObj);
    dispatch(setLoggedIn(user));
    // Attempt to retrieve registered user information
    dispatch(getUserStatusThunk({ uid: user.uid }));
    navigate("/controller/setcode");
  };

  return (
    <div className="row">
      <div className="col-12">
        <h5>Login to start session</h5>
      </div>
      <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12 mb-3">
        <EmailPassword
          firebaseApp={firebaseApp}
          onLoginSuccess={onLoginSuccess}
        />
      </div>
      <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12 mb-3">
        <Google onLoginSuccess={onLoginSuccess} />
      </div>
    </div>
  );
};

export default Login;
