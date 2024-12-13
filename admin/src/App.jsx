import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import Slidebar from "./components/Slidebar";
import Appointment from "./pages/Appointment";
import Add_Doctors from "./pages/Add_Doctors";
import All_Doctors from "./pages/All_Doctors";
import DoctorDash from "./pages/doctor/DoctorDash";
import DocProfile from "./pages/doctor/DocProfile";
import DocAppointments from "./pages/doctor/docAppointments";

export default function App() {
  const [aToken, setaToken] = useState(localStorage.getItem("token") || "");
  const [dToken, setDToken] = useState(localStorage.getItem("dtoken") || "");
  
  return (
    <div className="overflow-x-hidden">
      <ToastContainer />
      {aToken || dToken ? (
        <>
          <Navbar setAtoken={setaToken} setDToken={setDToken} />
          <div className="flex h-full overflow-hidden">
            <div className="w-12 sm:w-auto">
            <Slidebar aToken={aToken} dToken={dToken} />
            </div>
            <div className="">
            <Routes>
              <Route path="/" element={<Dashboard token={aToken} />} />
              <Route path="/appointments" element={<Appointment token={aToken} />} ></Route>
              <Route path="/add-doctors" element={<Add_Doctors aToken={aToken} />} />
              <Route path="/list" element={<All_Doctors aToken={aToken} />} />
              <Route path="/doctor-dash" element={<DoctorDash dToken={dToken} />} />
              <Route path="/doc-appointments" element={<DocAppointments dToken={dToken} />} />
              <Route path="/doc-profile" element={<DocProfile aToken={aToken} />} />
            </Routes>
            </div>
          </div>
        </>
      ) : (
        <Login setaToken={setaToken} setDToken={setDToken} />
      )}
    </div>
  );
}
