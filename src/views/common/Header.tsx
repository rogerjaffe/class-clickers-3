import React from "react";
import { useSelector } from "react-redux";
import { TState } from "../../main";
import "./Header.css";

const Header = () => {
  const code = useSelector((state: TState) => state.code);
  const user = useSelector((state: TState) => state.user);
  const isTrial = useSelector((state: TState) => state.isTrial);

  return (
    <>
      <h1>Class Clickers</h1>
      <div className="header-text">
        {!code
          ? `For Academic League and other competitions`
          : `Login code: ${code}`}
      </div>
      <div className="sub-header-text">
        {!user
          ? `Please login to start a session`
          : isTrial
          ? `Trial version`
          : `User: ${user.email}`}
      </div>
    </>
  );
};

export default Header;
