import { useEffect, useRef } from 'react'
import styles from './Education.module.css'

const edu = [
  {
    degree: 'Master of Science',
    field: 'Information Technological Entrepreneurship',
    school: 'Innopolis University',
    country: 'Russia 🇷🇺',
    period: '2023 — 2025',
    gpa: 'Grade A',
    thesis: 'Development & Commercialization of ScapeGIS Collaborative GIS Platform with Realtime Database & AI Assistance',
    highlights: ['Innovation & Tech Commercialization', 'Strategic Financial Modeling', 'Product Development & IP Management', 'Market Analysis & Validation'],
    color: '#00d4ff',
    icon: '⬡'
  },
  {
    degree: 'Bachelor of Urban & Regional Planning',
    field: 'Perencanaan Wilayah dan Kota (S.P.W.K.)',
    school: 'Universitas Brawijaya',
    country: 'Indonesia 🇮🇩',
    period: '2015 — 2022',
    gpa: 'GPA 2.70',
    thesis: 'Recommendations for Crime Reduction Strategies in Kota Dumai',
    highlights: ['Geographic Information Systems (GIS)', 'Urban Design & Spatial Planning', 'Community Engagement & Development', 'Environmental & Socio-Economic Analysis'],
    color: '#7b3fff',
    icon: '◈'
  }
]

export default function Education() {
  const refs = useRef([])

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    refs.current.forEach(el => el && obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="education" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>03. EDUCATION</span>
          <h2 className={styles.title}>ACADEMIC <span className={styles.accent}>BACKGROUND</span></h2>
          <div className={styles.divider} />
        </div>

        <div className={styles.grid}>
          {edu.map((e, i) => (
            <div
              key={i}
              ref={el => refs.current[i] = el}
              className={`${styles.card} reveal`}
              style={{ transitionDelay: `${i * 0.15}s`, '--color': e.color }}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>
                  <span className={styles.icon}>{e.icon}</span>
                </div>
                <div className={styles.meta}>
                  <span className={styles.period}>{e.period}</span>
                  <span className={styles.gpaBadge}>{e.gpa}</span>
                </div>
              </div>

              <div className={styles.degree}>{e.degree}</div>
              <div className={styles.field}>{e.field}</div>

              <div className={styles.schoolRow}>
                <span className={styles.school}>{e.school}</span>
                <span className={styles.country}>{e.country}</span>
              </div>

              <div className={styles.separator} />

              <div className={styles.thesisLabel}>THESIS</div>
              <p className={styles.thesis}>{e.thesis}</p>

              <div className={styles.separator} />

              <div className={styles.highlightsLabel}>KEY LEARNINGS</div>
              <div className={styles.highlights}>
                {e.highlights.map((h, j) => (
                  <div key={j} className={styles.highlight}>
                    <span className={styles.hDot} />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
