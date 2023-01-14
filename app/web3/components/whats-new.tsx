import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export default function WhatsNew({ className, children, rootProps }: BaseProps<'section'>) {

  return (
    <section className={twMerge("", className)} {...rootProps}>
      WhatsNew
      {children}
    </section>
  )
}