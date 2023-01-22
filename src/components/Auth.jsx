import { useState } from "react";
import { Form } from ".";

const Auth = ({ head }) => {
  const [inputData, setInputData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  return (
    <div>
      <h1 className="text-center text-xl mt-4 md:text-2xl font-bold mb-6">
        {head}
      </h1>
      <div className="flex items-center justify-center">
        <Form inputData={inputData} setInputData={setInputData} head={head} />
      </div>
    </div>
  );
};

export default Auth;
