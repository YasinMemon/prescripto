import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const Doctors = () => {
  const doctors = useSelector((state) => state.doctor.doctors); // Fetching doctors from Redux state
  const [filteredDoctors, setFilteredDoctors] = useState([]); // State for filtered doctors
  const { speciality } = useParams(); // Get URL parameter for speciality
  const navigate = useNavigate(); // Hook for navigation
  const [selectedFilter, setselectedFilter] = useState('')

  // Function to apply filter based on speciality
  const applyFilter = () => {
    if (speciality || selectedFilter) {
      const filterValue = speciality || selectedFilter
      setFilteredDoctors(doctors.filter((item) => item.speciality === filterValue));
    } else {
      setFilteredDoctors(doctors);
    }
  };

  // Trigger filter whenever doctors or speciality changes
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, selectedFilter]);

  // Handle navigation to doctor details
  const navigateUser = (doctor) => {
    navigate(`/doctor/${doctor._id}`); // Adjust route as per your app's structure
  };

  return (
    <>
      <p className="text-gray-600 ml-10 text-lg font-medium">
        Browse through the Doctors specialist
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filters Section */}
        <div className="filters ml-10">
          {[
            "General Physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((filter) => (
            <p
              key={filter}
              onClick={() => setselectedFilter((prev) => prev !==filter ? filter : '')}
              className={`ring-1 ring-black transition-all duration-300  mb-5 w-[200px] pl-2 py-1 rounded-md cursor-pointer hover:bg-gray-200 ${selectedFilter === filter ? 'bg-blue-600 text-white' : ''} `}
            >
              {filter}
            </p>
          ))}
        </div>

        {/* Doctors Card Section */}
        <div className="flex flex-wrap justify-center px-2 gap-10">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              onClick={() => navigateUser(doctor)}
              className="cards w-[90vw] md:w-[17.5vw] hover:-translate-y-[1rem] duration-500 transition-all cursor-pointer ring-1 ring-black rounded-lg"
            >
              {/* Doctor Image */}
              <img
                className="w-full h-[45vh] rounded-t-xl object-cover"
                src={doctor.img}
                alt={doctor.name}
              />
              {/* Availability Indicator */}
              <div className="flex items-center gap-1 pl-2 pt-1">
                <div
                  className={`${
                    doctor.available ? "bg-green-700" : "bg-gray-700"
                  } h-3 w-3 rounded-full`}
                ></div>
                <p
                  className={`${
                    doctor.available ? "text-green-700" : "text-gray-600"
                  }`}
                >
                  {doctor.available ? "Available" : "Not Available"}
                </p>
              </div>
              {/* Doctor Name & Speciality */}
              <p className="pl-2 pt-1 font-medium text-base">{doctor.name}</p>
              <p className="pl-2 text-gray-600">{doctor.speciality}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Doctors;
