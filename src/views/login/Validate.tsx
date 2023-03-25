import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import fb from "../../api/firebase";
import "./EmailPassword.css";
import { useContext, useEffect, useState } from "react";
import { FirebaseAppContext } from "../../main";
import { useAppDispatch } from "../../main";
import { clearError, setLoggedIn } from "../../store/actions";
import mixpanel from "mixpanel-browser";
import { getUserStatusThunk } from "../../store/thunks/getUserStatusThunk";
import {
  getAuth,
  User,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { FirebaseApp } from "firebase/app";

export type TEmailUserObj = User & {
  accessToken?: string;
  metadata: {
    createdAt: number;
    lastSigninTime: number;
    lastLoginAt: number;
  };
};

interface TValidateProps {
  onLoginSuccess: (userObj: TEmailUserObj) => void;
  firebaseApp: FirebaseApp;
}

const Validate = ({ onLoginSuccess, firebaseApp }: TValidateProps) => {
  useEffect(() => {
    // Confirm the link is a sign-in with email link.
    const auth = getAuth();
    if (isSignInWithEmailLink(auth, window.location.href)) {
      // Additional state parameters can also be passed via URL.
      // This can be used to continue the user's intended action before triggering
      // the sign-in operation.
      // Get the email if available. This should be available if the user completes
      // the flow on the same device where they started it.
      let email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        // User opened the link on a different device. To prevent session fixation
        // attacks, ask the user to provide the associated email again. For example:
        email = window.prompt("Please provide your email for confirmation");
      }
      // The client SDK will parse the code from the link for you.
      signInWithEmailLink(auth, email ?? "", window.location.href)
        .then((result) => {
          // Clear email from storage.
          window.localStorage.removeItem("emailForSignIn");
          const userObj = result.user as unknown as TEmailUserObj;
          console.log(userObj);
          onLoginSuccess(userObj);
          // You can access the new user via result.user
          // Additional user info profile not available via:
          // result.additionalUserInfo.profile == null
          // You can check if the user is new or existing:
          // result.additionalUserInfo.isNewUser
        })
        .catch((error) => {
          console.log(error);
          // Some error occurred, you can inspect the code: error.code
          // Common errors could be invalid email and invalid or expired OTPs.
        });
    }
  }, []);

  return <span>Validating login</span>;
};

export default Validate;
