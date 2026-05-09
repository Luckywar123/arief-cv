import { useEffect, useRef } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) ref.current?.classList.add('visible') },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="contact" className={styles.section}>
      <div className={`${styles.container} reveal`} ref={ref}>
        <div className={styles.header}>
          <span className={styles.tag}>05. CONTACT</span>
          <h2 className={styles.title}>LET'S <span className={styles.accent}>BUILD</span></h2>
          <div className={styles.divider} />
        </div>

        <div className={styles.grid}>
          <div className={styles.cta}>
            <p className={styles.ctaText}>
              Open to Web3, GIS, and tech entrepreneurship roles.
              Let's build something meaningful with spatial data and decentralized systems.
            </p>

            <div className={styles.links}>
              {[
                { icon: '✉', label: 'EMAIL', value: 'arahmadi00@gmail.com', href: 'mailto:arahmadi00@gmail.com' },
                { icon: '📱', label: 'PHONE', value: '+62 819 3498 2405', href: 'tel:+6281934982405' },
                { icon: '📍', label: 'LOCATION', value: 'Pekanbaru, Indonesia', href: null },
                { icon: '🌐', label: 'PROJECT', value: 'scapegis.com', href: 'https://scapegis.com' },
              ].map(l => (
                <div key={l.label} className={styles.linkItem}>
                  <span className={styles.linkIcon}>{l.icon}</span>
                  <div>
                    <div className={styles.linkLabel}>{l.label}</div>
                    {l.href ? (
                      <a href={l.href} className={styles.linkVal} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        {l.value}
                      </a>
                    ) : (
                      <span className={styles.linkValStatic}>{l.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.statusCard}>
            <div className={styles.statusHeader}>
              <span className={styles.statusDot} />
              <span className={styles.statusText}>CURRENTLY AVAILABLE</span>
            </div>
            <div className={styles.statusItems}>
              {[
                ['ROLE TYPE', 'Full-time / Contract'],
                ['FOCUS', 'Web3 · GIS · Product'],
                ['START', 'Immediately'],
                ['REMOTE', 'Open to Remote'],
                ['RELOCATION', 'Open to Discuss'],
              ].map(([k, v]) => (
                <div key={k} className={styles.statusRow}>
                  <span className={styles.statusKey}>{k}</span>
                  <span className={styles.statusVal}>{v}</span>
                </div>
              ))}
            </div>

            <a href="mailto:arahmadi00@gmail.com" className={styles.bigBtn}>
              START CONVERSATION →
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <span className={styles.footerMono}>// ARIEF RAHMADI · 2025</span>
        <span className={styles.footerMono}>Built with React + Vite</span>
      </div>
    </section>
  )
}
