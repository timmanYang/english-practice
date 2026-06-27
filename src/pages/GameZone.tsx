import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useData } from '../services/dataLoader'

const gradeMap: Record<string, string> = { 3: '三年级', 4: '四年级', 5: '五年级', 6: '六年级' }
const gradeIcons: Record<string, string> = { 3: '🐣', 4: '🐥', 5: '🦊', 6: '🦁' }

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

export default function GameZone() {
  const { grade, semester } = useParams<{ grade: string; semester: string }>()
  const gradeNum = Number(grade)
  const sem = (semester === 'lower' ? 'lower' : 'upper') as 'upper' | 'lower'
  const { list: wordList } = useData(gradeNum, 'words', sem)
  const { list: sentenceList } = useData(gradeNum, 'sentences', sem)
  const label = gradeMap[grade] || `Grade ${grade}`

  return (
    <motion.div
      className="page game-zone"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.25 }}
    >
      <div className="polkadot-bg" />
      <span className="page-deco" style={{ top: '8%', left: '5%', fontSize: 28 }}>🎮</span>
      <span className="page-deco" style={{ top: '20%', right: '8%', fontSize: 22, animationDelay: '1.5s' }}>⭐</span>
      <span className="page-deco" style={{ bottom: '15%', left: '8%', fontSize: 26, animationDelay: '3s' }}>🌟</span>
      <span className="page-deco" style={{ bottom: '30%', right: '5%', fontSize: 20, animationDelay: '4.5s' }}>✨</span>
      <motion.span
        style={{ fontSize: 48, lineHeight: 1 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12 }}
      >
        {gradeIcons[grade] || '📚'}
      </motion.span>
      <motion.h1
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {label}
      </motion.h1>
      <motion.p
        className="semester-badge"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.13 }}
      >
        {sem === 'upper' ? '上册' : '下册'}
      </motion.p>
      <motion.p
        className="word-count"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        共 {wordList.length} 个单词 · {sentenceList.length} 个句式 · 选择游戏模式
      </motion.p>
      <motion.div className="game-mode-grid" style={{ marginTop: 8 }}>
        {games.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.08, type: 'spring', stiffness: 300, damping: 24 }}
          >
            <Link to={`/play/${grade}/${sem}/${g.id}`} className={`game-mode-card ${g.color}`}>
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
        transition={{ delay: 0.4 }}
        style={{ marginTop: 28, marginBottom: 10, fontSize: '1.1rem', textAlign: 'center', color: 'var(--text-light)' }}
      >
        📝 句式练习
      </motion.h2>
      <motion.div className="game-mode-grid" style={{ marginTop: 0 }}>
        {sentenceGames.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 + i * 0.08, type: 'spring', stiffness: 300, damping: 24 }}
          >
            <Link to={`/play/${grade}/${sem}/${g.id}`} className={`game-mode-card ${g.color}`}>
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
