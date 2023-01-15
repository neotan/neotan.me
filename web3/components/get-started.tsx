import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export type GetStartedProps = BaseProps<'section'>
export function GetStarted({ className, children, rootProps }: GetStartedProps) {

  return (
    <section className={twMerge("", className)} {...rootProps}>
      GetStarted
      {children}
    </section>
  )
}