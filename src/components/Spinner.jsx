import React from "react";
import spinner from "../assets/img/spinner.gif";

const Spinner = () => {
  return (
    <div className="flex fixed top-0 bottom-0 left-0 right-0 items-center bg-[rgba(0,0,0,0.4)] justify-center z-[60]">
      <img src={spinner} alt="spinner" className="w-[100px]" />
    </div>
  );
};

export default Spinner;
