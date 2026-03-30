import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Portfolio from './pages/Portfolio'
import Projet from './pages/Projet'
import Contact from './pages/Contact'
import About from './pages/About'
import Services from './pages/Services'
import ScrollToTop from './components/ScrollToTop'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-transition">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/projet/:id" element={<Projet />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apropos" element={<About />} />
        <Route path="/services" element={<Services />} />
      </Routes>
    </div>
  )
}

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <main style={{ position: 'relative', zIndex: 1, backgroundColor: '#141414' }}>
        <AnimatedRoutes />
      </main>
      <footer style={{ position: 'sticky', bottom: 0, zIndex: 0 }}>
        <Footer />
      </footer>
    </div>
  )
}