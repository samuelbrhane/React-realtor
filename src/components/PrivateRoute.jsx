import { Outlet, Navigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  const { userLogin, loading } = useAuthStatus();
  if (loading) {
    return <p>Loading</p>;
  }
  return userLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
