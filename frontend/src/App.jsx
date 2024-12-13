import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchDoc } from "../Redux/slices/doctorSlice";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Doctors from "./pages/Doctors";
import SingleDoc from "./pages/SingleDoc";
import Footer from "./components/Footer.jsx";
import AboutUs from "./pages/About.jsx";
import ContactUs from "./pages/Contact.jsx";
import Login from "./pages/Login.jsx";

export default function App() {
  const [token, setToken] = useState('dsjkshjdf')
  const dispatch = useDispatch();
  const backend = import.meta.env.VITE_BACKEND_URL;
  const getDoc = async () => {
    try {
      const { data } = await axios.get(
         backend + "/api/doctors/list"
      );
      if (data.success) {
        // setDoctors(data.doctors);
        dispatch(fetchDoc({ doctors: data.doctors}))
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDoc();
  }, []);

  return (
    <>
      <Router>
      <Navbar setToken={setToken} token={token} />
        <Routes>
          <Route path="/" element={<Home/>} ></Route>
          <Route path="/doctors" element={<Doctors/>} />
          <Route path="/doctors/:speciality" element={<Doctors/>} />
          <Route path="/doctor/:id" element={<SingleDoc/>} ></Route>
          <Route path="/about" element={<AboutUs/>} ></Route>
          <Route path="/contact" element={<ContactUs/>} ></Route>
          <Route path="/login" element={<Login/>} ></Route>
        </Routes>
        <Footer/>
      </Router>
    </>
  );
}
