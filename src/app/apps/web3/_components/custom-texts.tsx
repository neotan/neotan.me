'use client'
import { type ComponentProps } from 'react'

import { motion } from 'framer-motion'

import { textContainer, textVariant2 } from '../_utils/motions'
import { cn } from '../_utils/styles'

export type TypingTextProps = ComponentProps<typeof motion.p> & { text: string }

export function TypingText({ text = '', className }: TypingTextProps) {
  return (
    <motion.p
      className={cn('text-secondary-white text-[14px] font-normal', className)}
      variants={textContainer}
    >
      {Array.from(text).map((letter, index) => (
        <motion.span key={index} variants={textVariant2}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  )
}


export type TitleTextProps = ComponentProps<typeof motion.h2>

export function TitleText({ children, className }: TitleTextProps) {
  return (
    <motion.h2
      className={cn('mt-[8px] text-[40px] font-bold text-white md:text-[64px]', className)}
      initial="hidden"
      variants={textVariant2}
      whileInView="show"
    >
      {children}
    </motion.h2>
  )
}