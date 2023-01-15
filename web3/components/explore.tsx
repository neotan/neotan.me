import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export type ExploreProps = BaseProps<'section'>
export function Explore({ className, children, rootProps }: ExploreProps) {

  return (
    <section className={twMerge("", className)} {...rootProps}>
      Explore
      {children}
    </section>
  )
}