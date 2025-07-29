import { useState } from 'react'

import './styles/Home.css'
import Header from './components/Header/Header'
import HomeContent from './components/Home_Content/HomeContent'
import SignUp from './components/Sign_Up_In/SignUp'
import SignIn from './components/Sign_Up_In/SignIn'

function Home() {
  const [currentView, setCurrentView] = useState("home")

  return (
    <>
      <Header setCurrentView={setCurrentView}/>
      <div id="home-container">
        {currentView === 'home' &&  <HomeContent setCurrentView={setCurrentView}/>}
        {currentView === 'sign_up' && <SignUp setCurrentView={setCurrentView}/>}
        {currentView === 'sign_in' && <SignIn setCurrentView={setCurrentView}/>}

      </div>
    </>
  )
}

export default Home
