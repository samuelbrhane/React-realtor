import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/config";
import {
  collection,
  deleteDoc,
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
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [changeData, setChangeData] = useState(false);
  const [listings, setListings] = useState([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
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

  // Delete List
  const handleDelete = async (deleteId) => {
    await deleteDoc(doc(db, "listings", deleteId));
    const updatelisting = listings.filter((list) => list.id !== deleteId);
    setListings(updatelisting);
    toast.success("List Deleted Successfully.");
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
      <div className="flex justify-center px-4">
        <Link to="/createList">
          <button className="bg-blue-500 px-6 py-2 rounded-md flex gap-2 items-center text-white uppercase hover:scale-105 hover:bg-blue-700">
            <FcHome className="text-xl" />
            <p className="text-sm sm:text-[16px] md:text-xl whitespace-nowrap">
              Sell or rent your home
            </p>
          </button>
        </Link>
      </div>
      <div className="mt-3">
        <h1 className="text-lg md:text-xl font-bold mb-5 mt-2 text-center text-red-400">
          My <span className="text-black">Lists</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 px-4 md:px-8 lg:px-12 gap-4 mb-8">
          {listings.map((list, index) => (
            <ListCard
              key={index}
              list={list}
              setDeleteId={setDeleteId}
              setDeleteModal={setDeleteModal}
            />
          ))}
        </div>
      </div>
      {deleteModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.4)] flex items-center justify-center z-[60]">
          <div className="px-7 py-4 bg-white rounded-md h-32">
            <p className="text-center">Are you sure you want to delete?</p>
            <div className="flex gap-4 items-center justify-center mt-6">
              <p
                className="cursor-pointer bg-green-600 rounded text-white px-3 py-1"
                onClick={() => {
                  setDeleteModal(false);
                  handleDelete(deleteId);
                }}
              >
                Yes
              </p>
              <p
                className="cursor-pointer bg-blue-600 text-white rounded px-3 py-1"
                onClick={() => {
                  setDeleteModal(false);
                }}
              >
                Cancel
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
