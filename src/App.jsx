
import { BrowserRouter, Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import Projects from "./pages/Projects"
import ProjectDetail from "./pages/ProjectDetail.jsx";


const App = () => {
  return (

    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App