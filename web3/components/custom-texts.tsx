'use client';
import { ComponentProps } from 'react'
import { AnimationOptions, motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../utils/motions';


export type TypingTextProps = ComponentProps<typeof motion.p>

export function TypingText({ title = '', className }: TypingTextProps) {
  return (
    <motion.p
      variants={textContainer}
      className={`text-secondary-white text-[14px] font-normal ${className}`}
    >
      {Array.from(title).map((letter, index) => (
        <motion.span variants={textVariant2} key={index}>
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  )
}
