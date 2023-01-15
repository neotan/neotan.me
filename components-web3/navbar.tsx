'use client'
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'
import styles from '../utils-web3/styles'
import { navVariants } from '../utils-web3/motions'

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
      Navbar
    </motion.nav>
  )
}