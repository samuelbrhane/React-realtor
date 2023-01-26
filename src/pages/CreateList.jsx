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
import { addDoc, collection } from "firebase/firestore";

const CreateList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
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
    latitude: 0,
    longitude: 0,
    size: 0,
    creator: auth.currentUser.uid,
  });

  // Handle input changes
  const handleChange = (e) => {
    setListData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handle image file
  const imageChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      setImages((prev) => [...prev, newImage]);
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
    if (images.length > 7) {
      setLoading(false);
      return toast.error("The number of images should not be greater than 7.");
    }

    // Upload images to firebase storage
    let promises = [];
    let imageUrls = [];
    images.map((image) => {
      const storage = getStorage();
      const filename = `${auth.currentUser.uid}-${uuidv4()}-${image.name}`;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
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
          toast.error("Image can not upload.");
        },
        async () => {
          // Handle successful uploads on complete
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            imageUrls.push(downloadURL);
          });
        }
      );
    });

    Promise.all(promises).then(() => {
      const formData = {
        ...listData,
        imageUrls,
        timestamp: new Date().getTime(),
      };
      formData.offer === "no" && delete formData.discounted;
      uploadInfo(formData);
    });
  };

  // Upload list info to database
  const uploadInfo = async (formData) => {
    console.log("formData", formData);
    const docRef = await addDoc(collection(db, "listings"), formData);
    setLoading(false);
    navigate(`/details/${listData.type}/${docRef.id}`);
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
          imageChange={imageChange}
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
