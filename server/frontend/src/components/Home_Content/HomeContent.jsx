import './HomeContent.css'
import exampleImage from '../../assets/example.jpg'


function HomeContent({ setCurrentView }){
    return (
        <>
            <div className='home-content' id="home-left-content">
                <h1 className='home-header'>Medical Records Management</h1>
                <p className='home-text' id='home-main-description'>
                    Secure platform to manage medical records with artificial 
                    intelligence support for diagnostics and reporting.
                </p>
                <div id='home-content-buttons'>
                    <p className="home-button" id="home-button-green" onClick={() => setCurrentView("sign_up")}>Sign Up</p>
                    <p className="home-button" id="home-button-white" onClick={() => setCurrentView("sign_in")}>Sign In</p>
                </div>
            </div>
            <div className='home-content' id="home-right-content">
                <div id='home-image-container'>
                    <img src={exampleImage} id='home-image'/>
                </div>
            </div>
        </>
    )
}

export default HomeContent