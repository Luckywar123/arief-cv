import { useEffect, useRef } from 'react'

export default function HexGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const hexes = []
    const HEX_SIZE = 36
    const cols = Math.ceil(window.innerWidth / (HEX_SIZE * 1.75)) + 2
    const rows = Math.ceil(window.innerHeight / (HEX_SIZE * 1.5)) + 2

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * HEX_SIZE * 1.75
        const y = r * HEX_SIZE * 1.5 + (c % 2 === 0 ? 0 : HEX_SIZE * 0.75)
        hexes.push({
          x, y,
          opacity: Math.random() * 0.04 + 0.01,
          targetOpacity: Math.random() * 0.08 + 0.01,
          speed: Math.random() * 0.003 + 0.001,
          glowing: Math.random() < 0.02
        })
      }
    }

    const drawHex = (x, y, size, opacity, glowing) => {
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6
        const px = x + size * Math.cos(angle)
        const py = y + size * Math.sin(angle)
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      }
      ctx.closePath()

      if (glowing) {
        ctx.strokeStyle = `rgba(0, 255, 136, ${opacity * 4})`
        ctx.lineWidth = 0.8
        ctx.shadowBlur = 8
        ctx.shadowColor = 'rgba(0, 255, 136, 0.5)'
      } else {
        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`
        ctx.lineWidth = 0.5
        ctx.shadowBlur = 0
      }
      ctx.stroke()
      ctx.shadowBlur = 0
    }

    let frame = 0
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      frame++

      hexes.forEach((hex, i) => {
        hex.opacity += (hex.targetOpacity - hex.opacity) * hex.speed
        if (Math.abs(hex.opacity - hex.targetOpacity) < 0.001) {
          hex.targetOpacity = Math.random() * 0.08 + 0.01
          if (Math.random() < 0.002) hex.glowing = true
          else if (hex.glowing && Math.random() < 0.01) hex.glowing = false
        }
        drawHex(hex.x, hex.y, HEX_SIZE * 0.88, hex.opacity, hex.glowing)
      })

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
        opacity: 0.6
      }}
    />
  )
}
