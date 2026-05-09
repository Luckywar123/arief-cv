import { useState, useEffect, useRef } from 'react'
import styles from './Hero.module.css'

const roles = [
  'GIS Engineer',
  'Tech Entrepreneur',
  'Product Strategist',
  'Web3 Builder',
  'Urban Innovator',
]

export default function Hero() {
  const [photoMode, setPhotoMode] = useState('web3') // 'web3' | 'professional'
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [charIdx, setCharIdx] = useState(0)

  useEffect(() => {
    const role = roles[roleIndex]
    let timer
    if (!deleting) {
      if (charIdx < role.length) {
        timer = setTimeout(() => {
          setDisplayed(role.slice(0, charIdx + 1))
          setCharIdx(c => c + 1)
        }, 75)
      } else {
        timer = setTimeout(() => setDeleting(true), 2000)
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setDisplayed(role.slice(0, charIdx - 1))
          setCharIdx(c => c - 1)
        }, 40)
      } else {
        setDeleting(false)
        setRoleIndex(i => (i + 1) % roles.length)
      }
    }
    return () => clearTimeout(timer)
  }, [charIdx, deleting, roleIndex])

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.scanline} />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className={styles.dot} />
            <span>AVAILABLE FOR WEB3 ROLES</span>
          </div>

          <div className={styles.greeting}>
            <span className={styles.greetMono}>// HELLO, WORLD</span>
          </div>

          <h1 className={styles.name}>
            <span className={styles.nameFirst}>ARIEF</span>
            <br />
            <span className={styles.nameLast}>RAHMADI</span>
            <span className={styles.nameGlitch} aria-hidden>RAHMADI</span>
          </h1>

          <div className={styles.roleWrap}>
            <span className={styles.roleLabel}>{'>'}</span>
            <span className={styles.role}>{displayed}</span>
            <span className={styles.cursor}>|</span>
          </div>

          <p className={styles.bio}>
            Bridging <span className={styles.hl}>spatial intelligence</span> with{' '}
            <span className={styles.hl}>tech entrepreneurship</span>. Building decentralized
            GIS platforms at the intersection of Web3 and urban data.
          </p>

          <div className={styles.stats}>
            {[
              { val: '6+', label: 'Years Experience' },
              { val: '2', label: 'Startups Founded' },
              { val: 'MSc', label: 'IT Entrepreneurship' },
            ].map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statVal}>{s.val}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.actions}>
            <a href="mailto:arahmadi00@gmail.com" className={styles.btnPrimary}>
              <span>GET IN TOUCH</span>
            </a>
            <a href="#experience" className={styles.btnSecondary}
              onClick={e => { e.preventDefault(); document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' }) }}>
              VIEW WORK
            </a>
          </div>
        </div>

        <div className={styles.right}>
          {/* Toggle buttons */}
          <div className={styles.photoToggle}>
            <button
              className={`${styles.toggleBtn} ${photoMode === 'web3' ? styles.toggleActive : ''}`}
              onClick={() => setPhotoMode('web3')}
            >
              <span className={styles.toggleIcon}>⬡</span>
              WEB3
            </button>
            <button
              className={`${styles.toggleBtn} ${photoMode === 'professional' ? styles.toggleActivePro : ''}`}
              onClick={() => setPhotoMode('professional')}
            >
              <span className={styles.toggleIcon}>◈</span>
              PRO
            </button>
          </div>

          <div className={styles.photoWrap}>
            <div className={styles.hexRing1} />
            <div className={styles.hexRing2} />

            {/* WEB3 MODE: hex clip + glitch + neon nodes */}
            <div className={`${styles.photoHex} ${photoMode === 'web3' ? styles.photoVisible : styles.photoHidden}`}>
              <img src="./arief.jpg" alt="Arief Rahmadi" className={`${styles.photo} ${styles.photoWeb3}`} />
              <div className={styles.glitchLayer} aria-hidden />
              <div className={styles.scanOverlay} aria-hidden />
            </div>

            {/* PROFESSIONAL MODE: clean circle + color photo */}
            <div className={`${styles.photoCircle} ${photoMode === 'professional' ? styles.photoVisible : styles.photoHidden}`}>
              <img src="./arief.jpg" alt="Arief Rahmadi" className={`${styles.photo} ${styles.photoPro}`} />
              <div className={styles.proRing} />
            </div>

            {/* Data nodes — only in web3 mode */}
            {photoMode === 'web3' && (
              <div className={styles.dataNodes}>
                {['GIS', 'Web3', 'AI', 'UX', 'Cloud'].map((tag, i) => (
                  <div key={tag} className={styles.node} style={{ '--i': i }}>
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {/* Pro badges — only in pro mode */}
            {photoMode === 'professional' && (
              <div className={styles.dataNodes}>
                {['MSc', 'GIS', 'CEO', 'PWK', 'ITE'].map((tag, i) => (
                  <div key={tag} className={styles.nodePro} style={{ '--i': i }}>
                    {tag}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mode label */}
          <div className={styles.modeLabel}>
            {photoMode === 'web3'
              ? '// CYBERPUNK MODE ACTIVE'
              : '// PROFESSIONAL MODE ACTIVE'}
          </div>
        </div>
      </div>

      <div className={styles.scroll}>
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>SCROLL</span>
      </div>
    </section>
  )
}