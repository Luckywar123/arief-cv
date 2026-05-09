import { useEffect, useRef } from 'react'
import styles from './Experience.module.css'

const experiences = [
  {
    company: 'scapegis.com',
    role: 'Team Leader',
    period: 'Jan 2023 — Present',
    type: 'ACTIVE',
    tags: ['GIS', 'Product Dev', 'Web3', 'UI/UX', 'Business'],
    desc: 'Leading development and commercialization of a collaborative GIS platform with real-time database architecture and AI integration. Driving product, business development, and frontend engineering.',
    achievements: [
      'Secured first major enterprise client with signed Letter of Intent',
      'Built collaborative mapping platform with real-time AI assistance',
      'Led full product lifecycle from MVP to commercialization',
    ],
    color: '#00ff88'
  },
  {
    company: 'PT. Rupa Bhumi Malaka',
    role: 'Director',
    period: 'May 2025 — Present',
    type: 'ACTIVE',
    tags: ['Leadership', 'Operations', 'Finance', 'BD'],
    desc: 'Overseeing strategic direction and operations of a geospatial consulting firm. Managing procurement, partnerships, project portfolios, and financial governance.',
    achievements: [
      'Registered and qualified for government LPSE tender processes',
      'Established strategic partnerships with private sector clients',
      'Implemented full accounting and tax management systems',
    ],
    color: '#00d4ff'
  },
  {
    company: 'CV. Citrakara Adi Mahitala',
    role: 'Co-Founder & Director',
    period: 'Jan 2019 — Dec 2022',
    type: 'PAST',
    tags: ['Co-Founder', 'Ops', 'Tax', 'Marketing'],
    desc: 'Co-founded a spatial planning and consulting venture. Handled end-to-end business operations including tender acquisition, client development, team leadership, and financial management.',
    achievements: [
      'Successfully won competitive government infrastructure tenders',
      'Built and managed cross-functional project teams',
      'Managed all accounting and regulatory compliance',
    ],
    color: '#7b3fff'
  },
]

export default function Experience() {
  const itemRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.15 }
    )
    itemRefs.current.forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>02. EXPERIENCE</span>
          <h2 className={styles.title}>WORK <span className={styles.accent}>HISTORY</span></h2>
          <div className={styles.divider} />
        </div>

        <div className={styles.timeline}>
          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={el => itemRefs.current[i] = el}
              className={`${styles.item} reveal-left`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className={styles.connector}>
                <div className={styles.dot} style={{ '--color': exp.color }} />
                {i < experiences.length - 1 && <div className={styles.line} />}
              </div>

              <div className={styles.card} style={{ '--accent': exp.color }}>
                <div className={styles.cardHeader}>
                  <div>
                    <span className={styles.period}>{exp.period}</span>
                    <span className={`${styles.typeBadge} ${exp.type === 'ACTIVE' ? styles.active : styles.past}`}>
                      {exp.type === 'ACTIVE' && <span className={styles.activeDot} />}
                      {exp.type}
                    </span>
                  </div>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <div className={styles.company}>{exp.company}</div>
                </div>

                <p className={styles.desc}>{exp.desc}</p>

                <ul className={styles.achievements}>
                  {exp.achievements.map((a, j) => (
                    <li key={j} className={styles.achievement}>
                      <span className={styles.chevron}>›</span> {a}
                    </li>
                  ))}
                </ul>

                <div className={styles.tags}>
                  {exp.tags.map(t => (
                    <span key={t} className={styles.techTag} style={{ '--color': exp.color }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
