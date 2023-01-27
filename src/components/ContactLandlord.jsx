import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";

const ContactLandlord = ({ listing }) => {
  const [contactLandlord, setContactLandlord] = useState(false);
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState(null);

  //   fetch landlord data
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "users", listing.creator);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      }
    };
    fetchData();
  }, [listing.creator]);

  return (
    <div>
      {/* Contact landlord */}
      {auth?.currentUser?.uid !== listing?.creator && !contactLandlord && (
        <button
          className="bg-blue-600 hover:bg-blue-500 text-white uppercase mt-3 w-full py-2 rounded font-medium shadow hover:shadow-lg"
          onClick={() => setContactLandlord(true)}
        >
          Contact Landlord
        </button>
      )}

      {/* Write and send message */}
      {contactLandlord && (
        <>
          <p className="mt-3">
            Contact {landlord?.fullName} for this property.
          </p>
          <div className="mt-1">
            <textarea
              rows="4"
              className="w-full outline-none px-3 py-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write Message"
            ></textarea>
            <a
              href={`mailto:${landlord?.email}?Subject=${
                listing?.name + " for " + listing?.type
              }&body=${message}`}
              onClick={() => setContactLandlord(false)}
            >
              <button className="bg-blue-600 hover:bg-blue-500 text-white uppercase mt-1 w-full py-2 rounded font-medium shadow hover:shadow-lg">
                Send Message
              </button>
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default ContactLandlord;
