import { useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import {
  Spinner,
  OfferListings,
  RentListings,
  SaleListings,
} from "../components";
import { Link } from "react-router-dom";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sliderListings, setSliderListings] = useState([]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  // Fetch listings data
  useEffect(() => {
    const fetchListings = async () => {
      const docRef = collection(db, "listings");
      const q = query(docRef, orderBy("timestamp", "desc"));
      const docSnap = await getDocs(q);
      let listings = [];
      docSnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setSliderListings(listings.slice(0, 8));
      setOfferListings(
        listings.filter((listing) => listing.data.offer === "yes")
      );
      setSaleListings(
        listings.filter((listing) => listing.data.type === "sale")
      );
      setRentListings(
        listings.filter((listing) => listing.data.type === "rent")
      );
      setLoading(false);
    };

    fetchListings();
  }, []);

  if (loading) return <Spinner />;

  if (listings.length === 0) return <></>;

  return (
    <section className="pt-16">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500 }}
      >
        {sliderListings?.map((listing, index) => {
          const { id, data } = listing;
          return (
            <SwiperSlide key={index}>
              <Link to={`/details/${data.type}/${id}`}>
                <div
                  className="relative w-full overflow-hidden h-[400px]"
                  style={{
                    background: `url(${data.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <p className="absolute md:top-4 md:left-4 top-2 left-2 z-30 bg-[#32a324] px-4 py-1 rounded-lg text-white font-medium text-lg">
                  {data.name} for {data.type}
                </p>
                <p className="absolute md:bottom-4 md:left-4 bottom-2 left-2 z-30 bg-[#2494a3] px-4 py-1 rounded-lg text-white font-medium text-lg">
                  Price: $
                  {data.type === "sale" ? (
                    data.regular
                  ) : (
                    <span>
                      {data.regular}
                      <span className="text-sm">/month</span>
                    </span>
                  )}
                </p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Offer listings */}
      <OfferListings offerListings={offerListings} />

      {/* Sale listings */}
      <SaleListings saleListings={saleListings} />

      {/* Rent listings */}
      <RentListings rentListings={rentListings} />
    </section>
  );
};

export default Home;
