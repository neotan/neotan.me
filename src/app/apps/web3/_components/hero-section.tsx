'use client'

import { motion } from 'motion/react'

import { TitleText, TypingText } from './animated-text'
import { FancyButton } from './fancy-button'
import { GradientBackground } from './gradient-background'
import { textVariant, slideIn, staggerContainer } from '../_utils/animations'
import { cn, styles } from '../_utils/styles'

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <GradientBackground className="top-0 left-0" variant="primary" />
      <GradientBackground className="right-0 bottom-0" variant="secondary" />

      <div className={cn(styles.innerWidth, 'relative z-10')}>
        <motion.div
          className="space-y-8 text-center"
          initial="hidden"
          variants={staggerContainer(0.1, 0.1)}
          viewport={{ once: true, amount: 0.25 }}
          whileInView="show"
        >
          <motion.div className="space-y-4" variants={textVariant(0.2)}>
            <TitleText className="text-center" size="xl">
              METAVERSE
            </TitleText>

            <div className="flex items-center justify-center gap-2 sm:gap-4">
              <TitleText size="lg">MA</TitleText>
              <div className={`
                h-8 w-12 rounded-r-full border-4 border-white
                sm:h-12 sm:w-16
                md:h-16 md:w-24
              `} />
              <TitleText size="lg">Ness</TitleText>
            </div>
          </motion.div>

          <motion.div variants={textVariant(0.4)}>
            <p className="mx-auto max-w-3xl text-lg text-white/80 sm:text-xl md:text-2xl">
              Experience the future of digital interaction in our immersive virtual worlds
            </p>
          </motion.div>

          <motion.div variants={textVariant(0.6)}>
            <FancyButton
              className="text-lg"
              href="#explore"
              icon={
                <motion.svg
                  animate={{ y: [0, 4, 0] }}
                  className="h-5 w-5"
                  fill="none"
                  initial={{ y: 0 }}
                  stroke="currentColor"
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
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
            <div className={`
              absolute inset-0 rounded-3xl bg-gradient-to-t from-black/50 to-transparent
            `} />

            <img
              alt="Metaverse hero cover showing virtual worlds"
              className="h-[300px] w-full rounded-3xl object-cover sm:h-[400px] md:h-[500px]"
              loading="eager"
              src="/web3-images/cover.png"
            />

            <motion.div
              animate={{ scale: 1, rotate: 0 }}
              className="absolute -top-8 -right-8"
              initial={{ scale: 0, rotate: -180 }}
              transition={{ delay: 1, duration: 0.8, type: 'spring', ease: 'easeOut' }}
            >
              <img
                alt=""
                className="h-20 w-20 object-contain sm:h-24 sm:w-24 md:h-32 md:w-32"
                src="/web3-images/stamp.png"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 