import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Controller.css";
import { useState } from "react";
import { FirebaseAppContext, useAppDispatch } from "../../main";
import { CODE_LENGTH } from "../../assets/constants";
import getRandomId from "../../utilities/getRandomId";
import "./SetCode.css";
import { setCode } from "../../store/actions";
import { setControlInFbThunk } from "../../store/thunks/setControlInFbThunk";

type TSettings = { code: string; date: string };

const initSettings = (): TSettings => {
  return {
    code: getRandomId(CODE_LENGTH),
    date: Date.now() + "",
  };
};

const reconcileCode = (): string => {
  // Get new settings
  let newSettings: TSettings = initSettings();
  // See if there are old settings
  const settingsJSON = localStorage.getItem("settings");
  if (settingsJSON) {
    // Check expiration of old settings
    let settings = JSON.parse(settingsJSON) as TSettings;
    if (Date.now() - parseInt(settings.date, 10) <= 1000 * 60 * 60) {
      // Use old settings and update date
      newSettings.date = Date.now() + "";
      newSettings.code = settings.code;
    }
  }
  // Save new settings and return
  localStorage.setItem("settings", JSON.stringify(newSettings));
  return newSettings.code;
};

const SetCode = () => {
  const [localCode, setLocalCode] = useState<string>(reconcileCode());
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const firebaseApp = useContext(FirebaseAppContext);

  const onChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setLocalCode(evt.currentTarget.value);
  };

  const setCodeClick = () => {
    dispatch(setCode(localCode));
    dispatch(setControlInFbThunk({ app: firebaseApp, id: localCode }));
    navigate("/controller");
  };

  return (
    <div className="row">
      <div className="col-md-2 offset-md-5 col-sm-12 col-xs-12 mb-3">
        <div className="form-group text-center label">
          <label htmlFor="setId" className="mb-1">
            Set controller ID
          </label>
          <input
            id="setId"
            placeholder="Controller ID"
            type="text"
            className="form-control text-center input-code"
            onChange={onChange}
            value={localCode}
          />
        </div>
      </div>
      <div className="col-md-2 offset-md-5 col-sm-12 col-xs-12 mb-3">
        <div className="form-group">
          <button
            type="button"
            className="btn btn-primary btn-login-block"
            onClick={setCodeClick}
          >
            Set ID
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetCode;
