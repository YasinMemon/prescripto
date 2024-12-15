import React from 'react';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Appointment() {
  const navigate = useNavigate();
  const navUser = () => {
    navigate('/login');
    scrollTO(0,0)
  }
  return (
    <div className="md:flex flex-col md:flex-row h-[300px] md:mt-40 items-center justify-between bg-blue-500 rounded-2xl ">
      {/* Text Section */}
      <div className="ml-10 pt-10 md:ml-40 text-left md:w-1/2 text-white space-y-6">
        <h1 className="text-2xl md:text-4xl font-bold leading-snug">
          Book Appointment <br /> With 100+ Trusted Doctors
        </h1>
        <button onClick={navUser} className="bg-white text-black font-medium px-6 py-2 rounded-full ring-1 ring-black">
          Create Account
        </button>
      </div>

      {/* Image Section */}
      <div className="mt-6 hidden md:mt-0 md:w-1/2 md:flex justify-center">
        <img
          className="max-w-[300px] mb-[22.5%] md:max-w-[470px] object-contain"
          src="/hero/appointment.png"
          alt="Doctor pointing"
        />
      </div>
    </div>
  );
}

export default Appointment;
