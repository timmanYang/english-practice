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
import UnitList from './components/UnitList'
import ConfirmLeave from './components/ConfirmLeave'
import './App.css'

function App() {
  const location = useLocation()
  const [showExitConfirm, setShowExitConfirm] = useState(false)
  const [showExitToast, setShowExitToast] = useState(false)
  const showExitButton = /^\/play\/\d+\/upper$|^\/play\/\d+\/lower$/.test(location.pathname)
  const lastBackTime = useRef(0)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleBack = () => {
      if (!isHome) return
      const now = Date.now()
      if (lastBackTime.current > 0 && now - lastBackTime.current < 2000) {
        clearTimeout(toastTimer.current!)
        lastBackTime.current = 0
        setShowExitConfirm(true)
      } else {
        lastBackTime.current = now
        clearTimeout(toastTimer.current!)
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
      if (toastTimer.current) clearTimeout(toastTimer.current)
    }
  }, [isHome])

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
        <motion.button className="exit-btn" initial={false} onClick={() => setShowExitConfirm(true)}>
          🚪
        </motion.button>
      )}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/play/:grade/:semester" element={<GameZone />} />
          <Route path="/play/:grade/:semester/flashcard" element={<Flashcard />} />
          <Route path="/play/:grade/:semester/matching" element={<Matching />} />
          <Route path="/play/:grade/:semester/quiz" element={<Quiz />} />
          <Route path="/play/:grade/:semester/spelling" element={<Spelling />} />
          <Route path="/play/:grade/:semester/sentence-flashcard" element={<Flashcard />} />
          <Route path="/play/:grade/:semester/sentence-matching" element={<Matching />} />
          <Route path="/play/:grade/:semester/sentence-quiz" element={<Quiz />} />
          <Route path="/play/:grade/:semester/reading" element={<UnitList />} />
        </Routes>
      </AnimatePresence>
      <ConfirmLeave
        show={showExitConfirm}
        title="确定要退出游戏吗？"
        confirmText="退出"
        cancelText="继续玩"
        onConfirm={confirmExit}
        onCancel={cancelExit}
      />
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
