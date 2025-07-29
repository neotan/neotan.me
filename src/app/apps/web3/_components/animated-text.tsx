'use client'

import { motion } from 'motion/react'
import type { ComponentProps } from 'react'

import { textContainer, textVariant2, viewportAnimations } from '../_utils/animations'
import { cn } from '../_utils/styles'

interface TypingTextProps extends ComponentProps<typeof motion.p> {
  text: string
  className?: string
  delay?: number
}

export function TypingText({
  text = '',
  className,
  delay = 0,
  ...props
}: TypingTextProps) {
  return (
    <motion.p
      className={cn('text-white/70 text-sm font-medium sm:text-base', className)}
      variants={textContainer}
      initial="hidden"
      whileInView="show"
      viewport={viewportAnimations}
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
      {...props}
    >
      {Array.from(text).map((letter, index) => (
        <motion.span
          key={index}
          variants={textVariant2}
          className="inline-block"
          style={{
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  )
}

interface TitleTextProps extends ComponentProps<typeof motion.h2> {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const titleSizes = {
  sm: 'text-2xl font-bold sm:text-3xl md:text-4xl',
  md: 'text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl',
  lg: 'text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl',
  xl: 'text-5xl font-bold sm:text-6xl md:text-7xl lg:text-8xl',
} as const

export function TitleText({
  children,
  className,
  size = 'md',
  ...props
}: TitleTextProps) {
  return (
    <motion.h2
      className={cn('text-white leading-tight', titleSizes[size], className)}
      initial="hidden"
      variants={textVariant2}
      whileInView="show"
      viewport={viewportAnimations}
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
      {...props}
    >
      {children}
    </motion.h2>
  )
}

interface AnimatedTextProps {
  text: string
  className?: string
  delay?: number
}

export function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  return (
    <motion.span
      className={cn('inline-block', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportAnimations}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
    >
      {text}
    </motion.span>
  )
} 