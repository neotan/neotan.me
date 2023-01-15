"use client"
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { BaseProps } from 'shared-types'

export default function Portal({ children, htmlTag = 'portal-mount-root' }: BaseProps<'div'> & { htmlTag?: string }) {
  const [isMounted, setIsMounted] = useState(false)
  const targetNodeRef = useRef<HTMLDivElement | null>(null)
  const portalNodeRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  //useLayoutEffec has SSR issue: thttps://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
  useEffect(() => {
    if (!targetNodeRef.current) return

    const targetDoc = targetNodeRef.current?.ownerDocument
    const targetBody = targetDoc?.body // TODO: custom mount target
    portalNodeRef.current = targetDoc.createElement(htmlTag)
    targetBody.appendChild(portalNodeRef.current)
    console.log(1111, { portalNodeRef, targetBody: targetBody.children })

    return () => {
      if (portalNodeRef.current && targetBody) {
        console.log(2222, { portalNodeRef, targetBody: targetBody.children })
        targetBody.removeChild(portalNodeRef.current)
      }
    }
  }, [htmlTag])


  if (!isMounted) return null

  return portalNodeRef.current
    ? createPortal(children, portalNodeRef.current)
    : <span ref={targetNodeRef} />
}