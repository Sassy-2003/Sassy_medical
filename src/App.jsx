import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Doctors from './pages/doctors'
import Login from './pages/login'
import About from './pages/about'
import Contact from './pages/contact'
import Myprofile from './pages/myprofile'
import Myappointments from './pages/myappointments'
import Appointment from './pages/appointment'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Chatbot from './components/chatbot'

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />          
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<Myprofile />} />
        <Route path='/my-appointments' element={<Myappointments />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/Banner' element={<Banner/>} />
      </Routes>
      <Chatbot/>
      <Footer/>
    </div>
  )
}

export default App