import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { ProfileForm } from "../components";
import { FcHome } from "react-icons/fc";

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
    <>
      <ProfileForm
        userData={userData}
        setUserData={setUserData}
        handleChangeData={handleChangeData}
        handleSignout={handleSignout}
        changeData={changeData}
      />
      <div className="flex justify-center">
        <Link to="/createList">
          <button className="bg-blue-500 px-6 py-2 rounded-md flex gap-2 items-center text-white uppercase hover:scale-105 hover:bg-blue-400">
            <FcHome className="text-xl" /> <p>Sell or rent your home</p>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Profile;
