'use client'

import type { ComponentProps } from 'react'

import { motion } from 'motion/react'

import { fadeIn, microInteractions, viewportAnimations } from '../_utils/animations'
import { cn, styles } from '../_utils/styles'

import type { World, WorldId } from '../_types'

interface ExploreCardProps extends ComponentProps<typeof motion.div> {
  world: World
  index: number
  activeId: WorldId | null
  onCardClick: (id: WorldId) => void
}

export function ExploreCard({
  world,
  index,
  activeId,
  onCardClick,
  className,
  ...props
}: ExploreCardProps) {
  const isActive = activeId === world.id

  return (
    <motion.div
      aria-label={`Explore ${world.title} world`}
      className={cn(
        'group relative cursor-pointer overflow-hidden rounded-2xl',
        'transition-all duration-500 ease-out',
        isActive ? 'flex-[3]' : 'flex-[1]',
        className
      )}
      initial="hidden"
      role="button"
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
      tabIndex={0}
      variants={fadeIn({ direction: 'up', delay: index * 0.1 })}
      viewport={viewportAnimations}
      whileHover="hover"
      whileInView="show"
      whileTap="tap"
      onClick={() => onCardClick(world.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onCardClick(world.id)
        }
      }}
      {...props}
    >
      <img
        alt={`${world.title} world`}
        className={`
          absolute inset-0 h-full w-full object-cover transition-transform duration-500
          group-hover:scale-110
        `}
        loading="lazy"
        src={world.imgUrl}
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-6">
        {isActive ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <motion.div
              className={`
                flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm
              `}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <img
                alt=""
                className="h-6 w-6"
                src="/web3-images/headset.svg"
              />
            </motion.div>

            <h3 className="text-2xl font-bold text-white">
              {world.title}
            </h3>

            {world.description && (
              <p className="text-sm leading-relaxed text-white/80">
                {world.description}
              </p>
            )}

            <motion.button
              className={`
                inline-flex items-center gap-2 text-white/90 transition-colors
                hover:text-white
              `}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              transition={{ duration: 0.2 }}
              whileHover={{ x: 5 }}
            >
              <span className="text-sm font-medium">Enter World</span>
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M9 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </motion.button>
          </motion.div>
        ) : (
          <div className="origin-bottom-left -rotate-90 transform">
            <h3 className="text-lg font-semibold whitespace-nowrap text-white">
              {world.title}
            </h3>
          </div>
        )}
      </div>

      <motion.div
        className={`
          absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300
          group-hover:opacity-100
        `}
        initial={false}
      />
    </motion.div>
  )
} 