import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Login from "../pages/Login.jsx"

function Profile({ token }) {
  const backend = import.meta.env.VITE_BACKEND_URL;

  const [profilePic, setProfilePic] = useState("");
  const [original, setOrigin] = useState('');
  const [userData, setUserData] = useState({
    name: "Edward Vincent",
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

  const getData = async () => {
    try {
      const { data } = await axios.get(backend + "/api/user/profile", {
        headers: { authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData(data.userData);
        setProfilePic(data.userData.img)        
        console.log("user before updated data: " + data.userData)
      } else {
        console.log(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

const updateProfilePic = (e) => {
  const profile_img = e.target.files[0];
  if(profile_img){
    setOrigin(profile_img);
    setProfilePic(URL.createObjectURL(profile_img));
  }

}

  const updateProfile = async () => {

    const formData = new FormData();

    formData.append('name', userData.name)
    formData.append('phone', userData.phone )
    formData.append('address',JSON.stringify(userData.address))
    formData.append('dob', userData.dob)
    formData.append('gender', userData.gender);

    if(profilePic && original){
      profilePic && formData.append('img', original );
    }

    try {
      const { data } = await axios.post(
        backend + "/api/user/update",
        formData,
        {
          headers: { authorization: `Bearer ${token}`},
        }
      );

      if (data.success) {
        toast.success(data.message);
        await getData();
        setIsEditing(false);

      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  },[]);

  return (
    <div className="p-4 pt-2">
      {/* Profile Section */}
      <div>
        <div
          className={`${
            profilePic === "" ? "" : ""
          } mx-auto bg-gray-400 w-full max-w-[12rem] h-[12rem] my-3 mb-16 rounded-md`}
        >
          <label htmlFor="profile">
            <img
              src={profilePic !== "" ? profilePic : "./avatar.png"}
              className={`${
                profilePic !== "" ? "h-full w-full object-cover" : "w-28 cursor-pointer"
              } mx-auto rounded-md`}
              alt="Profile"
            />
            {isEditing && (
              <input
                onChange={(e) => updateProfilePic(e)}
                type="file"
                id="profile"
                hidden
              />
            )}
          </label>
          {!isEditing ? (
            <p className="mt-4 text-center text-lg font-semibold">
              {userData.name}
            </p>
          ) : (
            <input
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="ring-1 mt-6 mx-auto mb-3 ring-black rounded-md p-1"
              type="text"
              placeholder="Enter your name"
            />
          )}
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
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
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
                value={userData.address?.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                placeholder="Line1"
              />
              <p></p>
              <input
                className="ring-1 ring-black rounded-md p-1"
                value={userData.address?.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
                placeholder="Line2"
              />
            </>
          ) : (
            <>
              <p>{userData.address?.line1 || 'Address not Provided'}</p>
              <p></p>
              <p>{userData.address?.line2 || 'Address not Provided'}</p>
            </>
          )}
        </div>

        {/* Basic Information Section */}
        <p className="mt-5 text-lg md:text-xl underline font-semibold text-gray-500">
          Basic Information
        </p>
        <div className="grid grid-cols-2 mt-4 w-full max-w-[30vw] md:max-w-[20vw]">
          <p>Gender:</p>
          {isEditing ? (
            <div>
              <select
                name="gender"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
                id="gender"
              >
                <option value="Male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          ) : (
            <p>{userData.gender}</p>
          )}
          <p>DOB:</p>
          {isEditing ? (
            <input
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="ring-1 ring-black rounded-md p-1"
              type="date"
            />
          ) : (
            <p>{userData.dob}</p>
          )}
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
              onClick={updateProfile}
              className="ring-1 ring-black px-8 py-2 rounded-full hover:bg-gray-200"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  ) 
}

export default Profile;
