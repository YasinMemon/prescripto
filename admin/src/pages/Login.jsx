import React, { useState } from "react";

function Login() {
  const [state, setstate] = useState("Admin");
  return (
    <div className="flex justify-center items-center h-screen bg-slate-400">
      <form className="bg-slate-200 rounded-lg text-center">
          <h2 className="pt-10 font-bold text-2xl">{state} login</h2>
          <div  className="px-20 py-2 pt-10 flex justify-center items-center">
            <label htmlFor="username">Username:</label>
            <input  className="w-60 bg-slate-300 ring-1 ring-black pl-2 ml-2 rounded-md border-none py-[0.5]" type="text" />
          </div>

          <div className="px-20 py-2 flex justify-center items-center">
            <label htmlFor="password">Password:</label>
            <input className="w-60 bg-slate-300 ring-1 ring-black pl-2 ml-2 rounded-md border-none py-[0.5]" type="password" />
          </div>

          <div className="px-20 pb-20 mt-6 py-2">
            <input className="bg-slate-300 ring-1 ring-black px-5  ml-2 rounded-md border-none py-[0.5]" type="submit" />
          </div>
      </form>
    </div>
  );
}

export default Login;
