import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export type InsightsProps = BaseProps<'section'>
export function Insights({ className, children, rootProps }: InsightsProps) {

  return (
    <section className={twMerge("", className)} {...rootProps}>
      Insights
      {children}
    </section>
  )
}