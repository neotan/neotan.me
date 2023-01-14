import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export default function About({ className, children, rootProps }: BaseProps<'section'>) {

  return (
    <section className={twMerge("", className)} {...rootProps}>
      About
      {children}
    </section>
  )
}