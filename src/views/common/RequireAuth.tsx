import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { TState } from "../../main";
import Login from "../login/Login";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useSelector((state: TState) => state.auth);

  if (!auth) {
    return <Navigate to="/controller/login-again" replace />;
  }
  return children;
};

export default RequireAuth;
