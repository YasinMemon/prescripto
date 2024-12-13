import React from 'react'
import Hero from '../components/Hero'
import Specialities from '../components/Specialities'
import TopDoc from '../components/TopDoc'
import Appointment from '../components/Appointment'

const Home = () => {
  return (
    <div className='overflow-x-auto w-[93vw] mx-auto'>
      <Hero/>
      <div id='appointments' >
      <Specialities/>
      </div>
      <TopDoc/>
      <Appointment/>
    </div>
  )
}

export default Home
