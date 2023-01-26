import React from "react";

const EditForm = ({ listData, handleChange, handleEdit, imageChange }) => {
  const {
    type,
    name,
    parking,
    furnish,
    bedrooms,
    baths,
    address,
    description,
    offer,
    regular,
    discounted,
    latitude,
    longitude,
    size,
  } = listData;

  return (
    <div className="flex justify-center mb-8">
      <form
        className="px-4 font-bold flex flex-col gap-4 items-start mt-4"
        onSubmit={handleEdit}
      >
        {/* Name */}
        <div>
          <p>Name</p>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            required
            className="mt-1 w-[330px] md:w-[410px] outline-none px-2 py-1 shadow-md rounded"
          />
        </div>

        {/* Rent or Sell */}
        <div>
          <p>Rent / Sell</p>
          <div className="flex items-center gap-[10px] mt-1 font-semibold">
            <button
              onClick={handleChange}
              name="type"
              type="button"
              value="rent"
              className={`typeBtn  ${
                type === "sale"
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              rent
            </button>
            <button
              onClick={handleChange}
              name="type"
              type="button"
              value="sale"
              className={`typeBtn ${
                type === "rent"
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              sell
            </button>
          </div>
        </div>

        {/* Parking Spot */}
        <div>
          <p>Parking Spot</p>
          <div className="flex items-center gap-[10px] mt-1 font-semibold">
            <button
              onClick={handleChange}
              name="parking"
              type="button"
              value="yes"
              className={`typeBtn  ${
                parking === "no"
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              yes
            </button>
            <button
              onClick={handleChange}
              name="parking"
              type="button"
              value="no"
              className={`typeBtn ${
                parking === "yes"
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              no
            </button>
          </div>
        </div>

        {/* Furnished */}
        <div>
          <p>Furnished</p>
          <div className="flex items-center gap-[10px] mt-1 font-semibold">
            <button
              onClick={handleChange}
              name="furnish"
              type="button"
              value="yes"
              className={`typeBtn  ${
                furnish === "no"
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              yes
            </button>
            <button
              onClick={handleChange}
              name="furnish"
              type="button"
              value="no"
              className={`typeBtn ${
                furnish === "yes"
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              no
            </button>
          </div>
        </div>

        {/* Bedrooms,Baths and size */}
        <div className="flex gap-[18px]">
          <div>
            <p>Bedrooms</p>
            <input
              type="number"
              value={bedrooms}
              name="bedrooms"
              onChange={handleChange}
              className="outline-none rounded pl-2 py-1 w-20 mt-1 shadow-md hover:shadow-lg"
            />
          </div>
          <div>
            <p>Baths</p>
            <input
              type="number"
              name="baths"
              value={baths}
              onChange={handleChange}
              className="outline-none rounded pl-2 py-1 w-20 mt-1 shadow-md hover:shadow-lg"
            />
          </div>
          <div>
            <p>Size</p>
            <div className="flex gap-1 items-center">
              <input
                type="number"
                name="size"
                value={size}
                onChange={handleChange}
                className="outline-none rounded pl-2 py-1 w-20 mt-1 shadow-md hover:shadow-lg"
              />
              <p className="text-lg font-light">
                m <sup>2</sup>
              </p>
            </div>
          </div>
        </div>

        {/* Address */}
        <div>
          <p>Address</p>
          <textarea
            required
            name="address"
            rows="3"
            placeholder="Address"
            value={address}
            onChange={handleChange}
            className="mt-1 w-[330px] md:w-[410px] px-3 py-1 outline-none shadow-md"
          ></textarea>
        </div>

        {/* Geolocation */}
        <div className="flex gap-[10px]">
          <div>
            <p>Latitude</p>
            <div className="flex items-center gap-1">
              <input
                type="number"
                name="latitude"
                step="0.01"
                min="-90"
                max="90"
                value={latitude}
                onChange={handleChange}
                className="mt-1 pl-3 py-1 rounded w-[100px] md:w-[150px] outline-none shadow-md hover:shadow-lg"
                required
              />
            </div>
          </div>

          <div>
            <p>Longitude</p>
            <div className="flex items-center gap-1">
              <input
                type="number"
                name="longitude"
                step="0.01"
                min="-180"
                max="180"
                value={longitude}
                onChange={handleChange}
                className="mt-1 pl-3 py-1 rounded w-[100px] md:w-[150px] outline-none shadow-md hover:shadow-lg"
                required
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <p>Description</p>
          <textarea
            required
            name="description"
            rows="3"
            placeholder="Description"
            value={description}
            onChange={handleChange}
            className="mt-1 w-[330px] md:w-[410px] px-3 py-1 outline-none shadow-md"
          ></textarea>
        </div>

        {/* Offer */}
        <div>
          <p>Offer</p>
          <div className="flex items-center gap-[10px] mt-1 font-semibold">
            <button
              onClick={handleChange}
              name="offer"
              type="button"
              value="yes"
              className={`typeBtn  ${
                offer === "no"
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              yes
            </button>
            <button
              onClick={handleChange}
              name="offer"
              type="button"
              value="no"
              className={`typeBtn ${
                offer === "yes"
                  ? "bg-white text-black"
                  : "bg-blue-500 text-white"
              }`}
            >
              no
            </button>
          </div>
        </div>

        {/* Regular and Discount Price */}
        <div className="flex gap-[10px]">
          <div>
            <p>Regular Price</p>
            <div className="flex items-center gap-1">
              <input
                type="number"
                name="regular"
                value={regular}
                onChange={handleChange}
                className="mt-1 pl-3 py-1 rounded w-[100px] md:w-[150px] outline-none shadow-md hover:shadow-lg"
                required
              />
              {type === "rent" && <p className="text-sm font-light">$/month</p>}
            </div>
          </div>
          {offer === "yes" && (
            <div>
              <p>Discounted Price</p>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  name="discounted"
                  value={discounted}
                  onChange={handleChange}
                  className="mt-1 pl-3 py-1 rounded w-[100px] md:w-[150px] outline-none shadow-md hover:shadow-lg"
                  required
                />
                {type === "rent" && (
                  <p className="text-sm font-light">$/month</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Images */}
        <div>
          <p>Images</p>
          <input
            type="file"
            className="mt-1 bg-white rounded font-semibold"
            onChange={imageChange}
            multiple={true}
            accept=".jpg,.png,jpeg"
          />
        </div>

        {/*Submit */}
        <button
          type="submit"
          className="w-[330px] md:w-[410px] bg-blue-500 text-white rounded py-2 hover:scale-105 hover:bg-blue-700 transition duration-200 ease-in-out"
        >
          Edit List
        </button>
      </form>
    </div>
  );
};

export default EditForm;
