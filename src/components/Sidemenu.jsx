const Sidemenu = ({ showSidemenu }) => {
  return (
    <div
      className={`md:hidden fixed top-16  bottom-0 text-black px-12 sm:px-18 bg-gray-200 ${
        showSidemenu ? "showSidemenu" : "hideSidemenu"
      }`}
    >
      <ul className="items-center  space-y-4 flex-col pt-6">
        <li className="link">Home</li>
        <li className="link">Offers</li>
        <li className="link">Sign In</li>
      </ul>
    </div>
  );
};

export default Sidemenu;
