import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";

const useAuthStatus = () => {
  const [userLogin, setUserLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(true);
      }
      setLoading(false);
    });
  }, []);

  return { userLogin, loading };
};

export default useAuthStatus;
