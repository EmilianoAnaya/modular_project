import { Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Patient from "./Patient";
import PatientDashboard from "./PatientDashboard";  // ← AGREGAR

function App() {
    return (
        <Routes>
            <Route path="/*" element={<Landing />}/>
            <Route path="/Dashboard/*" element={<Dashboard />} />
            <Route path="/Patient/*" element={<Patient />} />
            <Route path="/PatientDashboard/*" element={<PatientDashboard />} />  {/* ← AGREGAR */}
        </Routes>
    )
}

export default App