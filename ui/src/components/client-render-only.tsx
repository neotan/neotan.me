import { ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode | Function
}

export function ClientRenderOnly({ children, fallback }: Props) {
  const [hasMounted, setHasMounted] = useState(false)
  useEffect(() => {
    setHasMounted(true)
  }, [])
  if (!hasMounted) {
    return fallback
      ? typeof fallback === 'function'
        ? fallback()
        : fallback
      : null
  }
  return <>{children}</>
}
