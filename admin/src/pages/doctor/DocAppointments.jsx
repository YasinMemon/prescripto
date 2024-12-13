import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

function docAppointments({ dToken }) {
  const backend = import.meta.env.VITE_BACKEND_URI
  const getData = async (req, res) => {
    try {
      const { data } = await axios.get(backend+'api/doctors/appointments',  {
        headers: {authorization: `Bearer ${dToken}`}
      });

      if(data.success){
        console.log(data.appointments);
      }else{
        alert(data.message)
      }

    } catch (error) {
      console.log('some error accured during getting the data of appointments ', error.message);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getData();
  }, [dToken])

  return (
    <div>
      doctor Appointments
    </div>
  )
}

export default docAppointments
