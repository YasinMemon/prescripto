import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Appointments({ token }) {
  const [appointments, setAppointments] = useState([]);
  const [paid, setPaid] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL;
  const doc = useSelector((state) => state.doctor.doctors);

  const getData = async () => {
    try {
      const { data } = await axios.get(`${backend}/api/user/appointments`, {
        headers: { authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message || "Failed to fetch appointments.");
        console.error("Error message from backend:", data.message);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error.message);
      toast.error("An error occurred while fetching your appointments.");
    }
  };

  const handleCancelation = async (id) => {
    try {
      const { data } = await axios.post(
        `${backend}/api/user/cancel`,
        { appointmentId: id },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        await getData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error canceling appointment:", error.message);
      toast.error("An error occurred while canceling your appointment.");
    }
  };

  useEffect(() => {
    getData();
  }, [token]);

  const docDetails = useMemo(() => {
    return appointments.map((item) => {
      const foundDoctor = doc.find((d) => d._id === item.docId);
      return (
        foundDoctor || {
          name: "Unknown",
          speciality: "N/A",
          img: "",
          address: { line1: "N/A", line2: "N/A" },
        }
      );
    });
  }, [appointments, doc]);

  const initPay = (order) => {
    const options = {
      key : import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: order.currency,
      name: 'appointment payment',
      description: 'appointment payment',
      order_id: order.id,
      reciept: order.reciept,
      handler: async (response) => {
        console.log(response);
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  const paymentHandler = async (appointmentId) => {
    try {
      const { data } = await axios.post(backend + '/api/user/payment', {appointmentId}, {
        headers: {authorization: `Bearer ${token}`}
      });
      
      if(data.success){
        setPaid(true)
        initPay(data.order)
      }else{
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="m-[2vw]">
      <p className="font-medium text-lg text-gray-700">My Appointments</p>
      <hr className="my-4" />
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment, idx) => {
            const doctor = docDetails[idx];

            return (
              <div
                key={appointment._id}
                className="border flex flex-col md:flex-row items-center md:h-[40vh] md:p-0 p-6 rounded-lg shadow-lg bg-white"
              >
                {/* Doctor Image */}
                <div className="w-full md:w-1/5 flex justify-center mb-4 md:mb-0">
                  <img
                    className="w-24 h-24 md:w-full md:h-[40vh] object-cover object-top md:rounded-none rounded-full"
                    src={doctor.img || "/placeholder.png"}
                    alt={`Dr. ${doctor.name}`}
                  />
                </div>

                {/* Appointment Details */}
                <div className="w-full md:w-3/5 px-4 text-center md:text-left">
                  <p className="font-bold text-lg md:text-xl text-gray-800">
                    Dr. {doctor.name}
                  </p>
                  <p className="text-gray-500">{doctor.speciality}</p>

                  <p className="font-bold mt-4">Address:</p>
                  <p className="text-gray-600">{doctor.address.line1}</p>
                  <p className="text-gray-600">{doctor.address.line2}</p>

                  <p className="text-gray-700 mt-4">
                    Date & Time:{" "}
                    <span className="font-semibold">
                      {appointment.slotDate.replace(/_/g, "-")} -{" "}
                      {appointment.slotTime}
                    </span>
                  </p>
                  <p>{appointment.amount}</p>
                </div>

                {/* Action Buttons */}
                <div className="w-full md:w-1/5 flex flex-col  items-center">
                  {appointment.cancelled ? (
                    <span className="text-red-500 font-bold">Cancelled</span>
                  ) : (
                    <>
                      <button onClick={() => paymentHandler(appointment._id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mb-2 w-3/4 md:w-auto">
                        {paid ? 'Paid' : 'Pay Now'}
                      </button>
                      <button
                        onClick={() => handleCancelation(appointment._id)}
                        className="border border-gray-400 text-gray-600 px-4 py-2 rounded-md hover:bg-gray-200 w-3/4 md:w-auto"
                      >
                        Cancel Appointment
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 mt-6">No appointments found.</p>
      )}
    </div>
  );
}

export default Appointments;
