import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export type FeedbackProps = BaseProps<'section'>
export function Feedback({ className, children, rootProps }: FeedbackProps) {

  return (
    <section className={twMerge("", className)} {...rootProps}>
      Feedback
      {children}
    </section>
  )
}