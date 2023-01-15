import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export type WorldProps = BaseProps<'section'>
export function World({ className, children, rootProps }: WorldProps) {

  return (
    <section className={twMerge("", className)} {...rootProps}>
      World
      {children}
    </section>
  )
}