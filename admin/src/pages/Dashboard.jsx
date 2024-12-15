import React, { useEffect, useState } from "react";
import Appointments from "../components/Appointments";
import { toast } from "react-toastify";
import axios from "axios";

function Dashboard({ token }) {
  const backend = import.meta.env.VITE_BACKEND_URI;
  const [dashboard, setDashboard] = useState({});
  const getData = async () => {
    try {
      const { data } = await axios.get(backend + "api/admin/dashboard", {
        headers: { authorization: `Bearer ${token}` },
      });
      if (data?.success) {
        setDashboard(data.dashData);
        console.log(data.dashData);
      }
    } catch (error) {
      console.log("something went wrong", error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="overflow-hidden min-h-screen">
        <div className="flex outfit justify-center font-medium md:flex-row md:justify-start m-3 flex-wrap gap-2 sm:m-5 md:m-10 sm:gap-5 md:gap-16 items-start w-full">
          <div className="flex rounded-md w-[160px] h-[80px] sm:w-[244px] sm:h-[115px] justify-center items-center gap-6 bg-[#FFFFFF] md:gap-4">
            <div className="mt-1">
              <img src="/icons/dr.png" alt="" />
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>{dashboard.doctors}</p>
              <p>Doctors</p>
            </div>
          </div>
          <div className="flex rounded-md w-[160px] h-[80px] sm:w-[244px] sm:h-[115px] justify-center items-center gap-2  bg-[#FFFFFF]">
            <div className="">
              <img src="/icons/apmnt.svg" alt="" />
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>{dashboard.appointments}</p>
              <p>Appointments</p>
            </div>
          </div>
          <div className="flex rounded-md w-[160px] h-[80px] gap-2 sm:w-[244px] sm:h-[115px] justify-center items-center bg-[#FFFFFF]">
            <div className="">
              <img src="/icons/patients.svg" alt="" />
            </div>
            <div className="flex justify-center items-center flex-col">
              <p>{dashboard.patients}</p>
              <p>Doctors</p>
            </div>
          </div>
        </div>
        <Appointments dashboard={dashboard} />
      </div>{" "}
    </>
  );
}

export default Dashboard;
