import "./styles/Dashboard.css"
import Header from "./components/Header/Header"
import DashboardNav from "./components/Dashboard_Nav/DashboardNav"
import { Routes, Route } from 'react-router-dom';

function Dashboard() {
    return (
        <>
            <Header/>
            <div id="dashboard-container">
                <DashboardNav />
                <div id="dashboard-content">
                    <Routes>
                        <Route path="/" element={<p>Bienvenido al Dashboard</p>} />
                        <Route path="Profile" element={<p>Bienvenido al Perfil</p>} />
                        <Route path="Patients" element={<p>Bienvenido a Patients</p>} />
                    </Routes>
                </div>
            </div>
        </>
    )
}

export default Dashboard