import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'
import { ThemeProvider } from './context/ThemeContext'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Projects = lazy(() => import('./pages/Projects'))
const Cybersecurity = lazy(() => import('./pages/Cybersecurity'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteScrollReset() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-ivory dark:bg-dark-navy transition-colors duration-300">
          <RouteScrollReset />
          <Navbar />
          <Suspense fallback={<LoadingScreen />}>
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/solutions" element={<Solutions />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/cybersecurity" element={<Cybersecurity />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </Suspense>
          <Footer />
          <ScrollToTop />
        </div>
      </Router>
    </ThemeProvider>
  )
}

export default App
