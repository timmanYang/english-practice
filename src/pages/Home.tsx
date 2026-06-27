import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../services/dataLoader'
import { initAudio, playClick } from '../utils/sound'

const gradeList = [
  { num: 3, icon: '🐣', label: '三年级', color: 'g3' },
  { num: 4, icon: '🐥', label: '四年级', color: 'g4' },
  { num: 5, icon: '🦊', label: '五年级', color: 'g5' },
  { num: 6, icon: '🦁', label: '六年级', color: 'g6' },
]

const games = [
  { id: 'flashcard', icon: '🃏', label: '单词闪卡', desc: '翻转卡片，记忆单词', color: 'm-flashcard' },
  { id: 'matching', icon: '🔗', label: '单词配对', desc: '将英文和中文配成一对', color: 'm-matching' },
  { id: 'quiz', icon: '🧠', label: '选择挑战', desc: '四选一，选出正确答案', color: 'm-quiz' },
  { id: 'spelling', icon: '✍️', label: '拼写大赛', desc: '看中文，拼出英文单词', color: 'm-spelling' },
]

const sentenceGames = [
  { id: 'sentence-flashcard', icon: '📖', label: '句式闪卡', desc: '翻转卡片，记忆句式', color: 'm-sentence-flashcard' },
  { id: 'sentence-matching', icon: '🔤', label: '句式配对', desc: '将英文句式和中文配成一对', color: 'm-sentence-matching' },
  { id: 'sentence-quiz', icon: '💬', label: '句式选择', desc: '四选一，选出正确的中文翻译', color: 'm-sentence-quiz' },
  { id: 'reading', icon: '📋', label: '单元朗读', desc: '按单元浏览单词和句子', color: 'm-reading' },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

const item = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 22 } },
}

function loadSemester(): 'upper' | 'lower' {
  try { const v = localStorage.getItem('semester'); return v === 'lower' ? 'lower' : 'upper' } catch { return 'upper' }
}

export default function Home() {
  const [selectedGrade, setSelectedGrade] = useState(3)
  const [semester, setSemester] = useState<'upper' | 'lower'>(loadSemester)
  const { list: words } = useData(selectedGrade, 'words', semester)
  const { list: sentences } = useData(selectedGrade, 'sentences', semester)

  useEffect(() => { initAudio() }, [])

  const wordCount = words.length
  const sentenceCount = sentences.length

  return (
    <motion.div
      className="page home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <div className="polkadot-bg" />
      <motion.div
        className="grade-selector"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{ marginTop: 20 }}
      >
        {gradeList.map((g) => (
          <motion.button
            key={g.num}
            className={`grade-tab ${g.color}${selectedGrade === g.num ? ' active' : ''}`}
            onClick={() => {
              if (selectedGrade !== g.num) setSelectedGrade(g.num)
              playClick()
            }}
            whileTap={{ scale: 0.92 }}
          >
            <span className="tab-icon">{g.icon}</span>
            <span className="tab-label">{g.label}</span>
          </motion.button>
        ))}
      </motion.div>
      <motion.div
        className="semester-toggle"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
      >
        <button className={`semester-btn${semester === 'upper' ? ' active' : ''}`} onClick={() => { setSemester('upper'); localStorage.setItem('semester', 'upper') }}>上册</button>
        <button className={`semester-btn${semester === 'lower' ? ' active' : ''}`} onClick={() => { setSemester('lower'); localStorage.setItem('semester', 'lower') }}>下册</button>
      </motion.div>
      <motion.p
        className="word-count-hint"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        {gradeList.find(g => g.num === selectedGrade)?.icon} {gradeList.find(g => g.num === selectedGrade)?.label} {semester === 'upper' ? '上册' : '下册'} · {wordCount} 个单词 · {sentenceCount} 个句式
      </motion.p>
      <motion.div
        className="game-mode-grid"
        variants={container}
        initial="hidden"
        animate="show"
        style={{ marginTop: 8 }}
      >
        {games.map((g) => (
          <motion.div key={g.id} variants={item}>
            <Link
              to={`/play/${selectedGrade}/${semester}/${g.id}`}
              className={`game-mode-card ${g.color}`}
              onClick={() => playClick()}
            >
              <span className="mode-icon">{g.icon}</span>
              <span className="mode-label">{g.label}</span>
              <span className="mode-desc">{g.desc}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: 28, marginBottom: 10, fontSize: '1.1rem', textAlign: 'center', color: 'var(--text-light)' }}
      >
        📝 句式练习
      </motion.h2>
      <motion.div
        className="game-mode-grid sentence-grid"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {sentenceGames.map((g) => (
          <motion.div key={g.id} variants={item}>
            <Link
              to={`/play/${selectedGrade}/${semester}/${g.id}`}
              className={`game-mode-card ${g.color}`}
              onClick={() => playClick()}
            >
              <span className="mode-icon">{g.icon}</span>
              <span className="mode-label">{g.label}</span>
              <span className="mode-desc">{g.desc}</span>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
