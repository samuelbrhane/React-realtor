import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase/config";

const useAuthStatus = () => {
  const [userLogin, setUserLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUserLogin(true);
    }
    setLoading(false);
  });

  return { userLogin, loading };
};

export default useAuthStatus;
