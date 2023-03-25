import React from "react";
import { useNavigate } from "react-router-dom";
import fb from "../../api/firebase";
import "./Google.css";
import { useContext, useEffect, useState } from "react";
import { FirebaseAppContext } from "../../main";
import { useAppDispatch } from "../../main";
import { clearError, setLoggedIn } from "../../store/actions";
import mixpanel from "mixpanel-browser";
import { getUserStatusThunk } from "../../store/thunks/getUserStatusThunk";
import GoogleButton from "../../assets/google-button.png";
import {
  User,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  getAdditionalUserInfo,
} from "firebase/auth";
import { FirebaseApp } from "firebase/app";

export type TGoogleUserObj = User & {
  accessToken?: string;
  metadata: {
    createdAt: number;
    lastSigninTime: number;
    lastLoginAt: number;
  };
};

interface TLoginChoicesProps {
  onLoginSuccess: (userObj: TGoogleUserObj) => void;
}

const Google = ({ onLoginSuccess }: TLoginChoicesProps) => {
  const loginClick = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    auth.useDeviceLanguage();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user as TGoogleUserObj;
        onLoginSuccess(user);
      })
      .catch((error) => {
        if (error.code === "auth/popup-closed-by-user") {
          console.log(error);
        }
      });
  };

  return (
    <div className="row">
      <div className="col-12 mb-3">
        <img
          src={GoogleButton}
          alt="Google login"
          className="google-button"
          onClick={loginClick}
        />
      </div>
    </div>
  );
};

export default Google;
