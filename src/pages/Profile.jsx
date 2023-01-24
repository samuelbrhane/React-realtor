import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Profile = () => {
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="mt-6 flex items-center justify-center">
      <form
        className="pb-8 md:w-[400px] w-full px-4"
        autoComplete="off"
        autoSave="off"
      >
        <h1 className="text-xl md:text-2xl font-bold mb-3 mt-2 text-center text-red-400">
          My <span className="text-black">Profile</span>
        </h1>
        <input
          className="inputs bg-gray-200"
          type="text"
          value="samuel brhane"
          disabled
        />
        <input
          className="inputs bg-gray-200"
          type="email"
          value="1samibrhane@gmail.com"
          disabled
        />
        <div className="text-[12px] sm:text-sm md:text-[16px] font-light mb-4 flex justify-between items-center px-2">
          <p className="mb-2">
            Change User Name?
            <button className="text-blue-600 hover:text-blue-500 font-semibold">
              Edit
            </button>
          </p>

          <button
            className="text-blue-600 hover:text-blue-500 font-semibold"
            onClick={handleSignout}
          >
            Sign out
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
