import React, { useState } from "react";

const AuthForm = ({ setToken }) => {
  const [isRegister, setIsRegister] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call logic here.
    setToken("dummyToken");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isRegister ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:ring-2"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setIsRegister(false)}
                className="text-indigo-500 hover:underline focus:outline-none"
              >
                Login here
              </button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <button
                onClick={() => setIsRegister(true)}
                className="text-indigo-500 hover:underline focus:outline-none"
              >
                Register here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
