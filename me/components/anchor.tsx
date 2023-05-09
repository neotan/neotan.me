import { ComponentPropsWithoutRef } from 'react'

export type AnchorProps = ComponentPropsWithoutRef<'a'> & { newWindow?: boolean }

export default function Anchor({ href, children, newWindow = false, ...restProps }: AnchorProps) {
  const target = newWindow ? '_blank' : '_self'
  return (
    <a href={href} rel='noopener noreferrer' target={target} {...restProps} >
      {children}
    </a>
  )
}
