import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Login({ setaToken }) {
  const backendUri = import.meta.env.VITE_BACKEND_URI;

  const [state, setstate] = useState("Admin");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    
    e.preventDefault();
    try {
      if (state === "Admin") {
        const { data } = await axios.post(backendUri + "api/admin/login", {
          email,
          password,
        });

        if(data.success){
          setaToken(data.token)
          
          localStorage.setItem('token', data.token);
          toast.success(data.message);
        }else{
          toast.error(data.message);
        }

      } else {
        const data = axios.post(backendUri + "/api/doctor/login", {
          email,
          password,
        });
      }
    } catch (error) {
      console.log("something went wrong", error.message);
    }
  };

  return (
    <div className="flex justify-center overflow-hidden items-center min-h-screen">
      <form
        onSubmit={onSubmitHandler}
        className="bg-[#FFFFFF] sm:h-[340px] sm:w-[400px] ring-[0.5] shadow-sm shadow-black ring-black text-center rounded-[20px]"
      >
        <h2 className="pt-10 font-bold text-2xl">
          {" "}
          <span className=" blueText">{state} </span> login
        </h2>
        <div className="px-10 py-2 pt-5 flex justify-center flex-col items-start">
          <label htmlFor="username">Email:</label>
          <input
            onChange={(e) => setemail(e.target.value)}
            value={email}
            className="w-full ring-1 text-xl ring-black pl-2 rounded-md py-[1]"
            type="text"
          />
        </div>

        <div className="px-10 py-2 flex justify-center items-start flex-col">
          <label htmlFor="password">Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full ring-1 text-xl ring-black pl-2 rounded-md py-[1]"
            type="password"
          />
        </div>

        <div className="px-10 pb-20 mt-1 py-2 flex flex-col justify-center items-start ">
          <input
            className="bluewala text-white w-full text-xl py-1 rounded-md border-none cursor-pointer"
            type="submit"
          />
          {state === "Doctor" ? (
            <div className="text-sm mt-4">
              {" "}
              Admin Login ?
              <span
                className="ml-1 cursor-pointer underline blueText font-sans"
                onClick={() => setstate("Admin")}
              >
                Click here
              </span>{" "}
            </div>
          ) : (
            <div className="text-sm mt-4">
              {" "}
              Doctor Login ?
              <span
                className="ml-1 cursor-pointer underline blueText font-sans"
                onClick={() => setstate("Doctor")}
              >
                Click here
              </span>{" "}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
