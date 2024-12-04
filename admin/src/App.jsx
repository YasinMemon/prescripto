import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";

export default function App() {
  const backendUri = import.meta.env.VITE_BACKEND_URI;

  const [aToken, setaToken] = useState(localStorage.getItem("token") || "");
  return aToken ? (
    <>
      <div className="overflow-x-hidden">
      <Navbar/>
      <Home />
      <ToastContainer />
      </div>
    </>
  ) : (
    <>
      <Login setaToken={setaToken} />
      <ToastContainer />
    </>
  );
}
