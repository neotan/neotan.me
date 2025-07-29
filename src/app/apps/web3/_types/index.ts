export type WorldId = 'world1' | 'world2' | 'world3' | 'world4' | 'world5'

export interface World {
  id: WorldId
  imgUrl: string
  title: string
  description?: string
}

export interface Insight {
  id: string
  imgUrl: string
  title: string
  subtitle: string
  readTime?: string
}

export interface NewFeature {
  id: string
  imgUrl: string
  title: string
  subtitle: string
}

export interface SocialLink {
  name: string
  src: string
  url: string
  ariaLabel?: string
}

export interface NavItem {
  href: string
  label: string
}

export interface SectionProps {
  className?: string
  children: React.ReactNode
  id?: string
}

export interface AnimationProps {
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  type?: 'spring' | 'tween' | 'inertia'
}

export interface CardProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export interface GradientBackgroundProps {
  className?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'dark' | 'neutral' | 'cool'
  opacity?: number
} 