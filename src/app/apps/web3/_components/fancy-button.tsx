'use client'

import { useState } from 'react'

import Link from 'next/link'

import { motion } from 'motion/react'

interface FancyButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  icon?: React.ReactNode
}

export function FancyButton({ href, children, className = '', icon }: FancyButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <motion.div
      className="group relative"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onHoverEnd={() => setIsHovered(false)}
      onHoverStart={() => setIsHovered(true)}
    >
      <Link
        className={`
          relative inline-flex items-center gap-3 rounded-2xl border border-white/10
          bg-gradient-to-r from-slate-800/80 to-slate-900/80 px-8 py-4 font-medium text-white
          backdrop-blur-sm transition-all duration-300 ease-out
          hover:border-white/20
          ${className}
        `}
        href={href}
        onClick={handleClick}
      >
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className={`
            absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20
            to-pink-500/20
          `}
          transition={{ duration: 0.3 }}
        />

        <motion.span
          animate={{
            y: isHovered ? -1 : 0,
          }}
          className="relative z-10"
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>

        {icon && (
          <motion.div
            animate={{
              y: isHovered ? 2 : 0,
              rotate: isHovered ? 180 : 0,
            }}
            className="relative z-10"
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
        )}

        <motion.div
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 rounded-2xl bg-white/10"
          initial={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  )
} 