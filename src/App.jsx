import { useState, useEffect, useRef, useCallback } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { App as CapApp } from '@capacitor/app'
import { Capacitor } from '@capacitor/core'
import Home from './pages/Home'
import GameZone from './pages/GameZone'
import Flashcard from './components/Flashcard'
import Matching from './components/Matching'
import Quiz from './components/Quiz'
import Spelling from './components/Spelling'
import Reading from './components/Reading'
import ConfirmLeave from './components/ConfirmLeave'
import './App.css'

function App() {
  const location = useLocation()
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showExitToast, setShowExitToast] = useState(false)
  const showExitButton = /^\/play\/\d+$/.test(location.pathname)
  const lastBackTime = useRef(0)
  const toastTimer = useRef(null)

  useEffect(() => {
    const handleBack = () => {
      const now = Date.now()
      if (lastBackTime.current > 0 && now - lastBackTime.current < 2000) {
        clearTimeout(toastTimer.current)
        lastBackTime.current = 0
        setShowExitConfirm(true)
      } else {
        lastBackTime.current = now
        clearTimeout(toastTimer.current)
        setShowExitToast(true)
        toastTimer.current = setTimeout(() => setShowExitToast(false), 2000)
      }
    }

    if (Capacitor.isNativePlatform()) {
      CapApp.addListener('backButton', handleBack)
    } else {
      window.addEventListener('popstate', handleBack)
    }

    return () => {
      CapApp.removeAllListeners()
      window.removeEventListener('popstate', handleBack)
      clearTimeout(toastTimer.current)
    }
  }, [])

  const confirmExit = useCallback(() => {
    setShowExitConfirm(false)
    CapApp.exitApp().catch(() => window.close())
  }, [])

  const cancelExit = useCallback(() => {
    setShowExitConfirm(false)
    lastBackTime.current = 0
  }, [])

  return (
    <div className="app">
      {showExitButton && (
        <motion.button
          className="exit-btn"
          initial={false}
          onClick={() => setShowExitConfirm(true)}
        >
          🚪
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/play/:grade" element={<GameZone />} />
          <Route path="/play/:grade/flashcard" element={<Flashcard />} />
          <Route path="/play/:grade/matching" element={<Matching />} />
          <Route path="/play/:grade/quiz" element={<Quiz />} />
          <Route path="/play/:grade/spelling" element={<Spelling />} />
          <Route path="/play/:grade/sentence-flashcard" element={<Flashcard />} />
          <Route path="/play/:grade/sentence-matching" element={<Matching />} />
          <Route path="/play/:grade/sentence-quiz" element={<Quiz />} />
          <Route path="/play/:grade/reading" element={<Reading />} />
        </Routes>
      </AnimatePresence>

      {/* Exit confirmation dialog */}
      <ConfirmLeave
        show={showExitConfirm}
        title="确定要退出游戏吗？"
        confirmText="退出"
        cancelText="继续玩"
        onConfirm={confirmExit}
        onCancel={cancelExit}
      />

      {/* Double-press toast hint */}
      <AnimatePresence>
        {showExitToast && (
          <motion.div
            className="double-back-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            再按一次退出应用
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
