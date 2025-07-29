import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const designTokens = {
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  borderRadius: {
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
  typography: {
    hero: 'text-4xl font-bold md:text-6xl lg:text-8xl',
    h1: 'text-3xl font-bold md:text-4xl lg:text-5xl',
    h2: 'text-2xl font-semibold md:text-3xl lg:text-4xl',
    h3: 'text-xl font-semibold md:text-2xl lg:text-3xl',
    body: 'text-base leading-relaxed',
    caption: 'text-sm text-muted-foreground',
  },
} as const

export const styles = {
  innerWidth: 'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',

  section: 'py-16 sm:py-20 lg:py-24',
  sectionSm: 'py-12 sm:py-16 lg:py-20',
  sectionLg: 'py-20 sm:py-24 lg:py-32',

  flexCenter: 'flex items-center justify-center',
  flexBetween: 'flex items-center justify-between',
  flexStart: 'flex items-start justify-start',
  flexEnd: 'flex items-center justify-end',

  gridCenter: 'grid place-items-center',
  gridCols: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',

  heroHeading: 'text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl',
  heroSubheading: 'text-xl font-medium text-white/80 sm:text-2xl md:text-3xl',
  sectionTitle: 'text-3xl font-bold text-white sm:text-4xl md:text-5xl',
  sectionSubtitle: 'text-lg text-white/70 sm:text-xl md:text-2xl',

  button: 'inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-200',
  buttonPrimary: 'bg-primary text-primary-foreground hover:bg-primary/90',
  buttonSecondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  buttonOutline: 'border border-border bg-transparent hover:bg-accent',

  card: 'rounded-xl bg-card/50 backdrop-blur-sm border border-border/50',
  cardHover: 'hover:bg-card/70 hover:border-border transition-all duration-200',

  gradientPrimary: 'bg-gradient-to-r from-primary via-primary/80 to-primary/60',
  gradientSecondary: 'bg-gradient-to-r from-secondary via-secondary/80 to-secondary/60',
  gradientAccent: 'bg-gradient-to-r from-accent via-accent/80 to-accent/60',

  glass: 'bg-white/10 backdrop-blur-md border border-white/20',
  glassDark: 'bg-black/20 backdrop-blur-md border border-white/10',

  transition: 'transition-all duration-300 ease-out',
  transitionFast: 'transition-all duration-150 ease-out',
  transitionSlow: 'transition-all duration-500 ease-out',
} as const

export function cn(...classNames: Parameters<typeof clsx>) {
  return twMerge(clsx(classNames))
}

export const responsive = {
  mobile: 'sm:hidden',
  tablet: 'hidden sm:block md:hidden',
  desktop: 'hidden md:block lg:hidden',
  large: 'hidden lg:block',
} as const

export const animation = {
  fadeIn: 'animate-in fade-in duration-500',
  slideIn: 'animate-in slide-in-from-bottom-4 duration-500',
  scaleIn: 'animate-in zoom-in duration-300',
} as const