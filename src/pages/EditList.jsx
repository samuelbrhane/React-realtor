import { useState } from "react";
import { EditForm, Spinner } from "../components";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { auth, db } from "../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import axios from "axios";

const EditList = () => {
  const params = useParams();
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

  //fetch list data
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const docSnap = await getDoc(doc(db, "listings", params.id));
      if (docSnap.exists()) {
        setListData({ ...docSnap.data() });
      } else {
        toast.error("List does not exist.");
        navigate("/");
      }
    };
    fetchData();
    setLoading(false);
  }, [params.id, navigate]);

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
  const handleEdit = async (e) => {
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

    // Check valid address
    // Get latitude & longitude from address.
    let { data } = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${listData.address}`
    );

    if (data.length === 0) {
      setLoading(false);
      return toast.error("Invalid address");
    } else {
      listData.latitude = data[0].lat;
      listData.longitude = data[0].lon;
    }

    // Upload images to firebase storage
    const storeImage = async (image) => {
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
              default:
                console.log("Uploaded");
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
    };

    const imageUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    let formData;
    if (imageUrls.length > 0) {
      formData = {
        ...listData,
        imageUrls,
      };
    } else {
      formData = { ...listData };
    }
    const docRef = doc(db, "listings", params.id);
    await updateDoc(docRef, formData);
    setLoading(false);
    toast.success("Listing Edited");
    navigate(`/details/${formData.type}/${docRef.id}`);
  };

  // return spinner component
  if (loading) return <Spinner />;

  return (
    <>
      <div className="pt-16">
        <h1 className="text-center font-bold mt-3 text-xl md:text-2xl lg:text-3xl text-red-500">
          Edit a <span className="text-black">List</span>
        </h1>
        <EditForm
          listData={listData}
          handleChange={handleChange}
          handleEdit={handleEdit}
          imageChange={imageChange}
        />
      </div>
    </>
  );
};

export default EditList;
