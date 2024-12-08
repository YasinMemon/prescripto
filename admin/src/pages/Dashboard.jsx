import React from "react";
import Appointments from "../components/Appointments";

function Dashboard() {
  return (
    <>
      <div className="overflow-hidden min-h-screen">
      <div className="flex outfit justify-center font-medium md:flex-row md:justify-start m-3 flex-wrap gap-2 sm:m-5 md:m-10 sm:gap-5 md:gap-16 items-start w-full">
        <div className="flex rounded-md w-[160px] h-[80px] sm:w-[244px] sm:h-[115px] justify-center items-center gap-6 bg-[#FFFFFF] md:gap-4">
          <div className="mt-1">
            <img src="/icons/dr.png" alt="" />
          </div>
          <div className="">
            <p>14</p>
            <p>Doctors</p>
          </div>
        </div>
        <div className="flex rounded-md w-[160px] h-[80px] sm:w-[244px] sm:h-[115px] justify-center items-center gap-2  bg-[#FFFFFF]">
          <div className="">
            <img src="/icons/apmnt.svg" alt="" />
          </div>
          <div className="">
            <p>2</p>
            <p>Appointments</p>
          </div>
        </div>
        <div className="flex rounded-md w-[160px] h-[80px] gap-2 sm:w-[244px] sm:h-[115px] justify-center items-center bg-[#FFFFFF]">
          <div className="">
            <img src="/icons/patients.svg" alt="" />
          </div>
          <div className="">
            <p>5</p>
            <p>Doctors</p>
          </div>
        </div>
      </div>
      <Appointments/>
      </div>    </>
  );
}

export default Dashboard;
