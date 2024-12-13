import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Related({ docId, speciality }) {
  const [docs, setDocs] = useState([]);
  const navigate = useNavigate()
  const data = useSelector((state) => state.doctor.doctors);
  const getData = () => {
    if (data.length > 0) {
      const related = data.filter((i) => i.speciality === speciality && i._id !== docId);
      setDocs(related);
    }
  };

  const navigateUser = (item) => {
    navigate(`/doctor/${item._id}`)
    scrollTo(0,0)
  }

  useEffect(() => {
    getData();
  }, [data, speciality]);
  return (
    <>
       {docs.length > 0 && <p className="text-center font-semibold md:text-2xl">Related Doctors</p> }
      <div className="grid grid-cols-1 md:grid-cols-4 space-y-10 md:space-x-12 mx-2 md:mx-20">
        {docs.slice(0, 4).map((item) => (
          <>
            <div
              onClick={() => navigateUser(item)}
              key={item._id}
              className="cards w-[90vw] md:w-[18vw] hover:-translate-y-[1rem] duration-500 transition-all cursor-pointer ring-1 ring-black rounded-lg"
            >
              <img
                className="w-full h-[45vh] rounded-t-xl "
                src={item.img}
                alt=""
              />
              <div className="flex items-center gap-1 pl-2 pt-1">
                <div
                  className={`${
                    item.available ? "bg-green-700" : "bg-gray-700"
                  } h-3 w-3 rounded-full`}
                ></div>
                <p
                  className={`${
                    item.available ? "text-green-700" : "text-gray-600"
                  } `}
                >
                  {item.available ? "Available" : "Not Available"}
                </p>
              </div>
              <p className="pl-2 pt-1 font-medium text-base">{item.name}</p>
              <p className="pl-2 text-gray-600">{item.speciality}</p>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Related;
