'use client'

import { motion } from 'motion/react'
import type { GradientBackgroundProps } from '../_types'

const gradientVariants = {
  // Soft primary gradient with better color harmony
  primary: 'bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-blue-500/40',

  // Gentle secondary gradient with emerald tones
  secondary: 'bg-gradient-to-br from-blue-500/30 via-cyan-500/25 to-emerald-400/35',

  // Smooth accent gradient for highlights
  accent: 'bg-gradient-to-br from-violet-500/35 via-purple-500/25 to-emerald-400/30',

  // Subtle dark gradient for depth
  dark: 'bg-gradient-to-br from-slate-800/40 via-slate-700/30 to-slate-600/35',

  // Soft neutral gradient for balance
  neutral: 'bg-gradient-to-br from-slate-500/25 via-gray-400/20 to-slate-300/30',

  // Cool gradient with reduced intensity
  cool: 'bg-gradient-to-br from-cyan-400/30 via-blue-400/25 to-indigo-400/35',
} as const

export function GradientBackground({
  className,
  variant = 'primary',
  opacity = 0.2,
}: GradientBackgroundProps) {
  return (
    <motion.div
      className={`absolute inset-0 ${gradientVariants[variant]} blur-[120px] ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: opacity }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    />
  )
}

export function GradientOverlay({
  className,
  variant = 'primary',
}: GradientBackgroundProps) {
  return (
    <div
      className={`absolute inset-0 ${gradientVariants[variant]} opacity-15 ${className}`}
    />
  )
} 