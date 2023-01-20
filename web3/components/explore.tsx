import { motion } from "framer-motion"
import { BaseProps } from 'shared-types'
import { cn } from '../utils/styles'

export type ExploreProps = BaseProps<'section'>
export function Explore({ className, children, rootProps }: ExploreProps) {

  return (
    <section className={cn("", className)} {...rootProps}>
      Explore
      {children}
    </section>
  )
}