'use client'

import { motion } from 'motion/react'

import { textVariant, slideIn, staggerContainer } from '../_utils/animations'
import { cn, styles } from '../_utils/styles'
import { TitleText, TypingText } from './animated-text'
import { GradientBackground } from './gradient-background'
import { FancyButton } from './fancy-button'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <GradientBackground variant="primary" className="top-0 left-0" />
      <GradientBackground variant="secondary" className="bottom-0 right-0" />

      <div className={cn(styles.innerWidth, 'relative z-10')}>
        <motion.div
          className="text-center space-y-8"
          initial="hidden"
          variants={staggerContainer(0.1, 0.1)}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div className="space-y-4" variants={textVariant(0.2)}>
            <TitleText size="xl" className="text-center">
              METAVERSE
            </TitleText>

            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <TitleText size="lg">MA</TitleText>
              <div className="w-12 h-8 sm:w-16 sm:h-12 md:w-24 md:h-16 rounded-r-full border-4 border-white" />
              <TitleText size="lg">Ness</TitleText>
            </div>
          </motion.div>

          <motion.div variants={textVariant(0.4)}>
            <p className="text-white/80 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto">
              Experience the future of digital interaction in our immersive virtual worlds
            </p>
          </motion.div>

          <motion.div variants={textVariant(0.6)}>
            <FancyButton
              href="#explore"
              className="text-lg"
              icon={
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ y: 0 }}
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </motion.svg>
              }
            >
              Explore Worlds
            </FancyButton>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mt-16"
          variants={slideIn({ direction: 'up', delay: 0.8 })}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl" />

            <img
              src="/web3-images/cover.png"
              alt="Metaverse hero cover showing virtual worlds"
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover rounded-3xl"
              loading="eager"
            />

            <motion.div
              className="absolute -top-8 -right-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 1, duration: 0.8, type: 'spring', ease: 'easeOut' }}
            >
              <img
                src="/web3-images/stamp.png"
                alt=""
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 