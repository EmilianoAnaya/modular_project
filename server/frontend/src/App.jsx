import { Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Patient from "./Patient";

function App() {
    return (
        <Routes>
            <Route path="/*" element={<Landing />}/>
            <Route path="/Dashboard/*" element={<Dashboard />} />
            <Route path="/Patient/*" element={<Patient />} />
        </Routes>
    )
}

export default App
