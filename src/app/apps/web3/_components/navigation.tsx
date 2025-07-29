'use client'

import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'

import { navVariants } from '../_utils/animations'
import { cn, styles } from '../_utils/styles'
import { NAV_ITEMS } from '../_utils/nav-constants'
import SearchIcon from '../_icons/search-icon'
import MenuIcon from '../_icons/menu-icon'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.nav
      className={cn(
        'sticky top-0 z-50 w-full bg-black/20 backdrop-blur-md border-b border-white/10',
        'py-4 px-4 sm:px-6 lg:px-8'
      )}
      initial="hidden"
      variants={navVariants}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className={cn(styles.innerWidth, styles.flexBetween)}>
        <Link
          href="/"
          className="text-2xl font-bold text-white hover:text-white/80 transition-colors"
          aria-label="Go to homepage"
        >
          METAVERSUS
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/70 hover:text-white transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            className="p-2 text-white hover:text-white/80 transition-colors"
            aria-label="Search"
          >
            <SearchIcon className="size-5" />
          </button>

          <button
            className="md:hidden p-2 text-white hover:text-white/80 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <MenuIcon className="size-5" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <motion.div
          className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md border-t border-white/10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="px-4 py-6 space-y-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-white/70 hover:text-white transition-colors font-medium py-2"
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