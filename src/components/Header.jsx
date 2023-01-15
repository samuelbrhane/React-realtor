import { useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { Sidemenu } from ".";

const Header = () => {
  const [showSidemenu, setShowSidemenu] = useState(false);
  return (
    <>
      <div className="h-16 shadow-md text-black">
        <div className="px-4 md:px-8 lg:px-12 flex items-center justify-between h-full">
          {/* Logo */}
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl text-red-500">
            Real<span className="text-black">tor.com</span>
          </h1>

          {/****** Links ******/}
          {/* Menu Icon */}
          <BiMenuAltRight
            className="md:hidden cursor-pointer text-2xl"
            onClick={() => setShowSidemenu(!showSidemenu)}
          />

          {/* Header Link */}
          <ul className="items-center gap-5 hidden md:flex">
            <li className="link">Home</li>
            <li className="link">Offers</li>
            <li className="link">Sign In</li>
          </ul>
        </div>
      </div>
      <Sidemenu showSidemenu={showSidemenu} />
    </>
  );
};

export default Header;
