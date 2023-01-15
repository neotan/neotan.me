import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export type WhatsNewProps = BaseProps<'section'>
export function WhatsNew({ className, children, rootProps }: WhatsNewProps) {

  return (
    <section className={twMerge("", className)} {...rootProps}>
      WhatsNew
      {children}
    </section>
  )
}