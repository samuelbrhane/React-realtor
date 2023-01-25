import { useState } from "react";
import { CreateItem, Spinner } from "../components";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth, db } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const CreateList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listData, setListData] = useState({
    type: "rent",
    name: "",
    parking: "no",
    furnish: "no",
    bedrooms: 1,
    baths: 1,
    address: "",
    description: "",
    offer: "no",
    regular: 0,
    discounted: 0,
    images: null,
    latitude: 0,
    longitude: 0,
    creator: auth.currentUser.uid,
  });

  // Handle input changes
  const handleChange = (e) => {
    if (e.target.files) {
      setListData((prev) => ({
        ...prev,
        images: e.target.files,
      }));
    } else {
      setListData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // check discount and regular price
    if (+listData.discounted >= +listData.regular) {
      setLoading(false);
      return toast.error("Discount price should be less than regular price.");
    }

    // limit the number of images
    if (listData.images.length > 7) {
      setLoading(false);
      return toast.error("The number of images should not be greater than 7.");
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    }

    const imgUrls = await Promise.all(
      [...listData.images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    const formData = {
      ...listData,
      imgUrls,
      timestamp: serverTimestamp(),
    };

    delete formData.images;
    !listData.offer && delete formData.discounted;
    await addDoc(collection(db, "listings"), formData);
    setLoading(false);
    navigate("/");
  };

  // return spinner component
  if (loading) return <Spinner />;

  return (
    <>
      <div className="pt-16">
        <h1 className="text-center font-bold mt-3 text-xl md:text-2xl lg:text-3xl text-red-500">
          Create a <span className="text-black">List</span>
        </h1>
        <CreateItem
          listData={listData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default CreateList;
