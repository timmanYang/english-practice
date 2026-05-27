import { motion, AnimatePresence } from 'framer-motion'
import type { ConfirmLeaveProps } from '../types'

export default function ConfirmLeave({ show, onConfirm, onCancel, title, confirmText, cancelText }: ConfirmLeaveProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="confirm-leave-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onCancel}
        >
          <motion.div
            className="confirm-leave-card"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <span className="confirm-leave-icon">🤔</span>
            <p className="confirm-leave-text">{title || '确定要离开吗？'}</p>
            <p className="confirm-leave-sub">当前进度将不会保存</p>
            <div className="confirm-leave-actions">
              <button className="confirm-leave-btn stay" onClick={onCancel}>
                {cancelText || '继续玩'}
              </button>
              <button className="confirm-leave-btn leave" onClick={onConfirm}>
                {confirmText || '离开'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
