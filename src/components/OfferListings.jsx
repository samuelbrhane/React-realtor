import React, { useState } from "react";
import ListCard from "./ListCard";

const OfferListings = ({ offerListings }) => {
  const [index, setIndex] = useState(4);
  return (
    <div className="px-4 md:px-8 lg:px-12 mt-6">
      <h1 className="font-bold text-xl text-red-500">
        Recent <span className="text-black">Offers</span>
      </h1>
      <p
        className="cursor-pointer font-medium text-sm underline text-green-700"
        onClick={() => setIndex((prev) => prev + 4)}
      >
        Show more offers
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2 gap-4 mb-8">
        {offerListings.slice(0, index).map((list, index) => (
          <ListCard key={index} list={list} page="home" />
        ))}
      </div>
    </div>
  );
};

export default OfferListings;
