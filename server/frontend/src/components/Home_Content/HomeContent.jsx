import './HomeContent.css'
import exampleImage from '../../assets/example.jpg'


function HomeContent(){
    return (
        <>
            <div className='home-content' id="home-left-content">
                <h1 className='home-header'>Medical Records Management</h1>
                <p className='home-text' id='home-main-description'>
                    Secure platform to manage medical records with artificial 
                    intelligence support for diagnostics and reporting.
                </p>
                <div id='home-content-buttons'>
                    <a className="home-button" id="home-button-green" href="">Sign Up</a>
                    <a className="home-button" id="home-button-white" href="">Sign In</a>
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