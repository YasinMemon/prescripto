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

export default function App() {
  const [aToken, setaToken] = useState(localStorage.getItem("token") || "");

  return (
    <div className="overflow-x-hidden">
      <ToastContainer />
      {aToken ? (
        <>
          <Navbar />
          <div className="flex justify-normal">
            <div className="w-12 sm:w-auto">
            <Slidebar />
            </div>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/appointments" element={<Appointment/>} ></Route>
              <Route path="/add-doctors" element={<Add_Doctors aToken={aToken} />} />
            </Routes>
          </div>
        </>
      ) : (
        <Login setaoken={setaToken} />
      )}
    </div>
  );
}
