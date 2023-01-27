import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/config";
import ListCard from "./ListCard";
import Spinner from "./Spinner";

const Listings = ({ title, name }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(8);

  useEffect(() => {
    const fetchOffers = async () => {
      const docRef = collection(db, "listings");
      const q = query(
        docRef,
        name === "offer"
          ? where("offer", "==", "yes")
          : where("type", "==", name),
        orderBy("timestamp", "desc")
      );
      const docSnap = await getDocs(q);
      let listings = [];
      docSnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchOffers();
  }, [name]);
  if (loading) return <Spinner />;
  return (
    <div className="pt-20">
      <h1 className="font-bold text-xl md:text-2xl text-center">{title}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5 px-4 md:px-8 lg:px-12 gap-4 mb-8">
        {listings.slice(0, number).map((list, index) => (
          <ListCard key={index} list={list} />
        ))}
      </div>
      <div className="flex justify-center">
        {listings.length > 8 && (
          <p
            className="bg-blue-500 rounded px-2 cursor-pointer py-1 text-white mb-4"
            onClick={() => setNumber((prev) => prev + 4)}
          >
            Show more
          </p>
        )}
      </div>
    </div>
  );
};

export default Listings;
