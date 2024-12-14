import React, { useState } from "react";

function Profile() {
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
    img: "",
    email: "rechard@gmail.com",
    phone: "+91 87437 78324",
    address: {
      line1: "57th cross Richmond",
      line2: "circle, church road, London",
    },
    gender: "Male",
    dob: "20-04-2002",
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4">
      {/* Profile Section */}
      <div>
        <div
          className={`${
            userData.img === "" ? "p-6" : ""
          } mx-auto bg-gray-400 w-full max-w-[12rem] h-[12rem] my-10 rounded-md`}
        >
          <label htmlFor="profile">
            <img
              src={userData.img !== "" ? userData.img : "./avatar.png"}
              className={`${
                userData.img !== "" ? "h-full object-cover" : "w-28"
              } mx-auto cursor-pointer rounded-md`}
              alt="Profile"
            />
            <input
              onChange={(e) =>
                setUserData({
                  ...userData,
                  img: URL.createObjectURL(e.target.files[0]),
                })
              }
              type="file"
              id="profile"
              hidden
            />
          </label>
          <p className="mt-4 text-center text-lg font-semibold">
            {userData.name}
          </p>
        </div>
      </div>

      {/* Horizontal Divider */}
      <hr className="my-5 mx-auto bg-gray-400 w-full max-w-[60vw] h-[2px]" />

      {/* Contact Information Section */}
      <div className="mt-5 max-w-[90vw] mx-auto md:max-w-[50vw]">
        <p className="text-lg md:text-xl underline font-semibold text-gray-500">
          Contact Information
        </p>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${
            isEditing ? "space-y-3" : "space-y-1"
          } mt-4`}
        >
          <p>Email:</p>
          <p>
            <a href={`mailto:${userData.email}`}>{userData.email}</a>
          </p>
          {isEditing ? (
            <>
              <p>Phone:</p>
              <input
                className="ring-1 ring-black rounded-md p-1"
                type="number"
                placeholder="Enter new number"
              />
            </>
          ) : (
            <>
              <p>Phone:</p>
              <p>{userData.phone}</p>
            </>
          )}
          <p>Address:</p>
          {isEditing ? (
            <>
              <input
                className="ring-1 ring-black rounded-md p-1"
                type="text"
                placeholder="Line1"
              />
              <p></p>
              <input
                className="ring-1 ring-black rounded-md p-1"
                type="text"
                placeholder="Line2"
              />
            </>
          ) : (
            <>
              <p>{userData.address.line1}</p>
              <p></p>
              <p>{userData.address.line2}</p>
            </>
          )}
        </div>

        {/* Basic Information Section */}
        <p className="mt-5 text-lg md:text-xl underline font-semibold text-gray-500">
          Basic Information
        </p>
        <div className="grid grid-cols-2 mt-4 w-full max-w-[30vw] md:max-w-[20vw]">
          <p>Gender:</p>
          <p>{userData.gender}</p>
          <p>DOB:</p>
          <p>{userData.dob}</p>
        </div>

        {/* Edit/Save Button */}
        <div className="mt-8 text-center">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="ring-1 ring-black px-8 py-2 rounded-full hover:bg-gray-200"
            >
              Edit
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="ring-1 ring-black px-8 py-2 rounded-full hover:bg-gray-200"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
