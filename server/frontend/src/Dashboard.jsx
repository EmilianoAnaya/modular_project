import "./styles/Dashboard.css"
import Header from "./components/Header/Header"
import DashboardNav from "./components/Dashboard_Nav/DashboardNav"

function Dashboard() {
    return (
        <>
            <Header/>
            <div id="dashboard-container">
                <DashboardNav />
                <div id="dashboard-content">
                    <p>wakala</p>
                </div>
            </div>
        </>
    )
}

export default Dashboard