// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './styles/Landing.css'
import MainNavbar from './components/Main_Navbar/MainNavbar'
import HomeContent from './components/Landing_Content/LandingContent'
import SignUp from './components/Sign_Up_In/SignUp'
import SignIn from './components/Sign_Up_In/SignIn'
import ForgotPassword from './components/Sign_Up_In/ForgotPassword'
import Benefits from './components/Landing_Content/Benefits'
import Functions from './components/Landing_Content/Functions'
import Contact from './components/Landing_Content/Contact'

function Landing() {
  return (
    <>
      <MainNavbar />
      <div id="landing-container">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/ForgotPassword" element={<ForgotPassword />} />
          <Route path='/Benefits' element={<Benefits />} />
          <Route path='/Functions' element={<Functions />} />
          <Route path='/Contact' element={<Contact />} />
        </Routes>
      </div>
    </>
  )
}

export default Landing
