import { useState } from "react";
import { Link } from "react-router-dom";

const Forget = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="flex items-center justify-center">
      <form className="mt-4 w-full px-4 md:w-[350px]">
        <h1 className="text-center text-xl mt-4 md:text-2xl font-bold mb-6">
          Forget Password
        </h1>
        <input
          className="inputs"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="text-sm font-light mb-4 flex justify-between">
          <Link to="/login" className="text-blue-600 hover:text-blue-500">
            Login
          </Link>
          <Link to="/register" className="text-blue-600 hover:text-blue-500">
            Register
          </Link>
        </div>

        <button type="submit" className="bg-[#83ed83] authBtn">
          send password email
        </button>
      </form>
    </div>
  );
};

export default Forget;
