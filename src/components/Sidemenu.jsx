import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";

const Sidemenu = ({ showSidemenu }) => {
  const [userLogin, setUserLogin] = useState("Login");
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin("Profile");
      } else {
        setUserLogin("Login");
      }
    });
  });
  return (
    <div
      className={`md:hidden fixed top-16  bottom-0 text-black px-12 sm:px-18 z-30 bg-gray-200 ${
        showSidemenu ? "showSidemenu" : "hideSidemenu"
      }`}
    >
      <ul className="items-center flex space-y-4 flex-col pt-6">
        <Link to="/" className="link">
          Home
        </Link>
        <Link to="/offers" className="link">
          Offers
        </Link>
        <Link to={`/${userLogin.toLocaleLowerCase()}`} className="link">
          {userLogin}
        </Link>
      </ul>
    </div>
  );
};

export default Sidemenu;
