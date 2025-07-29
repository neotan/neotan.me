'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

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
      className="relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Link
        href={href}
        onClick={handleClick}
        className={`
          relative inline-flex items-center gap-3 px-8 py-4 text-white font-medium rounded-2xl
          bg-gradient-to-r from-slate-800/80 to-slate-900/80 backdrop-blur-sm
          border border-white/10 hover:border-white/20
          transition-all duration-300 ease-out
          ${className}
        `}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        <motion.span
          className="relative z-10"
          animate={{
            y: isHovered ? -1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.span>

        {icon && (
          <motion.div
            className="relative z-10"
            animate={{
              y: isHovered ? 2 : 0,
              rotate: isHovered ? 180 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
        )}

        <motion.div
          className="absolute inset-0 rounded-2xl bg-white/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  )
} 