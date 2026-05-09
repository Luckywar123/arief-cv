import { useEffect, useRef } from 'react'
import HexGrid from './components/HexGrid'
import Particles from './components/Particles'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Contact from './components/Contact'
import './App.css'

export default function App() {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const ring = ringRef.current
    let mx = 0, my = 0
    let rx = 0, ry = 0

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      cursor.style.left = `${mx - 6}px`
      cursor.style.top = `${my - 6}px`
    }

    const lerp = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`
      requestAnimationFrame(lerp)
    }

    window.addEventListener('mousemove', move)
    lerp()

    // Scroll reveal observer
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left').forEach(el => obs.observe(el))

    return () => {
      window.removeEventListener('mousemove', move)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
      <HexGrid />
      <Particles />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Education />
        <Skills />
        <Contact />
      </main>
    </>
  )
}
