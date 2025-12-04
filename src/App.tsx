import { useState, useEffect } from 'react'
import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import { useTheme } from './hooks/useTheme'

function App() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)
  useTheme() // Initialize theme

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header isScrolled={isScrolled} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
