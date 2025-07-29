'use client'

import type { ComponentProps } from 'react'

import { motion } from 'motion/react'

import { staggerContainer } from '../_utils/animations'
import { cn, styles } from '../_utils/styles'

import type { SectionProps } from '../_types'

interface SectionWrapperProps extends SectionProps {
  animationDelay?: number
  className?: string
  children: React.ReactNode
}

export function SectionWrapper({
  id,
  className,
  children,
  animationDelay = 0.1,
}: SectionWrapperProps) {
  return (
    <motion.section
      className={cn(styles.section, className)}
      id={id}
      initial="hidden"
      variants={staggerContainer(animationDelay, 0.1)}
      viewport={{ once: true, amount: 0.25 }}
      whileInView="show"
    >
      <div className={styles.innerWidth}>
        {children}
      </div>
    </motion.section>
  )
}

export function SectionWrapperAlt({
  id,
  className,
  children,
}: SectionProps) {
  return (
    <section className={cn(styles.section, className)} id={id}>
      <div className={styles.innerWidth}>
        {children}
      </div>
    </section>
  )
} 