import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";

import ProjectPage from "./pages/Projects.tsx";
import DashBoard from "./pages/Dashboard.tsx";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProjectPage/>}/>
                <Route path="/dashboard/:projectId" element={<DashBoard/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
