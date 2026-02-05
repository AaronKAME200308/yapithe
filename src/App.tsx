import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar'
import Home from './component/Home'
import Footer from './component/Footer'
import About from './component/About'
import Actu from './component/Actu'
import Services from './component/Services'
import IPCG from './component/IPCG'
import Chroniques from './component/Chroniques'
import Contact from './component/Contact'
import VoirPlus from './component/VoirPlus' // <-- nouvelle page

function App() {
  return (
    <Router>
      <div className="min-h-screen w-screen flex flex-col bg-portfolio-bg text-white bg-linear-to-r from-[#e0f7f1] to-[#ffffff]">
        <Navbar />

        <Routes>
          <Route path="/" element={
            <>
              <Home />
              <About />
              <Actu />
              <Services />
              <IPCG />
              <Chroniques />
              <Contact />
            </>
          }/>

          <Route path="/voir-plus" element={<VoirPlus />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

export default App
