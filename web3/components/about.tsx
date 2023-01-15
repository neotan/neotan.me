import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export type AboutProps = BaseProps<'section'>
export function About({ className, children, rootProps }: AboutProps) {

  return (
    <section className={twMerge("", className)} {...rootProps}>
      About
      {children}
    </section>
  )
}