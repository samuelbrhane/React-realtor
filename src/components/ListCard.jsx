import { ImLocation } from "react-icons/im";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const ListCard = ({ list, setDeleteId, setDeleteModal, page }) => {
  const { id, data } = list;
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mb-4">
      <div className="shadow-md bg-white rounded-t-md w-[300px] relative cursor-default overflow-hidden hover:shadow-xl">
        <div className="flex flex-col justify-between rounded-t-md h-full ">
          <Link to={`/details/${data.type}/${id}`}>
            <p className="absolute left-2 top-2 bg-blue-500 text-white rounded-md px-3 py-1">
              {formatDistanceToNow(new Date(data?.timestamp), {
                addSuffix: true,
              }).replace("about", "")}
            </p>

            <img
              src={data.imageUrls[0]}
              alt="homeImg"
              className="w-full h-[190px] rounded-t-md object-cover hover:scale-105 transition-scale duration-200 ease-in"
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
                {data.address.length > 30
                  ? data.address.slice(0, 30) + "..."
                  : data.address}
              </p>
              <p className="text-xl font-bold">
                ${data.regular.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
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
            </div>
          </Link>
          <div className="flex items-center justify-between px-4">
            <p className="font-bold">
              {data.size}{" "}
              <span className="font-light">
                m<sup>2</sup>
              </span>
            </p>
            {page !== "home" && (
              <div className="flex gap-2 items-center z-20">
                <AiFillEdit
                  className="text-green-500 cursor-pointer"
                  onClick={() => navigate(`/editList/${id}`)}
                />
                <AiFillDelete
                  className="text-red-500 cursor-pointer"
                  onClick={() => {
                    setDeleteModal(true);
                    setDeleteId(id);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCard;
