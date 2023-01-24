import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const Profile = () => {
  const navigate = useNavigate();
  const [changeData, setChangeData] = useState(false);
  const [userData, setUserData] = useState({
    fullName: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  // Sign out user
  const handleSignout = () => {
    signOut(auth);
    navigate("/login");
  };

  // handle user name change
  const handleChangeData = async (e) => {
    e.preventDefault();
    const { fullName } = userData;
    setChangeData((prev) => !prev);
    if (changeData && auth.currentUser.displayName !== fullName) {
      // change user name in firebase auth
      await updateProfile(auth.currentUser, {
        displayName: fullName,
      });

      // change user name in firebase storage
      await updateDoc(doc(db, "users", auth.currentUser.uid), { fullName });
    }
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
          className={`inputs ${changeData ? "bg-gray-300" : "bg-gray-100"}`}
          type="text"
          value={userData.fullName}
          disabled={!changeData}
          onChange={(e) =>
            setUserData({ ...userData, fullName: e.target.value })
          }
        />
        <input
          className="inputs bg-gray-100"
          type="email"
          value={userData.email}
          disabled
        />
        <div className="text-[12px] sm:text-sm md:text-[16px] font-light mb-4 flex justify-between items-center px-2">
          <p className="mb-2">
            Change User Name? {""}
            <button
              className="text-blue-600 hover:text-blue-500 font-semibold"
              onClick={handleChangeData}
            >
              {changeData ? "Apply Change" : "Edit"}
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
