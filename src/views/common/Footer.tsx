import React, { useContext } from "react";
import p from "../../../package.json";
import "./Footer.css";
import { useSelector } from "react-redux";
import { TState, useAppDispatch } from "../../main";
import { getAuth } from "firebase/auth";
import { logout } from "../../store/actions";
import { FirebaseAppContext } from "../../main";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const auth = useSelector((state: TState) => state.auth);
  const firebaseApp = useContext(FirebaseAppContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutClick = async () => {
    const auth = getAuth(firebaseApp);
    auth.signOut().then(() => {
      dispatch(logout());
      navigate("/login");
    });
  };

  return (
    <div className="footer">
      <span>{`Clickers V${p.version}`}</span>
      <br />
      <span>Copyright &copy; Roger Jaffe 2023</span>
      <br />
      <span>
        <a href="link-to-google-form">How do you like Class Clickers!</a>
      </span>
      <br />
      {auth ? (
        <span onClick={logoutClick}>
          <a href="link-to-google-form">Logout</a>
        </span>
      ) : null}
    </div>
  );
};

export default Footer;
