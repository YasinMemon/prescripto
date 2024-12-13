import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Appointment({ token }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URI;
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}api/admin/appointments`,
          {
            headers: { authorization: `Bearer ${token}` },
          }
        );

        if (data.success) {
          setAppointments(data.appointments);
          
        } else {
          toast.error(data.message);
          console.log(data.message);
        }
      } catch (error) {
        console.error(
          "Error occurred during fetching the appointments",
          error.message
        );
        toast.error(error.message);
      }
    };

    if (token) {
      getAppointments();
    }
  }, [token, backendUrl]);

  return (
    <div className="outfit min-h-screen sm:m-6 font-medium bg-gray-100 w-[78vw] sm:p-6 rounded-md">
      {/* Heading */}
      <p className="text-lg font-semibold mb-4 text-gray-800">All Appointments</p>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md w-full">
        <table className="w-full border-collapse text-left text-sm sm:text-base">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="sm:px-4 px-1 py-3 border-b">#</th>
              <th className="sm:px-4 px-1 py-3 border-b">Patient</th>
              <th className="sm:px-4 px-1 py-3 border-b">Name</th>
              <th className="sm:px-4 px-1 py-3 border-b hidden sm:block">Age</th>
              <th className="sm:px-4 px-1 py-3 border-b">Date & Time</th>
              <th className="sm:px-4 px-1 py-3 border-b">Doctor</th>
              <th className="sm:px-4 px-1 py-3 border-b">Fees</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {appointments?.map((appointment, index) => (
              <tr key={appointment._id} className="hover:bg-gray-50">
                <td className="sm:px-4 px-1 py-3 border-t">{index + 1}</td>
                <td className="sm:px-4 px-1 py-3 border-t flex items-center gap-3">
                  <img
                    src={appointment.userData?.img || "/default-user.png"}
                    className="w-10 h-10 rounded-full hidden sm:block"
                    alt={appointment.userData?.name || "User"}
                  />
                  <div>
                    <p className="font-semibold">{appointment.userData?.name}</p>
                  </div>
                </td>
                <td className="sm:px-4 px-1 py-3 border-t hidden sm:table-cell">
                  {appointment.userData?.age || "N/A"}
                </td>
                <td className="sm:px-4 px-1 py-3 border-t">
                  {appointment.slotDate} at {appointment.slotTime}
                </td>
                <td className="sm:px-4 px-1 py-3 border-t">
                  {appointment.docData?.name || "N/A"}
                </td>
                <td className="sm:px-4 px-1 py-3 border-t">
                  ₹{appointment.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Appointment;
