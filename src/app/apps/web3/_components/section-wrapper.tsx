'use client'

import { motion } from 'motion/react'
import type { ComponentProps } from 'react'

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
      id={id}
      className={cn(styles.section, className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      variants={staggerContainer(animationDelay, 0.1)}
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
    <section id={id} className={cn(styles.section, className)}>
      <div className={styles.innerWidth}>
        {children}
      </div>
    </section>
  )
} 