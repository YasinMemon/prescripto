import React from "react";
import { useNavigate } from "react-router-dom";

function Specialities() {
  const navigate = useNavigate();

  const handleClick = (name) => {
    navigate(`/doctors/${name}`);
    scrollTo(0,0)
  };

  const data = [
    {
      img: "/hero/physician.svg",
      name: "General Physician",
    },
    {
      img: "/hero/Gynecologist.svg",
      name: "Gynecologist",
    },
    {
      img: "/hero/Dermatologist.svg",
      name: "Dermatologist",
    },
    {
      img: "/hero/Pediatricians.svg",
      name: "Pediatricians",
    },
    {
      img: "/hero/Neurologist.svg",
      name: "Neurologist",
    },
    {
      img: "/hero/Gastroenterologist.svg",
      name: "Gastroenterologist",
    },
  ];

  return (
    <>
      <h1 className="font-bold text-2xl mt-10 text-center">
        Find by Speciality
      </h1>
      <p className="text-center">
        Simply browse through our extensive list of trusted doctors, <br />
        schedule your appointment hassle-free.
      </p>
      <div className="flex md:justify-center text-center overflow-x-auto gap-5 md:gap-10 my-10">
        {data.map((item, idx) => (
          <div
            onClick={() => handleClick(item.name)}
            key={idx}
            className="overflow-x-auto shrink-0 text-center cursor-pointer"
          >
            <img className="w-16 md:w-32" src={item.img} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Specialities;
