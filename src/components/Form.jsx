import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Form = ({
  inputData,
  setInputData,
  head,
  registerUser,
  loginUser,
  googleClick,
}) => {
  return (
    <form
      className="pb-8 md:w-[400px] w-full px-4"
      autoComplete="off"
      autoSave="off"
    >
      {head === "Register" && (
        <input
          className="inputs"
          type="text"
          placeholder="Full Name"
          value={inputData.fullName}
          onChange={(e) =>
            setInputData({ ...inputData, fullName: e.target.value })
          }
        />
      )}

      <input
        className="inputs"
        type="email"
        placeholder="Email"
        value={inputData.email}
        onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
      />
      <input
        className="inputs"
        type="password"
        placeholder="Password"
        value={inputData.password}
        onChange={(e) =>
          setInputData({ ...inputData, password: e.target.value })
        }
      />
      <div className="text-sm font-light mb-4">
        {head === "Register" ? (
          <p className="mb-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-500 font-bold"
            >
              Login
            </Link>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-500 font-bold"
            >
              Register
            </Link>
          </p>
        )}
        <Link to="/forget" className="hover:scale-105 text-blue-500">
          Forget Password?
        </Link>
      </div>

      <button
        type="submit"
        className="bg-[#83ed83] authBtn"
        onClick={head === "Register" ? registerUser : loginUser}
      >
        {head === "Register" ? "Register" : "Login"}
      </button>
      <div className="flex items-center justify-center gap-2 my-3">
        <div className="line" />
        <p>OR</p>
        <div className="line" />
      </div>
      <button
        type="button"
        className="bg-[#9bd4f3] flex items-center justify-center gap-2 authBtn"
        onClick={googleClick}
      >
        <FcGoogle />
        <p>{head === "Register" ? "Register" : "Continue"} with google</p>
      </button>
    </form>
  );
};

export default Form;
