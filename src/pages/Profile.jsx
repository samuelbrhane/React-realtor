import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ListCard, ProfileForm } from "../components";
import { FcHome } from "react-icons/fc";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [changeData, setChangeData] = useState(false);
  const [listings, setListings] = useState([]);
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

  // fetch user list
  useEffect(() => {
    const fetchLists = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("creator", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
    };
    fetchLists();
  }, []);

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
          <button className="bg-blue-500 px-6 py-2 rounded-md flex gap-2 items-center text-white uppercase hover:scale-105 hover:bg-blue-700">
            <FcHome className="text-xl" /> <p>Sell or rent your home</p>
          </button>
        </Link>
      </div>
      <div className="mt-3">
        <h1 className="text-lg md:text-xl font-bold mb-5 mt-2 text-center text-red-400">
          My <span className="text-black">Lists</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 px-4 md:px-8 lg:px-12 gap-4 mb-8">
          {listings.map((list, index) => (
            <ListCard key={index} list={list} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
