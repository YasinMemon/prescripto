import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

function Navbar({ setAtoken }) {
  const [showNav, setshowNav] = useState(false);

  const logoutHandler = () =>{
    setAtoken('');
    localStorage.clear();
  }
  return (
    <>
      <nav className="flex justify-between sm:px-16 items-center outfit sm:my-4">
        <div className="leftSide pl-5 sm:pt-0 sm:pl-0 flex items-center gap-3 sm:gap-4">
          <img src="/logo/logo.svg" className="md:h-[60px] w-[10rem]" alt="" />
          {/* <img src="/logo/name.png" className="sm:h-[34px] h-[25px]" alt="" /> */}
        </div>
        <div className="sm:hidden block w-52"></div>
        <div className="rightSide">
          <button className="bluewala w-[195px] h-[54px] text-[18px] px-4 py-1 hidden sm:block text-white outfit rounded-[46px]" onClick={logoutHandler} >
            Logout
          </button>
          <div className="sm:hidden block pr-5 pt-4 font-bold cursor-pointer">
            <button className="bluewala px-4 py-1 text-white outfit rounded-[46px]">
              Logout
            </button>
            {/* <GiHamburgerMenu className="h-10 text-[1.5rem] font-bold" onClick={() => setshowNav(!showNav)} /> */}
          </div>
        </div>
      </nav>
      <div
        className={`${
          showNav ? "block" : "hidden"
        } sm:hidden h-screen w-full fixed top-0 bg-white`}
      >
        <div className="flex justify-between items-center pt-4 px-5">
          <div className="logo flex items-center gap-3">
            <img src="/logo/logo.svg" className="h-[1.5rem]" alt="" />
            {/* <img src="/logo/name.png" className="h-[25px]" alt="" /> */}
          </div>
          <div className="cross">
            <ImCross
              onClick={() => setshowNav(!showNav)}
              className="h-[1.5rem] text-[1.5rem] cursor-pointer font-bold"
            />
          </div>
        </div>
      </div>
      <div className="bg-slate-900 mt-3 sm:mt-0 w-screen h-[0.25px]"></div>
    </>
  );
}

export default Navbar;
