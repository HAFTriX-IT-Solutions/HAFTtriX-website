import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import RevealSystem from './components/RevealSystem'
import ScrollProgress from './components/ScrollProgress'
import LoadingScreen from './components/LoadingScreen'
import SEO from './components/SEO'
import FluidBackground from './fluid/FluidBackground'
import { SmoothScrollProvider, useLenis } from './fluid/SmoothScrollProvider'
import { ThemeProvider } from './context/ThemeContext'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Solutions = lazy(() => import('./pages/Solutions'))
const Projects = lazy(() => import('./pages/Projects'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const Blog = lazy(() => import('./pages/Blog'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))

function RouteScrollReset() {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, lenis])

  return null
}

function App() {
  return (
    <ThemeProvider>
      {/* Mounted once, above the router: the fluid canvas and the scroll
          behaviour must survive navigation instead of remounting per page. */}
      <SmoothScrollProvider>
        <Router>
          <div className="app-shell">
            <FluidBackground />
            <RevealSystem />
            <ScrollProgress />
            <RouteScrollReset />
            <SEO />
            <Navbar />
            <Suspense fallback={<LoadingScreen />}>
              <RoutePages />
            </Suspense>
            <Footer />
            <ScrollToTop />
          </div>
        </Router>
      </SmoothScrollProvider>
    </ThemeProvider>
  )
}

function RoutePages() {
  const location = useLocation()

  return (
    <main className="relative z-10">
      <div key={location.pathname} className="route-page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
          <Route path="/cybersecurity" element={<Navigate to="/services" replace />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </main>
  )
}

export default App
