import { useEffect, useRef, useState } from 'react'
import styles from './Skills.module.css'

const skillGroups = [
  {
    label: 'TECHNICAL',
    icon: '⬡',
    color: '#00ff88',
    skills: [
      { name: 'GIS & Spatial Analysis', level: 95 },
      { name: 'Frontend / UI-UX', level: 78 },
      { name: 'Product Development', level: 88 },
      { name: 'Data Processing & AI', level: 72 },
    ]
  },
  {
    label: 'BUSINESS',
    icon: '◈',
    color: '#00d4ff',
    skills: [
      { name: 'Strategic Planning', level: 92 },
      { name: 'Financial Modeling', level: 85 },
      { name: 'Market Analysis', level: 88 },
      { name: 'Tech Commercialization', level: 90 },
    ]
  },
  {
    label: 'LEADERSHIP',
    icon: '◇',
    color: '#7b3fff',
    skills: [
      { name: 'Team Management', level: 88 },
      { name: 'Business Development', level: 85 },
      { name: 'Tender & Procurement', level: 80 },
      { name: 'Project Management', level: 90 },
    ]
  }
]

const tools = [
  'QGIS', 'ArcGIS', 'Mapbox', 'React', 'Firebase',
  'Figma', 'AutoCAD', 'Python', 'Excel / Sheets', 'Notion',
  'OpenAI API', 'Supabase', 'Git', 'Vercel', 'LPSE'
]

const langs = [
  { lang: 'Indonesian', level: 'Native', pct: 100 },
  { lang: 'English', level: 'Advanced', pct: 85 },
  { lang: 'Russian', level: 'Beginner', pct: 20 },
]

function SkillBar({ name, level, color, visible }) {
  return (
    <div className={styles.skillItem}>
      <div className={styles.skillMeta}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillPct} style={{ color }}>{visible ? level : 0}%</span>
      </div>
      <div className={styles.barBg}>
        <div
          className={styles.barFill}
          style={{
            width: visible ? `${level}%` : '0%',
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: visible ? `0 0 8px ${color}66` : 'none'
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) setVisible(true) },
      { threshold: 0.2 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className={styles.section} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>04. SKILLS</span>
          <h2 className={styles.title}>TECH <span className={styles.accent}>STACK</span></h2>
          <div className={styles.divider} />
        </div>

        <div className={styles.groupGrid}>
          {skillGroups.map((g, i) => (
            <div key={g.label} className={`${styles.group} reveal`}
              style={{ '--color': g.color, animationDelay: `${i * 0.1}s` }}
            >
              <div className={styles.groupHeader}>
                <span className={styles.groupIcon} style={{ color: g.color }}>{g.icon}</span>
                <span className={styles.groupLabel} style={{ color: g.color }}>{g.label}</span>
              </div>
              {g.skills.map(s => (
                <SkillBar key={s.name} {...s} color={g.color} visible={visible} />
              ))}
            </div>
          ))}
        </div>

        <div className={styles.bottom}>
          <div className={`${styles.toolsBox} reveal`}>
            <div className={styles.boxLabel}>TOOLS & PLATFORMS</div>
            <div className={styles.toolsGrid}>
              {tools.map(t => (
                <span key={t} className={styles.tool}>{t}</span>
              ))}
            </div>
          </div>

          <div className={`${styles.langBox} reveal`} style={{ transitionDelay: '0.2s' }}>
            <div className={styles.boxLabel}>LANGUAGES</div>
            <div className={styles.langs}>
              {langs.map(l => (
                <div key={l.lang} className={styles.langItem}>
                  <div className={styles.langTop}>
                    <span className={styles.langName}>{l.lang}</span>
                    <span className={styles.langLevel}>{l.level}</span>
                  </div>
                  <div className={styles.barBg}>
                    <div className={styles.barFill} style={{
                      width: visible ? `${l.pct}%` : '0%',
                      background: 'linear-gradient(90deg, #ff6b35, #ff6b3588)',
                      boxShadow: visible ? '0 0 8px #ff6b3566' : 'none'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
