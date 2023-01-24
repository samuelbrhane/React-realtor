import { Outlet, Navigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import { Spinner } from ".";

const AuthRoute = () => {
  const { userLogin, loading } = useAuthStatus();
  if (loading) {
    return <Spinner />;
  }
  return !userLogin ? <Outlet /> : <Navigate to="/profile" />;
};

export default AuthRoute;
