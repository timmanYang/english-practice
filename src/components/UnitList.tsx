import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUnits } from '../services/dataLoader'
import SpeakerButton from './SpeakerButton'

export default function UnitList() {
  const { grade, semester } = useParams<{ grade: string; semester: string }>()
  const navigate = useNavigate()
  const gradeNum = Number(grade)
  const sem = (semester === 'lower' ? 'lower' : 'upper') as 'upper' | 'lower'
  const { units, loading } = useUnits(gradeNum, sem)
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  const toggleUnit = useCallback((label: string) => {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(label)) next.delete(label)
      else next.add(label)
      return next
    })
  }, [])

  if (loading) {
    return (
      <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="loading-state"><div className="loading-spinner" />加载中...</div>
      </motion.div>
    )
  }

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.25 }}
    >
      <div className="polkadot-bg" />
      <div className="game-container">
        <div className="game-header">
          <button className="back-btn" onClick={() => navigate('/')}>← 返回</button>
          <span className="progress-text">单元朗读</span>
        </div>
        <div className="unit-list-scroll">
          {units.map((unit, i) => {
            const isOpen = expanded.has(unit.label)
            return (
              <motion.div
                className="unit-card"
                key={unit.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <button className="unit-header" onClick={() => toggleUnit(unit.label)}>
                  <span className="unit-label">{unit.label}</span>
                  <span className="unit-title">{unit.title}</span>
                  <span className="unit-arrow" data-open={isOpen}>▾</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="unit-body"
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="unit-items">
                        {unit.items.map((item, j) => (
                          <div className="unit-item-row" key={j}>
                            <span className="unit-item-en">{item.en}</span>
                            <span className="unit-item-zh">{item.zh}</span>
                            <SpeakerButton text={item.en} size={20} />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}
