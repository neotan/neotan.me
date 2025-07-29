import { motion } from 'motion/react'

import { meteorVariants } from '../_utils/animations'

interface MeteorProps {
  delay?: number
  duration?: number
  startX?: number
  startY?: number
  endX?: number
  endY?: number
  size?: 'small' | 'medium' | 'large'
}

export function Meteor({
  delay = 0,
  duration = 3,
  startX = -100,
  startY = 0,
  endX = 100,
  endY = 100,
  size = 'small'
}: MeteorProps) {
  const sizeClasses = {
    small: 'w-1 h-1',
    medium: 'w-2 h-2',
    large: 'w-3 h-3'
  }

  return (
    <motion.div
      animate={{
        x: endX,
        y: endY,
        opacity: [0, 1, 1, 0],
        scale: [0, 1, 1, 0]
      }}
      className="pointer-events-none absolute will-change-transform"
      initial={{
        x: startX,
        y: startY,
        opacity: 0,
        scale: 0
      }}
      style={{
        transform: 'translate3d(0, 0, 0)',
      }}
      transition={{
        duration,
        delay,
        ease: 'linear',
        repeat: Infinity,
        repeatDelay: 8 + Math.random() * 4,
      }}
    >
      <div
        className={`${sizeClasses[size]} rounded-full bg-white shadow-lg shadow-white/50`}
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      <motion.div
        animate={{ scaleX: 1, opacity: [0, 1, 0] }}
        className={`
          absolute top-0 left-0 h-1 w-8 rounded-full bg-gradient-to-r from-white via-cyan-300
          to-transparent
        `}
        initial={{ scaleX: 0, opacity: 0 }}
        style={{
          transformOrigin: 'left center',
          transform: 'rotate(-45deg) translateX(-50%) translate3d(0, 0, 0)',
          willChange: 'transform',
        }}
        transition={{
          duration: duration * 0.3,
          delay,
          ease: 'easeOut'
        }}
      />
    </motion.div>
  )
}