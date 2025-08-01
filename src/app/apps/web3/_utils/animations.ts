import { type Variant } from 'motion/react'

import type { AnimationProps } from '../_types'

export const navVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      delay: 0.5,
    },
  },
} as const

export function slideIn({
  direction = 'right',
  type = 'spring',
  delay = 0,
  duration = 0.8,
}: AnimationProps = {}): Record<'hidden' | 'show', Variant> {
  return {
    hidden: {
      opacity: 0,
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '-100%' : 0,
      transform: 'translate3d(0, 0, 0)',
    },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transform: 'translate3d(0, 0, 0)',
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  }
}

export function staggerContainer(
  staggerChildren = 0.1,
  delayChildren = 0.1
): Record<'hidden' | 'show', Variant> {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }
}

export function textVariant(delay = 0): Record<'hidden' | 'show', Variant> {
  return {
    hidden: {
      opacity: 0,
      y: 50,
      transform: 'translate3d(0, 0, 0)',
    },
    show: {
      opacity: 1,
      y: 0,
      transform: 'translate3d(0, 0, 0)',
      transition: {
        type: 'spring',
        duration: 1.25,
        delay,
      },
    },
  }
}

export const textVariant2 = {
  hidden: {
    opacity: 0,
    y: 20,
    transform: 'translate3d(0, 0, 0)',
  },
  show: {
    opacity: 1,
    y: 0,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      type: 'tween',
      ease: 'easeIn',
      duration: 0.6,
    },
  },
} as const

export const textContainer = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: i * 0.1
    },
  }),
} as const

export function fadeIn({
  direction = 'up',
  type = 'spring',
  delay = 0,
  duration = 0.8,
}: AnimationProps = {}): Record<'hidden' | 'show', Variant> {
  return {
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
      transform: 'translate3d(0, 0, 0)',
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  }
}

export function planetVariants(direction: 'left' | 'right' = 'left') {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : '100%',
      rotate: 120,
      transform: 'translate3d(0, 0, 0)',
    },
    show: {
      x: 0,
      rotate: 0,
      transform: 'translate3d(0, 0, 0)',
      transition: {
        type: 'spring',
        duration: 1.8,
        delay: 0.5,
      },
    },
  }
}

export function zoomIn(delay = 0, duration = 0.6) {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
      transform: 'translate3d(0, 0, 0)',
    },
    show: {
      scale: 1,
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  }
}

export const footerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 140,
    },
  },
  show: {
    opacity: 1,
    y: 0,
    transform: 'translate3d(0, 0, 0)',
    transition: {
      type: 'spring',
      stiffness: 80,
      delay: 0.5,
    },
  },
} as const

export const microInteractions = {
  hover: {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1, ease: 'easeOut' },
  },
} as const

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transform: 'translate3d(0, 0, 0)',
  },
  visible: {
    opacity: 1,
    y: 0,
    transform: 'translate3d(0, 0, 0)',
    transition: { duration: 0.6, ease: 'easeOut' }
  },
} as const

export const scaleIn = {
  hidden: {
    scale: 0.8,
    opacity: 0,
    transform: 'translate3d(0, 0, 0)',
  },
  visible: {
    scale: 1,
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: { duration: 0.5, ease: 'easeOut' }
  },
} as const

export const slideUp = {
  hidden: {
    y: 50,
    opacity: 0,
    transform: 'translate3d(0, 0, 0)',
  },
  visible: {
    y: 0,
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: { duration: 0.6, ease: 'easeOut' }
  },
} as const

export const fadeInUp = {
  hidden: {
    y: 30,
    opacity: 0,
    transform: 'translate3d(0, 0, 0)',
  },
  visible: {
    y: 0,
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: { duration: 0.5, ease: 'easeOut' }
  },
} as const

export const staggerList = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
} as const

export const listItem = {
  hidden: {
    opacity: 0,
    x: -20,
    transform: 'translate3d(0, 0, 0)',
  },
  visible: {
    opacity: 1,
    x: 0,
    transform: 'translate3d(0, 0, 0)',
    transition: { duration: 0.5, ease: 'easeOut' }
  },
} as const

export const floatAnimation = {
  hidden: { y: 0 },
  visible: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

export const pulseAnimation = {
  hidden: { scale: 1 },
  visible: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  },
}

export const meteorVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    x: -100,
    y: 0,
  },
  visible: {
    opacity: [0, 1, 1, 0],
    scale: [0, 1, 1, 0],
    x: [0, 100],
    y: [0, 100],
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: 5,
    },
  },
} as const

export const viewportAnimations = {
  once: true,
  amount: 0.25,
  margin: '0px 0px -100px 0px',
} as const 