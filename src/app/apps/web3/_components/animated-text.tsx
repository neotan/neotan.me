'use client'

import type { ComponentProps } from 'react'

import { motion } from 'motion/react'

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
      className={cn('text-sm font-medium text-white/70 sm:text-base', className)}
      initial="hidden"
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
      variants={textContainer}
      viewport={viewportAnimations}
      whileInView="show"
      {...props}
    >
      {Array.from(text).map((letter, index) => (
        <motion.span
          key={index}
          className="inline-block"
          style={{
            willChange: 'transform',
            transform: 'translate3d(0, 0, 0)',
          }}
          variants={textVariant2}
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
      className={cn('leading-tight text-white', titleSizes[size], className)}
      initial="hidden"
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
      variants={textVariant2}
      viewport={viewportAnimations}
      whileInView="show"
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
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      viewport={viewportAnimations}
      whileInView={{ opacity: 1, y: 0 }}
    >
      {text}
    </motion.span>
  )
} 