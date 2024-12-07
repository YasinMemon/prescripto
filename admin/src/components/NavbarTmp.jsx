import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";

function NavbartTmp() {
  const [showNav, setshowNav] = useState(false);
  return (
    <>
      <nav className="flex justify-between px-2 sm:px-0 sm:justify-around items-center outfit my-1 sm:my-4">
        <div className="leftSide pl-5 pt-4 sm:pt-0 sm:pl-0 flex items-center gap-3 sm:gap-4">
          <img src="/logo/logo.svg" className="h-[1.5rem]" alt="" />
          {/* <img src="/logo/name.png" className="sm:h-[34px] h-[25px]" alt="" /> */}
        </div>
        <div className="sm:hidden block w-52"></div>
        <div className=" hidden sm:block centerSide">
          <ul className="sm:flex gap-6 flex-col hidden sm:flex-row sm:justify-center py-4 items-center">
            <li>HOME</li>
            <li>ALL DOCTORS</li>
            <li>ABOUT</li>
            <li>CONTACT</li>
          </ul> 
        </div>
        <div className="rightSide">
          <button className="bluewala px-4 py-1 hidden sm:block text-white outfit rounded-[46px]">
            Create account
          </button>
          <div className="sm:hidden block pr-5 pt-4 font-bold cursor-pointer">
            <GiHamburgerMenu className="h-10 text-[1.5rem] font-bold" onClick={() => setshowNav(!showNav)} />
          </div>
        </div>
      </nav>
      <div className={`${showNav ? 'block' : 'hidden'} sm:hidden h-screen w-full fixed top-0 bg-white`}> 
        <div className="flex justify-between items-center pt-4 px-5"> 
          <div className="logo flex items-center gap-3">
          <img src="/logo/logo.svg" className="h-[1.5rem]" alt="" />
          {/* <img src="/logo/name.png" className="h-[25px]" alt="" /> */}
          </div>
          <div className="cross">
          <ImCross onClick={() => setshowNav(!showNav)} className="h-[1.5rem] text-[1.5rem] cursor-pointer font-bold" />
          </div>
        </div>
        <ul className="flex flex-col pt-24 pl-4 text-lg items-center outfit font-bold">
          <div className="text-start flex flex-col gap-8 ml-4">
          <li>HOME</li>
          <li>ALL DOCTORS</li>
          <li>ABOUT</li>
          <li>CONTACT</li>
          </div> 
        </ul>
      </div>
      
    </>
  );
}

export default NavbartTmp;
