import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './pages/About'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Projet from './pages/Projet'
import Contact from './pages/Contact'
import Services from './pages/Services'



export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projet/:id" element={<Projet />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apropos" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
      <Footer />
    </div>
  )
}