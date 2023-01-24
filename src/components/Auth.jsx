import { useState } from "react";
import { Form } from ".";
import { useNavigate } from "react-router";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth = ({ head }) => {
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Create User
  const registerUser = async (e) => {
    e.preventDefault();
    const { fullName, email, password } = inputData;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: fullName });
      let userData = { fullName, email };
      userData.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), userData);
      navigate("/");
    } catch (error) {
      toast.error(error.code.replace("auth/", ""));
    }
  };

  // Login User
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = inputData;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      navigate("/");
    } catch (error) {
      toast.error(error.code.replace("auth/", ""));
    }
  };

  // Google Authentication
  const googleClick = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // check if user already exists
      const userExist = await getDoc(doc(db, "users", user.uid));
      if (!userExist.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          fullName: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error(error.code.replace("auth/", ""));
    }
  };

  return (
    <>
      <div>
        <h1 className="text-center text-xl mt-4 md:text-2xl font-bold mb-6">
          {head}
        </h1>
        <div className="flex items-center justify-center">
          <Form
            inputData={inputData}
            setInputData={setInputData}
            head={head}
            registerUser={registerUser}
            loginUser={loginUser}
            googleClick={googleClick}
          />
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default Auth;
