import { useState } from "react";
import { CreateItem } from "../components";

const CreateList = () => {
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
  });

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1 className="text-center font-bold mt-3 text-xl md:text-2xl lg:text-3xl text-red-500">
        Create a <span className="text-black">List</span>
      </h1>
      <CreateItem
        listData={listData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateList;
