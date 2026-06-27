import { useState, useMemo, useCallback, useRef, useEffect, type KeyboardEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useData } from '../services/dataLoader'
import { playCorrect, playWrong, playComplete } from '../utils/sound'
import { getResultMsg } from '../utils/messages'
import { pickItems } from '../utils/shuffle'
import Confetti from './Confetti'
import SpeakerButton from './SpeakerButton'

const SPELLING_COUNT = 10

export default function Spelling() {
  const { grade, semester } = useParams<{ grade: string; semester: string }>()
  const navigate = useNavigate()
  const gradeNum = Number(grade)
  const sem = (semester === 'lower' ? 'lower' : 'upper') as 'upper' | 'lower'
  const { list, loading } = useData(gradeNum, 'words', sem)

  const questionList = useMemo(() => {
    return pickItems(list, SPELLING_COUNT, `spelling_${grade}_word`)
  }, [list, grade])

  const [qIndex, setQIndex] = useState(0)
  const [input, setInput] = useState('')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)
  const [showStar, setShowStar] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const current = questionList[qIndex] || { en: '', zh: '' }
  const progress = (qIndex / questionList.length) * 100

  useEffect(() => {
    inputRef.current?.focus()
  }, [qIndex])

  const check = useCallback(() => {
    if (!input.trim()) return
    const normalized = input.trim().toLowerCase()
    const answer = current.en.trim().toLowerCase()
    const isCorrect = normalized === answer

    setResult(isCorrect ? 'correct' : 'wrong')
    if (isCorrect) {
      setScore((s) => s + 1)
      playCorrect()
      setShowStar(true)
      setTimeout(() => setShowStar(false), 600)
    } else {
      playWrong()
    }
    setShowAnswer(true)
  }, [input, current])

  const next = useCallback(() => {
    if (qIndex < questionList.length - 1) {
      setQIndex((i) => i + 1)
      setInput('')
      setResult(null)
      setShowAnswer(false)
    } else {
      setFinished(true)
      playComplete()
    }
  }, [qIndex, questionList.length])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' && !result) {
      check()
    } else if (e.key === 'Enter' && result) {
      next()
    }
  }, [result, check, next])

  const skip = useCallback(() => {
    setResult('wrong')
    setShowAnswer(true)
  }, [])

  const resultData = finished ? getResultMsg(score, questionList.length) : null

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
      <span className="page-deco" style={{ top: '8%', left: '5%' }}>✍️</span>
      <span className="page-deco" style={{ top: '22%', right: '8%', fontSize: 22, animationDelay: '1.5s' }}>📝</span>
      <span className="page-deco" style={{ bottom: '10%', left: '8%', fontSize: 22, animationDelay: '3s' }}>🔤</span>
      <div className="game-container">
        <div className="game-header">
          <button className="back-btn" onClick={() => navigate('/')}>← 返回</button>
          <span className="progress-text">{qIndex + 1} / {questionList.length}</span>
        </div>
        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            className="game-card"
            key={qIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <span className="game-hint-label">✍️ 看中文，拼出英文单词</span>
            <motion.span
              className="spelling-prompt"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            >
              {current.zh}
            </motion.span>
            <div className="spelling-input-row" style={{ position: 'relative' }}>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={!!result}
                placeholder="输入英文..."
                className={result || ''}
                autoComplete="off"
                autoCapitalize="off"
              />
              {!result ? (
                <motion.button onClick={check} whileTap={{ scale: 0.9 }}>✓ 确认</motion.button>
              ) : (
                <motion.button
                  onClick={next}
                  style={{ background: 'var(--secondary)' }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  {qIndex < questionList.length - 1 ? '下一题 →' : '查看结果'}
                </motion.button>
              )}
              <AnimatePresence>
                {showStar && (
                  <motion.span
                    style={{ position: 'absolute', right: -8, top: -28, fontSize: 32 }}
                    initial={{ scale: 0, opacity: 1, rotate: 0 }}
                    animate={{ scale: 1.5, opacity: 0, y: -40, rotate: 180 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                  >
                    ⭐
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            {showAnswer && result === 'wrong' && (
              <motion.p
                className="spelling-answer"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
              >
                正确答案: <strong>{current.en}</strong>
                <SpeakerButton text={current.en} size={24} style={{ marginLeft: 6, display: 'inline-flex' }} />
              </motion.p>
            )}
            {!result && (
              <motion.button onClick={skip} className="skip-btn" whileTap={{ scale: 0.9 }}>跳过 →</motion.button>
            )}
            {result === 'correct' && (
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="correct-label"
                style={{ display: 'flex', alignItems: 'center', gap: 8 }}
              >
                ⭐ 正确！ <SpeakerButton text={current.en} size={22} />
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {finished && resultData && (
          <motion.div className="results-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {score >= 7 && <Confetti count={40} duration={3000} />}
            <motion.div
              className="results-card"
              initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <motion.div
                className="result-icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                {resultData.emoji}
              </motion.div>
              <h2>{resultData.title}</h2>
              <div className="score">{score} / {questionList.length}</div>
              <p className="result-message">{resultData.msg}</p>
              <div className="results-actions">
                <button className="btn-retry" onClick={() => window.location.reload()}>🔄 再来一次</button>
                <button className="btn-home" onClick={() => navigate('/')}>🏠 返回</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
