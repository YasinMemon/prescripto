import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function All_Doctors({ aToken }) {
  const [doctors, setDoctors] = useState([]);
  const backend = import.meta.env.VITE_BACKEND_URI;
  useEffect(() => {
    getDoctors();
  }, []);
  const getDoctors = async () => {
    const { data } = await axios.get(backend + "api/admin/all-doctors", {
      headers: { authorization: `Bearer ${aToken}` },
    });

    if (data.success) {
      setDoctors(data.doctors);
    } else {
      console.log(data.message);
    }
  };

  const changeStatus = async (id) => {
    try {
      const {data} = await axios.post(
        backend + "api/admin/change-status",
        { docId: id },
        {
          headers: { authorization: `Bearer ${aToken}` },
        }
      );
      toast.success(data.message)
      getDoctors();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen outfit">
      <div className="title mt-6 ml-10 font-bold text-xl">
        <p>All Doctors</p>
      </div>
      <div className="cards m-10">
        <div className="card flex flex-wrap gap-4 ">
          {doctors?.map((doc, key) => {
            return (
              <>
                <div
                  key={doc._id}
                  className="bg-[#EAEFFF] md:w-[235px] md:h-[370px] rounded-lg"
                >
                  <img
                    className="w-full h-[270px]  rounded-t-lg"
                    src={doc.img}
                    alt=""
                  />
                  <p className="font-medium px-3 pt-2">{doc.name}</p>
                  <p className="font-thin px-3 text-gray-600">
                    {doc.speciality}
                  </p>
                  <div className="flex pl-3 gap-2 mt-1">
                    <input
                      onChange={() => changeStatus(doc._id)}
                      className="cursor-pointer"
                      type="checkbox"
                      checked={doc.available}
                    />
                    <p>Available</p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default All_Doctors;
