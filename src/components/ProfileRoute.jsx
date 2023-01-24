import { Outlet, Navigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import { Spinner } from ".";

const ProfileRoute = () => {
  const { userLogin, loading } = useAuthStatus();
  if (loading) {
    return <Spinner />;
  }
  return userLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default ProfileRoute;
