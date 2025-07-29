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
      {/* Glow Effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Gradient Border Container */}
      <div className="relative p-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl">
        {/* Button Content */}
        <Link
          href={href}
          onClick={handleClick}
          className={`
            relative inline-flex items-center gap-3 px-8 py-4 text-white font-medium rounded-2xl
            bg-gradient-to-r from-slate-800/90 to-slate-900/90 backdrop-blur-sm
            hover:shadow-glow
            transition-all duration-300 ease-out
            ${className}
          `}
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl"
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <motion.span
            className="relative z-10"
            animate={{
              y: isHovered ? -1 : 0,
            }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.span>

          {/* Icon with Animation */}
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

          {/* Ripple Effect */}
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
      </div>
    </motion.div>
  )
}
