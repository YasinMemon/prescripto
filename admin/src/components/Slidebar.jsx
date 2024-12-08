import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaEdit, FaAddressCard, FaClipboardList } from "react-icons/fa";
import { NavLink } from "react-router-dom";

// Helper Component for Sidebar Items
const SidebarItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex justify-start items-center gap-2 sm:w-[13rem] py-3 ${
        isActive ? "w-full py-2 sm:bg-slate-300 sm:border-r-4 sm:border-blue-500 text-blue-600" : ""
      }`
    }
  >
    <div className="logo sm:w-6 h-6 flex justify-center items-center">
      <Icon />
    </div>
    <div className="section hidden sm:block">{label}</div>
  </NavLink>
);

const Slidebar = () => {
  return (
    <div className="flex mt-[1px] h-full static py-10 sm:pr-32 sm:w-64  border-r border-gray-600 bg-white">
      <div className="outfit ">
        <ul className="sm:ml-12 mx-4">
          <li>
            <SidebarItem to="/" icon={MdDashboard} label="Dashboard" />
          </li>
          <li>
            <SidebarItem to="/appointments" icon={FaEdit} label="Appointments" />
          </li>
          <li>
            <SidebarItem to="/add-doctors" icon={FaAddressCard} label="Add Doctors" />
          </li>
          <li>
            <SidebarItem to="/list" icon={FaClipboardList} label="Doctors List" />
          </li>
          {/* <li>
            <SidebarItem to="/patients" icon={FaAddressCard} label="Patients" />
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Slidebar;
