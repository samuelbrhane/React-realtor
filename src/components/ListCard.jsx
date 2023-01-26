import { ImLocation } from "react-icons/im";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const ListCard = ({ list }) => {
  console.log(list);
  const { id, data } = list;
  return (
    <div className="flex justify-center mb-4">
      <div className="shadow-md bg-white rounded-t-md w-[300px]">
        <img
          src={data.imageUrls[0]}
          alt="homeImg"
          className="w-full h-[190px] rounded-t-md"
        />
        <div className="mt-2 px-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-1 items-center">
              <div className="rect" /> <p>{data.name}</p>
            </div>
            <p className="text-sm  text-blue-500">For {data.type}</p>
          </div>
          <p className="font-light flex text-sm">
            <ImLocation className="text-lg text-green-500 mt-1" />{" "}
            {data.address}
          </p>
          <p className="text-xl font-bold">
            ${data.regular}
            <span className="font-light text-sm">
              {data.type === "rent" && "/month"}
            </span>
          </p>
          <div className="flex items-center gap-4">
            <p className="font-bold">
              {data.bedrooms} <span className="font-light">Bedrooms</span>
            </p>
            <p className="font-bold">
              {data.baths} <span className="font-light">Bathrooms</span>
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-bold">
              {data.size}{" "}
              <span className="font-light">
                m<sup>2</sup>
              </span>
            </p>
            <div className="flex gap-2 items-center">
              <AiFillEdit className="text-green-500 cursor-pointer" />
              <AiFillDelete className="text-red-500 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
