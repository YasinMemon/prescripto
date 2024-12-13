import React, { useState, useEffect } from "react";
import Related from "./Related";

function BookingSlots() {
  const [docSlots, setDocSlots] = useState([]);
  const [slotsIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const DaysInWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getAvailableSlots = () => {
    const newDocSlots = [];
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(12, 0, 0, 0); // End time is 12:00 PM

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 8 ? currentDate.getHours() : 8);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(8);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      newDocSlots.push(timeSlots);
    }
    setDocSlots(newDocSlots);
  };

  useEffect(() => {
    getAvailableSlots();
  }, []);

  return (
    <div className="mt-10 p-6">
      <p className="text-xl text-gray-500 font-bold mb-4">Booking Slots</p>
      {/* Day Selector */}
      <div className="flex justify-start items-center gap-4 overflow-x-auto">
        {docSlots.length > 0 &&
          docSlots.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSlotIdx(idx)}
              className={`text-center py-3 px-6 rounded-full cursor-pointer ${
                slotsIdx === idx ? "bg-blue-500 text-white" : "border border-gray-300"
              }`}
            >
              <p className="font-bold">{DaysInWeek[idx]}</p>
              <p className="text-sm">{item[0]?.dateTime.getDate()}</p>
            </div>
          ))}
      </div>
      {/* Time Slots */}
      <div className="flex items-center gap-3 overflow-x-auto mt-6">
        {docSlots.length > 0 &&
          docSlots[slotsIdx].map((item, idx) => (
            <p
              key={idx}
              onClick={() => setSlotTime(item.time)}
              className={`cursor-pointer rounded-full text-sm py-2 px-5 ${
                item.time === slotTime ? "bg-blue-500 text-white" : "border border-gray-300"
              }`}
            >
              {item.time}
            </p>
          ))}
      </div>
      <button className="bg-blue-500 px-10 py-3 text-lg text-white font-semibold rounded-full mt-10" >Book an Appointment</button>
      {/* <Related docId={} /> */}
    </div>
  );
}

export default BookingSlots;
