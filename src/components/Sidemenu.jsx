import { Link } from "react-router-dom";

const Sidemenu = ({ showSidemenu }) => {
  return (
    <div
      className={`md:hidden fixed top-16  bottom-0 text-black px-12 sm:px-18 bg-gray-200 ${
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
        <Link to="/login" className="link">
          Login
        </Link>
      </ul>
    </div>
  );
};

export default Sidemenu;
