import React from "react";
import { useNavigate } from "react-router-dom";
import "./LoginAgain.css";

const LoginAgain = () => {
  const navigate = useNavigate();

  return (
    <div className="row">
      <div className="col-12">
        <h5>Please log in again</h5>
      </div>
      <div className="col-md-4 offset-md-4 col-sm-12 col-xs-12 mb-3">
        <button
          aria-label="Login"
          className="btn btn-primary btn-login-block"
          onClick={() => navigate("/controller/login")}
        >
          Login again
        </button>
      </div>
    </div>
  );
};

export default LoginAgain;
