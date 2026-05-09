import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = ['Home', 'Experience', 'Education', 'Skills', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('Home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (link) => {
    setActive(link)
    const el = document.getElementById(link.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo} onClick={() => handleNav('Home')}>
        <span className={styles.logoHex}>⬡</span>
        <span className={styles.logoText}>AR<span className={styles.logoAccent}>.web3</span></span>
      </div>
      <ul className={styles.links}>
        {links.map(link => (
          <li key={link}>
            <button
              className={`${styles.link} ${active === link ? styles.linkActive : ''}`}
              onClick={() => handleNav(link)}
            >
              <span className={styles.linkNum}>{String(links.indexOf(link) + 1).padStart(2, '0')}.</span>
              {link}
            </button>
          </li>
        ))}
      </ul>
      <a href="mailto:arahmadi00@gmail.com" className={styles.cta}>
        HIRE ME
      </a>
    </nav>
  )
}
