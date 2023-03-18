import React from "react";
import { useSelector } from "react-redux";
import { TState } from "../../store";

const Header = () => {
  const code = useSelector((state: TState) => state.code);
  return (
    <>
      <h1>Class Clickers</h1>
      <h5>
        {code.length === 0
          ? `For Academic League and other class competitions`
          : `Login code: ${code}`}
      </h5>
    </>
  );
};

export default Header;
