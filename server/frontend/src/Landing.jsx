// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import './styles/Home.css'
import Header from './components/Header/Header'
import HomeContent from './components/Home_Content/LandingContent'
import SignUp from './components/Sign_Up_In/SignUp'
import SignIn from './components/Sign_Up_In/SignIn'

function Landing() {
  return (
    <>
      <Header />
      <div id="home-container">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          {/* Ruta a Home de la cual se accede únicamente por /SignIn */}
        </Routes>
      </div>
    </>
  )
}

export default Landing
