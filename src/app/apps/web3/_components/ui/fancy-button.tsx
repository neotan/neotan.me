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
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
        }}
        className={`
          absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
          opacity-25 blur transition duration-500
          group-hover:opacity-75
        `}
        transition={{ duration: 0.3 }}
      />

      <div className={`
        relative rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px]
      `}>
        <Link
          className={`
            hover:shadow-glow
            relative inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-slate-800/90
            to-slate-900/90 px-8 py-4 font-medium text-white backdrop-blur-sm transition-all
            duration-300 ease-out
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
              absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10
              to-pink-500/10
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
      </div>
    </motion.div>
  )
}
