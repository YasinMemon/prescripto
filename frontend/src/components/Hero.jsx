import React from "react";

function Hero() {
  return (
    <div className="bluewala flex sm:flex-row flex-col items-center h-full md:mx-auto mx-2 w-[93vw] rounded-[12px]">
      <div className="mx-4 sm:mx-0 sm:ml-10">
        <p className="text-white mt-5 sm:mt-0 font-bold text-xl sm:text-4xl">
          Book Appointments <br /> With Trusted Doctors
        </p>
        <div className="flex gap-2 mt-8 mb-4 sm:flex-row flex-col sm:justify-center items-center">
          <img src="/hero/group.png" />
          <p className="font-nowrap">
            Simply browse through our extensive list of trusted doctors,
            schedule your appointment hassle-free.
          </p>
        </div>
        <div className="mx-auto w-full text-center sm:text-left">
        <button className="bg-white my-4 mx-auto rounded-full px-5 py-1">
          <a href="#appointments">Book Appointment</a> 
        </button>
        </div>
      </div>
      <div>
        <img src="/hero/hero.png" alt="" />
      </div>
    </div>
  );
}

export default Hero;
