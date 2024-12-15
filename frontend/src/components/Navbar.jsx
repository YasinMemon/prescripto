import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";

function Navbar({ token, setToken }) {
  const [showNav, setShowNav] = useState(false); // Mobile menu toggle
  const [showProfile, setShowProfile] = useState(false); // Profile dropdown toggle
  const logoutHandler = () => {
    setToken("");
    localStorage.clear();
  };

  return (
    <>
      <nav className="flex justify-between items-center mb-4 border-b border-black py-2 px-4 sm:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <img src="/logo/logo.svg" className="h-8" alt="Logo" />
          <a href="http://localhost:5174">
            <button className="hidden md:block bg-blue-500 px-4 py-2 text-white rounded-lg font-semibold">
              Admin
            </button>
          </a>
        </div>

        {/* Center Links (Desktop Only) */}
        <div className="hidden sm:block">
          <ul className="flex gap-6 items-center">
            <Link to="/" className="hover:text-blue-500">
              <li>HOME</li>
            </Link>
            <Link to="/doctors" className="hover:text-blue-500">
              <li>ALL DOCTORS</li>
            </Link>
            <Link to="/about" className="hover:text-blue-500">
              <li>ABOUT</li>
            </Link>
            <Link to="/contact" className="hover:text-blue-500">
              <li>CONTACT</li>
            </Link>
          </ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2">
          {token ? (
            <div
              className="relative flex justify-center items-center gap-3 cursor-pointer"
              onClick={() => setShowProfile((prev) => !prev)}
            >
              {/* Profile Icon */}
              <img src="/profile.svg" alt="Profile" />
              <img src="./dropdow.svg" alt="Dropdown Icon" />
              {/* Dropdown Menu */}
              {showProfile && token && (
                <div className="absolute top-full mt-2 z-20 bg-gray-100 rounded shadow-lg right-0">
                  <div className="w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                    <p className="cursor-pointer hover:text-blue-500">
                      <Link to="/profile">My Profile</Link>
                    </p>
                    <p className="cursor-pointer hover:text-blue-500">
                      <Link to="/appointments">My Appointments </Link>
                    </p>
                    <p
                      onClick={logoutHandler}
                      className="cursor-pointer hover:text-red-500"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="hidden sm:block bg-blue-500 px-4 py-2 text-white rounded-full hover:bg-blue-600">
                Create Account
              </button>
            </Link>
          )}

          {/* Hamburger Menu (Mobile Only) */}
          <div className="sm:hidden">
            <GiHamburgerMenu
              aria-label="Open Menu"
              className="text-2xl cursor-pointer"
              onClick={() => setShowNav(true)}
            />
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {showNav && (
        <div className="fixed inset-0 bg-white z-50">
          <div className="flex justify-between items-center p-4">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <img src="/logo/logo.svg" className="h-6" alt="Logo" />
            </div>

            {/* Close Icon */}
            <ImCross
              aria-label="Close Menu"
              className="text-2xl cursor-pointer"
              onClick={() => setShowNav(false)}
            />
          </div>

          {/* Mobile Links */}
          <ul className="flex flex-col items-center gap-6 mt-16 text-lg font-semibold">
            <Link to="/" onClick={() => setShowNav(false)}>
              <li className="hover:text-blue-500">HOME</li>
            </Link>
            <Link to="/doctors" onClick={() => setShowNav(false)}>
              <li className="hover:text-blue-500">ALL DOCTORS</li>
            </Link>
            <Link to="/about" onClick={() => setShowNav(false)}>
              <li className="hover:text-blue-500">ABOUT</li>
            </Link>
            <Link to="/contact" onClick={() => setShowNav(false)}>
              <li className="hover:text-blue-500">CONTACT</li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
