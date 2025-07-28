
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import Projects from "./pages/Projects"
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Login from "./admin/Login";
import Dashboard from "./admin/Dashboard";
import AddProjectForm from "./admin/components/dashboard/AddProjectForm";
import ManageProjects from "./admin/ManageProjects";


const App = () => {
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />


        {/* <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/addproject" element={<AddProjectForm />} />
        <Route path="/admin/manageproject" element={<ManageProjects />} /> */}
      </Routes>
    </BrowserRouter>

  )
}

export default App