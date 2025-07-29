'use client'

import { useState } from 'react'

import Link from 'next/link'

import { motion } from 'motion/react'

import MenuIcon from '../_icons/menu-icon'
import SearchIcon from '../_icons/search-icon'
import { navVariants } from '../_utils/animations'
import { NAV_ITEMS } from '../_utils/nav-constants'
import { cn, styles } from '../_utils/styles'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.nav
      className={cn(
        'sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md',
        'px-4 py-4 sm:px-6 lg:px-8'
      )}
      initial="hidden"
      variants={navVariants}
      viewport={{ once: true, amount: 0.25 }}
      whileInView="show"
    >
      <div className={cn(styles.innerWidth, styles.flexBetween)}>
        <Link
          aria-label="Go to homepage"
          className="text-2xl font-bold text-white transition-colors hover:text-white/80"
          href="/"
        >
          METAVERSUS
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              className="font-medium text-white/70 transition-colors hover:text-white"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="p-2 text-white transition-colors hover:text-white/80"
          >
            <SearchIcon className="size-5" />
          </button>

          <button
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className="p-2 text-white transition-colors hover:text-white/80 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon className="size-5" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className={`
            absolute top-full left-0 w-full border-t border-white/10 bg-black/95 backdrop-blur-md
            md:hidden
          `}
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="space-y-4 px-4 py-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                className="block py-2 font-medium text-white/70 transition-colors hover:text-white"
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
} 