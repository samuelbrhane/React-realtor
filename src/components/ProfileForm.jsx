const ProfileForm = ({
  userData,
  setUserData,
  handleChangeData,
  handleSignout,
  changeData,
}) => {
  return (
    <div className="mt-6 flex items-center justify-center">
      <form
        className="pb-8 md:w-[400px] w-full px-4"
        autoComplete="off"
        autoSave="off"
      >
        <h1 className="text-xl md:text-2xl font-bold mb-3 mt-2 text-center text-red-400">
          My <span className="text-black">Profile</span>
        </h1>
        <input
          className={`inputs ${changeData ? "bg-gray-300" : "bg-gray-100"}`}
          type="text"
          value={userData.fullName}
          disabled={!changeData}
          onChange={(e) =>
            setUserData({ ...userData, fullName: e.target.value })
          }
        />
        <input
          className="inputs bg-gray-100"
          type="email"
          value={userData.email}
          disabled
        />
        <div className="text-[12px] sm:text-sm md:text-[16px] font-light mb-4 flex justify-between items-center px-2">
          <p className="mb-2">
            Change User Name? {""}
            <button
              className="text-blue-600 hover:text-blue-500 font-semibold"
              onClick={handleChangeData}
            >
              {changeData ? "Apply Change" : "Edit"}
            </button>
          </p>

          <button
            className="text-blue-600 hover:text-blue-500 font-semibold"
            onClick={handleSignout}
          >
            Sign out
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
