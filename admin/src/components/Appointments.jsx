import React from "react";

function Appointments({ dashboard }) {
  // const safeParseJSON = (str) => {
  //   console.log(dashboard.docData)
  //   try {
  //     // Replace invalid keys/constructs to create valid JSON
  //     const validJSON = str
  //       .replace(/new ObjectId\((.*?)\)/g, "$1") // Remove ObjectId wrapper
  //       .replace(/'/g, '"') // Replace single quotes with double quotes
  //       .replace(/([{,])(\s*)(\w+):/g, '$1"$3":'); // Add quotes to keys

  //     return JSON.parse(validJSON);
  //   } catch (error) {
  //     console.error("Invalid JSON string:", str, error);
  //     return {};
  //   }
  // };

  return (
    <div className="outfit bg-[#FFFFFF] overflow-hidden ml-3 mr-3 sm:ml-10 py-4 rounded-lg">
      <div className="pl-2 sn:pl-4">
        <div className="heading flex gap-3">
          <img src="/icons/list_icon.svg" alt="list" />
          <p>Latest Appointments</p>
        </div>{console.log(dashboard)}
      </div>
      <div>
        <hr className="my-4" />
        {dashboard?.latestAppointments?.map((item) => {
          const docData = item.docData 
          const userData = item.userData 
          return (
            <div>
              <div className="flex pl-2 sm:pl-4 flex-row justify-between items-center mr-2 sm:mr-7 mt-5">
                <div>
                  <img
                    src={docData.img}
                    className="sm:w-[52px] sm:h-[52px] w-14 h-14 rounded-full object-cover object-top"
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm">{item.docData.name}</p>
                  <p className="text-xs">{item.slot_date}</p>{" "}
                </div>
                <div className="sm:w-[32px] sm:h-[32px] sm:text-xl h-5 w-5 text-xs font-bold cursor-pointer bg-[#b87562] flex justify-center items-center rounded-full">
                  X
                </div>
              </div>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Appointments;
