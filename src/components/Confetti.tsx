import { useEffect, useState } from 'react'
import type { ConfettiProps } from '../types'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speedY: number
  speedX: number
  rotation: number
  rotationSpeed: number
  opacity: number
  content: string | null
  delay: number
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#60A5FA', '#34D399', '#FB923C', '#F472B6']
const EMOJIS = ['⭐', '🌟', '✨', '🎉', '🎊', '💫', '🏆', '👏']

function randomBetween(a: number, b: number): number {
  return a + Math.random() * (b - a)
}

function createParticle(index: number): Particle {
  const isEmoji = Math.random() > 0.6
  return {
    id: index,
    x: randomBetween(5, 95),
    y: -10,
    size: isEmoji ? randomBetween(20, 36) : randomBetween(8, 16),
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speedY: randomBetween(2, 6),
    speedX: randomBetween(-2, 2),
    rotation: randomBetween(0, 360),
    rotationSpeed: randomBetween(-8, 8),
    opacity: 1,
    content: isEmoji ? EMOJIS[Math.floor(Math.random() * EMOJIS.length)] : null,
    delay: Math.random() * 500,
  }
}

export default function Confetti({ count = 40, duration = 3000 }: ConfettiProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const initial = Array.from({ length: count }, (_, i) => createParticle(i))
    setParticles(initial)

    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      if (elapsed >= duration) {
        clearInterval(interval)
        setParticles([])
        return
      }
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          y: p.y + p.speedY,
          x: p.x + p.speedX,
          rotation: p.rotation + p.rotationSpeed,
          opacity: Math.max(0, 1 - (elapsed / duration) * 0.8),
        }))
      )
    }, 30)

    return () => clearInterval(interval)
  }, [count, duration])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 200,
      overflow: 'hidden',
    }}>
      {particles.map(p => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.content ? 'auto' : p.size,
            height: p.content ? 'auto' : p.size,
            fontSize: p.content ? `${p.size}px` : undefined,
            background: p.content ? 'none' : p.color,
            borderRadius: p.content ? 0 : Math.random() > 0.5 ? '50%' : '3px',
            transform: `rotate(${p.rotation}deg)`,
            opacity: p.opacity,
            transition: 'none',
            lineHeight: 1,
          }}
        >
          {p.content}
        </div>
      ))}
    </div>
  )
}
