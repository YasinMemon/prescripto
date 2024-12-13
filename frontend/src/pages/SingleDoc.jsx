import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Slots from "../components/Slots";
import Related from "../components/Related";

function SingleDoc() {
  const doctors = useSelector((state) => state.doctor.doctors);
  const { id } = useParams();
  const [doc, setDoc] = useState("");
  const findDoc = () => {
    const docInfo = doctors.find((doc) => doc._id === id);
    if (docInfo) {
      setDoc(docInfo);
    }
  };
  useEffect(() => {
    findDoc();
  }, [id, doctors]);

  if (!doc) <p>doctors not available</p>;

  return <>
    <div className="w-[90vw] h-full pb-10 md:flex gap-10 mx-auto">
      <div>
        <img
          className="md:w-[280px] rounded-xl object-cover md:h-[350px]"
          src={doc.img}
          alt=""
        />
      </div>
      <div className="w-full mt-4 md:mt-0 l h-full ">
        <div className="ring-1 ring-black h-full p-6 rounded-xl " >
        <div className="box">
          <div className="flex gap-1 items-center justify-start">
            <p className="font-bold text-lg">{doc.name}</p>{" "}
            <img className="h-4" src="/blueTic.png" alt="" />
          </div>
          <div className="flex gap-1 text-gray-600 items-center">
            <p>{doc.degree} </p>{" "}
            <div className="h-2 w-2 bg-gray-700 rounded-full"></div>{" "}
            <p> {doc.speciality} </p>{" "}
            <span className="ring-1 ring-black px-4 rounded-md text-black bg-gray-100 ml-2">
              {doc.experience}
            </span>
          </div>
          <div className="about mt-4">
            <div className="flex justify-start items-center gap-1">
              <p>About </p> <img src="/about.png" alt="" />
            </div>
            <p className="mt-2 mb-4" >{doc.about}</p>
            <p>Appointment Fees: <span className="font-bold ml-1" >₹{doc.fees}</span></p>
          </div>
        </div>
        </div>
      <Slots/>
      </div>
    </div>
      <Related docId={doc._id} speciality={doc.speciality} />
  </>
}

export default SingleDoc;
