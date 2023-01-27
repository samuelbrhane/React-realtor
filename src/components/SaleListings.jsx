import { Link } from "react-router-dom";
import ListCard from "./ListCard";

const SaleListings = ({ saleListings }) => {
  return (
    <div className="px-4 md:px-8 lg:px-12">
      <h1 className="font-bold text-xl text-red-500">
        Places <span className="text-black">for sale</span>
      </h1>
      <Link to="/sale">
        <p className="cursor-pointer font-medium text-sm underline text-green-700">
          Show more places for sale
        </p>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 gap-4 mb-8">
        {saleListings.slice(0, 4).map((list, index) => (
          <ListCard key={index} list={list} />
        ))}
      </div>
    </div>
  );
};

export default SaleListings;
