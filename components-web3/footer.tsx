import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { twMerge } from "tailwind-merge"
import clsx from 'clsx'

export type FooterProps = BaseProps<'footer'>
export function Footer({ className, children, rootProps }: FooterProps) {

  return (
    <footer className={twMerge("", className)} {...rootProps}>
      Footer
      {children}
    </footer>
  )
}