// import { useState } from 'react'
import './styles/home.css'
import Header from './components/Header/header'

function Home() {
  return (
    <>
      <Header />
      <div id='home-container'>
        <div className='home-content' id="home-left-content">
            <h1>Medical Records Management</h1>
            <p>
              Secure platform to manage medical records with artificial 
              intelligence support for diagnostics and reporting.
            </p>
            <div id='home-content-buttons'>
              <a className="home-button" id="home-button-green" href="">Sign Up</a>
              <a className="home-button" id="home-button-white" href="">Sign In</a>
            </div>
        </div>
        <div className='home-content' id="home-right-content">
        </div>
      </div>
    </>
  )
}

export default Home
