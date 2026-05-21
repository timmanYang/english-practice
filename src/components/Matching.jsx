import { useState, useMemo, useCallback, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import words from '../data/words'
import sentences from '../data/sentences'
import { playWrong, playMatch, playComplete } from '../utils/sound'
import { getGreatMsg, getGoodMsg, getFailureMsg } from '../utils/messages'
import { pickItems } from '../utils/shuffle'
import Confetti from './Confetti'
import ConfirmLeave from './ConfirmLeave'

const PAIR_COUNT = 6

export default function Matching() {
  const { grade } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false)
  const isSentence = location.pathname.includes('sentence-')
  const data = isSentence ? sentences : words
  const list = data[grade] || []

  const pairs = useMemo(() => {
    const selected = pickItems(list, PAIR_COUNT, `matching_${grade}_${isSentence ? 'sentence' : 'word'}`)
    const cards = selected.flatMap((w, i) => [
      { id: `en-${i}`, text: w.en, pairId: i, type: 'en' },
      { id: `zh-${i}`, text: w.zh, pairId: i, type: 'zh' },
    ])
    return cards.sort(() => Math.random() - 0.5)
  }, [list, grade, isSentence])

  const [selected, setSelected] = useState(null)
  const [matched, setMatched] = useState(new Set())
  const [wrong, setWrong] = useState(null)
  const [finished, setFinished] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [matchedAnim, setMatchedAnim] = useState(null)
  const congratsMsg = useRef(getGreatMsg())

  const handleSelect = useCallback((card) => {
    if (matched.has(card.pairId) || wrong) return

    if (!selected) {
      setSelected(card)
      return
    }

    if (selected.id === card.id) {
      setSelected(null)
      return
    }

    setAttempts(a => a + 1)

    if (selected.pairId === card.pairId && selected.type !== card.type) {
      playMatch()
      setMatchedAnim(card.pairId)
      setTimeout(() => {
        const newMatched = new Set(matched)
        newMatched.add(card.pairId)
        setMatched(newMatched)
        setSelected(null)
        setMatchedAnim(null)

        if (newMatched.size === PAIR_COUNT) {
          setTimeout(() => {
            setFinished(true)
            playComplete()
          }, 300)
        }
      }, 300)
    } else {
      playWrong()
      setWrong([selected.id, card.id])
      setTimeout(() => {
        setWrong(null)
        setSelected(null)
      }, 600)
    }
  }, [selected, matched, wrong])

  const progress = (matched.size / PAIR_COUNT) * 100

  const getResultMsg = () => {
    if (attempts <= PAIR_COUNT + 1) {
      return { emoji: '🏆', title: '太厉害了！', msg: congratsMsg.current }
    }
    if (attempts <= PAIR_COUNT * 2) {
      return { emoji: '🌟', title: '做得不错！', msg: getGoodMsg() }
    }
    return { emoji: '💪', title: '完成了！', msg: getFailureMsg() }
  }

  const result = finished ? getResultMsg() : null

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.25 }}
    >
      <div className="polkadot-bg" />
      <span className="page-deco" style={{ top: '8%', left: '5%' }}>🔗</span>
      <span className="page-deco" style={{ top: '18%', right: '8%', fontSize: 22, animationDelay: '1.5s' }}>🧩</span>
      <span className="page-deco" style={{ bottom: '10%', left: '8%', fontSize: 22, animationDelay: '3s' }}>🎯</span>
      <div className="game-container">
        <div className="game-header">
          <button className="back-btn" onClick={() => setShowLeaveConfirm(true)}>
            ← 返回
          </button>
          <span className="progress-text">{matched.size} / {PAIR_COUNT} 对</span>
        </div>

        <div className="progress-bar-wrap">
          <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="game-card">
          <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>🔗 点击配对</p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: 12 }}>
            {isSentence ? '将英文句式和中文翻译连起来' : '将英文单词和中文翻译连起来'}
          </p>

          <div className="matching-grid">
            {pairs.map((card) => {
              const isSelected = selected?.id === card.id
              const isMatched = matched.has(card.pairId)
              const isWrong = wrong?.includes(card.id)
              const isMatching = matchedAnim === card.pairId

              return (
                <motion.div
                  key={card.id}
                  className={`matching-card ${isSelected ? 'selected' : ''} ${isMatched ? 'matched' : ''} ${isWrong ? 'wrong' : ''} ${isMatching ? 'matching-anim' : ''}`}
                  onClick={() => !isMatched && handleSelect(card)}
                  whileTap={{ scale: 0.95 }}
                  layout
                >
                  {card.text}
                  {isMatching && (
                    <motion.span
                      style={{ position: 'absolute', fontSize: 24 }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2, opacity: 0, y: -30 }}
                      transition={{ duration: 0.4 }}
                    >
                      ✨
                    </motion.span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-light)' }}>
          尝试次数: {attempts}
        </p>
      </div>

      <AnimatePresence>
        {finished && result && (
          <motion.div
            className="results-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {attempts <= PAIR_COUNT * 1.5 && <Confetti count={50} duration={3500} />}
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
                {result.emoji}
              </motion.div>
              <h2>{result.title}</h2>
              <div className="score">{PAIR_COUNT} / {PAIR_COUNT}</div>
              <p className="result-message">{result.msg}</p>
              <div className="results-actions">
                <button className="btn-retry" onClick={() => window.location.reload()}>
                  🔄 再来一次
                </button>
                <button className="btn-home" onClick={() => navigate('/')}>
                  🏠 返回
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConfirmLeave
        show={showLeaveConfirm}
        onConfirm={() => navigate('/')}
        onCancel={() => setShowLeaveConfirm(false)}
      />
    </motion.div>
  )
}
