import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Forget = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForget = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent!");
      navigate("/login");
    } catch (error) {
      toast.error("Couldn't send reset email!");
    }
  };
  return (
    <>
      <div className="flex items-center justify-center mt-16">
        <form className="mt-4 w-full px-4 md:w-[350px]">
          <h1 className="text-center text-xl mt-4 md:text-2xl font-bold mb-6">
            Forget Password
          </h1>
          <input
            className="inputs"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="text-sm font-light mb-4 flex justify-between">
            <Link to="/login" className="text-blue-600 hover:text-blue-500">
              Login
            </Link>
            <Link to="/register" className="text-blue-600 hover:text-blue-500">
              Register
            </Link>
          </div>

          <button
            type="submit"
            className="bg-[#83ed83] authBtn"
            onClick={handleForget}
          >
            send reset password
          </button>
        </form>
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

export default Forget;
