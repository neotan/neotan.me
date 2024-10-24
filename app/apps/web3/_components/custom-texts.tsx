'use client'
import { ComponentProps } from 'react'

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
        <motion.span variants={textVariant2} key={index}>
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
      variants={textVariant2}
      initial="hidden"
      whileInView="show"
    >
      {children}
    </motion.h2>
  )
}