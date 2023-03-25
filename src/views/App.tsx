import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { TState, useAppDispatch } from "../main";
import Home from "./Home";
import "./Home.css";
import useMixpanelSendRoute from "../hooks/useMixpanelSendRoute";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Login from "./login/Login";
import EmailPassword from "./login/EmailPassword";
import Controller from "./controller/Controller";
import SetCode from "./controller/SetCode";
import RequireAuth from "./common/RequireAuth";
import fb from "../api/firebase";
import { FirebaseAppContext } from "../main";
import LoginAgain from "./login/LoginAgain";
import Validate from "./login/Validate";

function App() {
  useMixpanelSendRoute();
  const code = useSelector((state: TState) => state.code);
  const dispatch = useAppDispatch();
  const firebaseApp = useContext(FirebaseAppContext);
  const monitorAuthStateProcess = (
    authState: boolean,
    errorCode?: string
  ): void => {};
  fb.monitorAuthStateFcn(firebaseApp, monitorAuthStateProcess);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <Header />
        </div>
        <div className="card-body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/controller/login" element={<Login />} />
            <Route path="/controller/login-again" element={<LoginAgain />} />
            <Route
              path="/controller/setcode"
              element={
                <RequireAuth>
                  <SetCode />
                </RequireAuth>
              }
            />
            <Route
              path="/controller"
              element={
                <RequireAuth>
                  <Controller />
                </RequireAuth>
              }
            />
          </Routes>
        </div>
        <div className="card-footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
