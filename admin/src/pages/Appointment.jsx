import React from "react";

function Appointment() {
  const appointments = [
    {
      id: 1,
      patient: "Rechard Games",
      age: 27,
      dateTime: "24th July, 2024, 10:AM",
      doctor: "Dr. Rechard Games",
      fees: "₹800",
      image: "/dr/doctor.webp",
    },
    {
      id: 2,
      patient: "Emily Brown",
      age: 34,
      dateTime: "25th July, 2024, 3:PM",
      doctor: "Dr. Sarah Lee",
      fees: "₹1,200",
      image: "/dr/doctor.webp",
    },
    {
      id: 2,
      patient: "Emily Brown",
      age: 34,
      dateTime: "25th July, 2024, 3:PM",
      doctor: "Dr. Sarah Lee",
      fees: "₹1,200",
      image: "/dr/doctor.webp",
    },
    {
      id: 2,
      patient: "Emily Brown",
      age: 34,
      dateTime: "25th July, 2024, 3:PM",
      doctor: "Dr. Sarah Lee",
      fees: "₹1,200",
      image: "/dr/doctor.webp",
    },
  ];

  return (
    <div className="outfit min-h-screen sm:m-6 font-medium bg-gray-100 p-6 rounded-md">
      {/* Heading */}
      <p className="text-lg font-semibold mb-4 text-gray-800">All Appointments</p>
      
      {/* Table Container */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md">
        <table className="w-full border-collapse text-left text-sm sm:text-base">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="sm:px-4 px-1 py-3 border-b">#</th>
              <th className="sm:px-4 px-1 py-3 border-b">Patient</th>
              <th className="sm:px-4 px-1 py-3 border-b hidden sm:table-cell">Age</th>
              <th className="sm:px-4 px-1 py-3 border-b">Date & Time</th>
              <th className="sm:px-4 px-1 py-3 border-b">Doctor</th>
              <th className="sm:px-4 px-1 py-3 border-b">Fees</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="sm:px-4 px-1 py-3 border-t">{index + 1}</td>
                <td className="sm:px-4 px-1 py-3 border-t flex items-center gap-3">
                  <img
                    src={appointment.image}
                    className="w-10 h-10 rounded-full hidden sm:block"
                    alt={`${appointment.patient}`}
                  />
                  <div>
                    <p className="font-semibold">{appointment.patient}</p>
                  </div>
                </td>
                <td className="sm:px-4 px-1 py-3 border-t hidden sm:table-cell">{appointment.age}</td>
                <td className="sm:px-4 px-1 py-3 border-t">{appointment.dateTime}</td>
                <td className="sm:px-4 px-1 py-3 border-t">{appointment.doctor}</td>
                <td className="sm:px-4 px-1 py-3 border-t">{appointment.fees}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointment;
