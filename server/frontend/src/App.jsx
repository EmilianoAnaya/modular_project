import { Route, Routes } from "react-router-dom";
import Landing from "./Landing";
import Dashboard from "./Dashboard";

function App() {
    return (
        <Routes>
            <Route path="/*" element={<Landing />}/>
            <Route path="/Dashboard/*" element={<Dashboard />} />
        </Routes>
    )
}

export default App