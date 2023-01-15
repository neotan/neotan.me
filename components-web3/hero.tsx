import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export type HeroProps = BaseProps<'section'>
export function Hero({ className, children, rootProps }: HeroProps) {

  return (
    <section className={twMerge("", className)} {...rootProps}>
      Hero
      {children}
    </section>
  )
}