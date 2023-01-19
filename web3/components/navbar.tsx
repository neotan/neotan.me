'use client'
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'
import { FiSearch } from 'react-icons/fi'
import styles from '../utils/styles'
import { navVariants } from '../utils/motions'

export type NavbarProps = HTMLMotionProps<"nav">
export function Navbar({ className }: NavbarProps) {

  return (
    <motion.nav
      className={twMerge(`${styles.px} py-8 relative`, className)}
      variants={navVariants}
      initial='hidden'
      whileInView='show'
    >
      <div className="gradient-01 absolute inset-0 w-1/2" />
      <div className={`${styles.innerWidth} mx-auto`}>

        <FiSearch className="h-6 w-6" />
      </div>

    </motion.nav>
  )
}