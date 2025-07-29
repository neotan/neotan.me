'use client'

import { motion } from 'motion/react'
import type { ComponentProps } from 'react'

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
      className={cn(
        'relative group cursor-pointer overflow-hidden rounded-2xl',
        'transition-all duration-500 ease-out',
        isActive ? 'flex-[3]' : 'flex-[1]',
        className
      )}
      variants={fadeIn({ direction: 'up', delay: index * 0.1 })}
      whileHover="hover"
      whileTap="tap"
      initial="hidden"
      whileInView="show"
      viewport={viewportAnimations}
      onClick={() => onCardClick(world.id)}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${world.title} world`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onCardClick(world.id)
        }
      }}
      style={{
        willChange: 'transform',
        transform: 'translate3d(0, 0, 0)',
      }}
      {...props}
    >
      <img
        src={world.imgUrl}
        alt={`${world.title} world`}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
        style={{
          willChange: 'transform',
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      <div className="relative h-full flex flex-col justify-end p-6">
        {isActive ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <motion.div
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <img
                src="/web3-images/headset.svg"
                alt=""
                className="w-6 h-6"
              />
            </motion.div>

            <h3 className="text-2xl font-bold text-white">
              {world.title}
            </h3>

            {world.description && (
              <p className="text-white/80 text-sm leading-relaxed">
                {world.description}
              </p>
            )}

            <motion.button
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <span className="text-sm font-medium">Enter World</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </motion.div>
        ) : (
          <div className="transform -rotate-90 origin-bottom-left">
            <h3 className="text-lg font-semibold text-white whitespace-nowrap">
              {world.title}
            </h3>
          </div>
        )}
      </div>

      <motion.div
        className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </motion.div>
  )
} 