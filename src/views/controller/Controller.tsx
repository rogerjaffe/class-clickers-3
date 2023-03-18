import React from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, Auth } from "firebase/auth";
import "./Controller.css";
import { useContext, useEffect, useState } from "react";
import { FirebaseAppContext } from "../../main";
import { TState, useAppDispatch } from "../../store";
import { setCode } from "../../store/actions";
import { CODE_LENGTH } from "../../assets/constants";
import getRandomId from "../../utilities/getRandomId";
import { useSelector } from "react-redux";

const Controller = () => {
  const dispatch = useAppDispatch();
  const code = useSelector((state: TState) => state.code);

  return <div className="row">{code}</div>;
};

export default Controller;
