import React from "react";

function Appointments() {
  return (
    <div className="outfit bg-[#FFFFFF] overflow-hidden ml-3 mr-3 sm:ml-10 py-4 rounded-lg">
      <div className="pl-2 sn:pl-4">
        <div className="heading flex gap-3">
          <img src="/icons/list_icon.svg" alt="list" />
          <p>Latest Appointments</p>
        </div>
      </div>
      <div>
        <hr className="my-4" />
        <div className="flex pl-2 sm:pl-4 flex-row justify-between items-center mr-2 sm:mr-7 mt-5">
          <div><img src="https://imgs.search.brave.com/yywpmDr_FXw8yk9jrmF_-AW6fJ2u0F-K96zHjyEh5bo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/ZW1hbGUtZG9jdG9y/LWhvc3BpdGFsXzIz/LTIxNDg4Mjc3NjAu/anBnP3NlbXQ9YWlz/X2h5YnJpZA" className="sm:w-[52px] sm:h-[52px] w-14 h-14 rounded-full object-cover object-top" alt="" /></div>
          <div>
            <p className="text-sm">Dr. Richard James</p>
            <p className="text-xs">Booking on 24th July, 2024</p>{" "}
          </div>
          <div className="sm:w-[32px] sm:h-[32px] sm:text-xl h-5 w-5 text-xs font-bold cursor-pointer bg-[#b87562] flex justify-center items-center rounded-full" >X</div>
        </div>
        <div className="flex pl-2 sm:pl-4 flex-row justify-between items-center mr-2 sm:mr-7 mt-5">
          <div><img src="https://imgs.search.brave.com/yywpmDr_FXw8yk9jrmF_-AW6fJ2u0F-K96zHjyEh5bo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9m/ZW1hbGUtZG9jdG9y/LWhvc3BpdGFsXzIz/LTIxNDg4Mjc3NjAu/anBnP3NlbXQ9YWlz/X2h5YnJpZA" className="sm:w-[52px] sm:h-[52px] w-14 h-14 rounded-full object-cover object-top" alt="" /></div>
          <div>
            <p className="text-sm">Dr. Richard James</p>
            <p className="text-xs">Booking on 24th July, 2024</p>{" "}
          </div>
          <div className="sm:w-[32px] sm:h-[32px] sm:text-xl h-5 w-5 text-xs font-bold cursor-pointer bg-[#b87562] flex justify-center items-center rounded-full" >X</div>
        </div>

      </div>
    </div>
  );
}

export default Appointments;
