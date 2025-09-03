import { useLocation, useNavigate } from 'react-router-dom'
import './SidebarButton.css'

function SidebarButton({title, img_route, navigation_route}){
    const navigation = useNavigate()
    const location = useLocation()

    const isActive = location.pathname  === `/Patient${navigation_route}`

    return (
        <>
            <div className= {`sidebar-button ${isActive ? "is-active" : ""}`} onClick={() => navigation(`/Patient${ navigation_route }`)}>
                <img src={`/assets/${img_route}`}/>
                <label>{ title }</label>
            </div>
        </>
    )
}

export default SidebarButton