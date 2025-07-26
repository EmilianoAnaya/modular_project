// import { useState } from 'react'
import './styles/Home.css'
import Header from './components/Header/Header'
import HomeContent from './components/Home_Content/HomeContent'

function Home() {
  return (
    <>
      <Header />
      <div id="home-container">
        <HomeContent/>
      </div>
    </>
  )
}

export default Home
