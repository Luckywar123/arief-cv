import { useState, useEffect } from 'react'
import styles from './Hero.module.css'

const roles = [
  'GIS Engineer',
  'Tech Entrepreneur',
  'Product Strategist',
  'Web3 Builder',
  'Urban Innovator',
]

export default function Hero() {
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
          <div className={styles.photoWrap}>
            <div className={styles.hexRing1} />
            <div className={styles.hexRing2} />
            <div className={styles.photoHex}>
              <img src="./arief.jpg" alt="Arief Rahmadi" className={styles.photo} />
            </div>
            <div className={styles.dataNodes}>
              {['GIS', 'Web3', 'AI', 'UX', 'Cloud'].map((tag, i) => (
                <div key={tag} className={styles.node} style={{ '--i': i }}>
                  {tag}
                </div>
              ))}
            </div>
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
