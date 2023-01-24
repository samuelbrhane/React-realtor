import React from "react";
import spinner from "../assets/img/spinner.gif";

const Spinner = () => {
  return (
    <div className="flex items-start mt-4 justify-center h-screen w-full">
      <img src={spinner} alt="spinner" className="w-[100px]" />
    </div>
  );
};

export default Spinner;
