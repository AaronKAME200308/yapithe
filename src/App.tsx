import Navbar from './component/Navbar'
import Home from './component/Home'
import Footer from './component/Footer'
import About from './component/About'
import Actu from './component/Actu'
import Services from './component/Services'
import IPCG from './component/IPCG'
import Chroniques from './component/Chroniques'
import Contact from './component/Contact'

function App() {
 

  return (
    <div className="min-h-screen w-screen flex flex-col bg-portfolio-bg text-white">
      <Navbar />
      <Home />
      <About />
      <Actu />
      <Services />
      <IPCG />
      <Chroniques />
      <Contact  />
      <Footer />
    </div>
  )
}

export default App
