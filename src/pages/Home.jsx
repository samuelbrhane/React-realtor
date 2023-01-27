import { useEffect } from "react";
import { db } from "../firebase/config";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Spinner } from "../components";
import { Link } from "react-router-dom";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  // Fetch listings data
  useEffect(() => {
    const fetchListings = async () => {
      const docRef = collection(db, "listings");
      const q = query(docRef, orderBy("timestamp", "desc"), limit(8));
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
        {listings?.map((listing, index) => (
          <SwiperSlide key={index}>
            <Link to={`/details/${listing.data.type}/${listing.id}`}>
              <div
                className="relative w-full overflow-hidden h-[400px]"
                style={{
                  background: `url(${listing.data.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
              <p className="absolute top-4 left-4 z-30 bg-[#32a324] px-4 py-1 rounded-lg text-white font-medium text-lg">
                {listing.data.name} for {listing.data.type}
              </p>
              <p className="absolute bottom-4 left-4 z-30 bg-[#2494a3] px-4 py-1 rounded-lg text-white font-medium text-lg">
                Price: $
                {listing.data.type === "sale" ? (
                  listing.data.regular
                ) : (
                  <span>
                    {listing.data.regular}
                    <span className="text-sm">/month</span>
                  </span>
                )}
              </p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Home;
