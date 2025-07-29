// import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import './styles/Home.css'
import Header from './components/Header/Header'
import HomeContent from './components/Home_Content/HomeContent'
import SignUp from './components/Sign_Up_In/SignUp'
import SignIn from './components/Sign_Up_In/SignIn'

function Home() {
  const navigate = useNavigate()

  return (
    <>
      <Header setCurrentView={(view) => navigate(`/$(view)`)}/>
      <div id="home-container">
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </div>
    </>
  )
}

export default Home
