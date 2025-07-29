'use client'

import { useState } from 'react'

import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

import { TypingText, TitleText } from './_components/animated-text'
import { ExploreCard } from './_components/explore-card'
import { GradientBackground } from './_components/gradient-background'
import { HeroSection } from './_components/hero-section'
import { Meteor } from './_components/meteor'
import { Navigation } from './_components/navigation'
import { SectionWrapper } from './_components/section-wrapper'
import { staggerList, fadeInUp, viewportAnimations, floatAnimation, pulseAnimation } from './_utils/animations'
import { EXPLORE_WORLDS, INSIGHTS, NEW_FEATURES, SOCIALS } from './_utils/constants'

import type { WorldId } from './_types'




export default function Web3Page() {
  const [activeWorldId, setActiveWorldId] = useState<WorldId | null>('world1')

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
      <div className={`
        fixed top-0 left-0 h-full w-full bg-gradient-to-br from-indigo-500/5 via-purple-500/3
        to-blue-500/5
      `} />

      <Navigation />

      <HeroSection />

      <SectionWrapper className="relative overflow-hidden" id="about">
        <GradientBackground className="top-0 right-0" variant="cool" />
        <GradientBackground className="bottom-0 left-0 opacity-10" variant="primary" />

        <Meteor delay={0} duration={3} endX={50} endY={70} size="small" startX={-50} startY={30} />
        <Meteor delay={1.5} duration={2.8} endX={60} endY={90} size="medium" startX={120} startY={50} />
        <Meteor delay={3} duration={3.2} endX={40} endY={120} size="small" startX={-40} startY={80} />
        <Meteor delay={4.5} duration={2.5} endX={70} endY={140} size="large" startX={110} startY={100} />

        <div className="space-y-8 text-center">
          <TypingText className="text-center" text="| About Metaversus" />

          <TitleText className="text-center" size="lg">
            Discover the{' '}
            <span className={`
              bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text
              text-transparent
            `}>
              Future
            </span>{' '}
            of Digital Reality
          </TitleText>

          <motion.p
            className="mx-auto max-w-4xl text-lg leading-relaxed text-white/70 sm:text-xl"
            initial={{ opacity: 0, y: 30 }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={viewportAnimations}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="font-semibold text-white">Metaverse</span> represents the next evolution
            of digital interaction, where virtual and physical worlds converge. Experience immersive
            environments that feel incredibly real, powered by cutting-edge{' '}
            <span className="font-semibold text-white">VR technology</span>.
            Transform your dreams into reality and explore infinite possibilities in our{' '}
            <span className="font-semibold text-white">metaverse worlds</span>.
          </motion.p>
        </div>
      </SectionWrapper>

      <SectionWrapper className="relative" id="explore">
        <GradientBackground className="bottom-0 left-0" variant="primary" />
        <GradientBackground className="top-0 right-0 opacity-15" variant="secondary" />

        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <TypingText className="text-center" text="| The World" />
            <TitleText className="text-center" size="lg">
              Choose the world you want <br className="hidden md:block" /> to explore
            </TitleText>
          </div>

          <motion.div
            className="flex h-[600px] gap-4 lg:h-[700px]"
            initial="hidden"
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
            variants={staggerList}
            viewport={viewportAnimations}
            whileInView="visible"
          >
            {EXPLORE_WORLDS.map((world, index) => (
              <ExploreCard
                key={world.id}
                activeId={activeWorldId}
                index={index}
                world={world}
                onCardClick={setActiveWorldId}
              />
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="relative overflow-hidden" id="getstarted">
        <GradientBackground className="top-0 right-0" variant="neutral" />
        <GradientBackground className="bottom-0 left-0 opacity-10" variant="cool" />

        <Meteor delay={0} duration={2.5} endX={-30} endY={100} size="small" startX={1120} startY={30} />
        <Meteor delay={1.5} duration={3} endX={-20} endY={130} size="medium" startX={1110} startY={60} />
        <Meteor delay={3} duration={2} endX={-40} endY={110} size="small" startX={1100} startY={40} />
        <Meteor delay={4.5} duration={2.8} endX={-50} endY={150} size="large" startX={1130} startY={80} />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: 0.2
            }}
            viewport={viewportAnimations}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          >
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={viewportAnimations}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <TypingText text="| How Metaversus Works" />
              <TitleText size="lg">
                Get started with just a few clicks
              </TitleText>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={viewportAnimations}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {[
                'Find a world that suits you and you want to enter',
                'Enter the world by reading basmalah to be safe',
                'No need to beat around the bush, just stay on the gas and have fun',
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  viewport={viewportAnimations}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  <motion.div
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r
                      from-indigo-500 to-purple-500 text-sm font-bold text-white
                    `}
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                  <p className="leading-relaxed text-white/80">{step}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 100, rotateY: 15, scale: 0.8 }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
            transition={{
              duration: 1,
              ease: 'easeOut',
              delay: 0.3
            }}
            viewport={viewportAnimations}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          >
            <motion.img
              alt="Get started with Metaversus"
              className="w-full max-w-md object-contain"
              loading="lazy"
              src="/web3-images/get-started.png"
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              transition={{ duration: 0.3 }}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                filter: 'brightness(1.1)'
              }}
            />
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="relative overflow-hidden" id="whatsnew">
        <GradientBackground className="bottom-0 left-0" variant="dark" />
        <GradientBackground className="top-0 right-0 opacity-10" variant="accent" />

        <Meteor delay={0.5} duration={2.8} endX={110} endY={90} size="medium" startX={-40} startY={30} />
        <Meteor delay={2} duration={2.2} endX={120} endY={130} size="small" startX={-50} startY={70} />
        <Meteor delay={3.5} duration={3.2} endX={100} endY={110} size="large" startX={-30} startY={50} />
        <Meteor delay={5} duration={2.5} endX={130} endY={150} size="small" startX={-60} startY={90} />

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -100, rotateY: -15, scale: 0.8 }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
            transition={{
              duration: 1,
              ease: 'easeOut',
              delay: 0.2
            }}
            viewport={viewportAnimations}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          >
            <motion.img
              alt="What's new in Metaversus"
              className="w-full max-w-md object-contain"
              loading="lazy"
              src="/web3-images/whats-new.png"
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              transition={{ duration: 0.3 }}
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                filter: 'brightness(1.1)'
              }}
            />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
              delay: 0.3
            }}
            viewport={viewportAnimations}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          >
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={viewportAnimations}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <TypingText text="| What's new?" />
              <TitleText size="lg">
                What's new about Metaversus?
              </TitleText>
            </motion.div>

            <motion.div
              className="grid gap-6 sm:grid-cols-2"
              initial={{ opacity: 0, y: 30 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={viewportAnimations}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {NEW_FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass-light group rounded-2xl border border-white/10 p-6"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  viewport={viewportAnimations}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: '0 20px 40px rgba(99, 102, 241, 0.2)'
                  }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                >
                  <motion.div
                    className={`
                      mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r
                      from-indigo-500 to-purple-500
                    `}
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <img alt="" className="h-6 w-6" src={feature.imgUrl} />
                  </motion.div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-white/70">{feature.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="relative" id="world">
        <GradientBackground className="top-0 right-0" variant="primary" />
        <GradientBackground className="bottom-0 left-0 opacity-10" variant="secondary" />

        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <TypingText className="text-center" text="| People on the World" />
            <TitleText className="text-center" size="lg">
              Track friends around you and invite them to play together in the same world
            </TitleText>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={viewportAnimations}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <img
              alt="World map showing user locations"
              className="h-[400px] w-full rounded-2xl object-cover sm:h-[500px]"
              loading="lazy"
              src="/web3-images/map.png"
            />

            <motion.div
              className="glass-light absolute top-10 left-20 h-16 w-16 rounded-full p-1"
              initial="hidden"
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              variants={floatAnimation}
              viewport={viewportAnimations}
              whileInView="visible"
            >
              <img alt="User avatar" className="h-full w-full rounded-full" src="/web3-images/people-01.png" />
            </motion.div>
            <motion.div
              className="glass-light absolute right-20 bottom-20 h-16 w-16 rounded-full p-1"
              initial="hidden"
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              variants={floatAnimation}
              viewport={viewportAnimations}
              whileInView="visible"
            >
              <img alt="User avatar" className="h-full w-full rounded-full" src="/web3-images/people-02.png" />
            </motion.div>
            <motion.div
              className={`
                glass-light absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2
                transform rounded-full p-1
              `}
              initial="hidden"
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              variants={pulseAnimation}
              viewport={viewportAnimations}
              whileInView="visible"
            >
              <img alt="User avatar" className="h-full w-full rounded-full" src="/web3-images/people-03.png" />
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper className="relative" id="insights">
        <GradientBackground className="bottom-0 left-0" variant="accent" />
        <GradientBackground className="top-0 right-0 opacity-10" variant="cool" />

        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <TypingText className="text-center" text="| Insight" />
            <TitleText className="text-center" size="lg">
              Insight about metaverse
            </TitleText>
          </div>

          <motion.div
            className="space-y-8"
            initial="hidden"
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
            variants={staggerList}
            viewport={viewportAnimations}
            whileInView="visible"
          >
            {INSIGHTS.map((insight, index) => (
              <motion.div
                key={insight.title}
                className="grid items-center gap-8 lg:grid-cols-2"
                style={{
                  willChange: 'transform',
                  transform: 'translate3d(0, 0, 0)',
                }}
                variants={fadeInUp}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`
                        flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r
                        from-indigo-500 to-purple-500 font-bold text-white
                      `}
                      style={{
                        willChange: 'transform',
                        transform: 'translate3d(0, 0, 0)',
                      }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.div>
                    <span className="text-sm text-white/60">5 min read</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{insight.title}</h3>
                  <p className="leading-relaxed text-white/70">{insight.subtitle}</p>
                </div>

                <div className="flex justify-center">
                  <motion.img
                    alt={insight.title}
                    className="w-full max-w-sm object-contain"
                    loading="lazy"
                    src={insight.imgUrl}
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      <footer className="relative px-4 py-16 sm:px-6 lg:px-8">
        <GradientBackground className="top-0 left-0" variant="primary" />
        <GradientBackground className="right-0 bottom-0 opacity-10" variant="secondary" />

        <div className={cn('mx-auto max-w-7xl space-y-12')}>
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <h2 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Enter the Metaverse
            </h2>
            <motion.button
              animate={{ opacity: 1, y: 0 }}
              className={`
                group shadow-glow
                hover:shadow-glow-hover
                relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r
                from-indigo-600 to-purple-600 px-8 py-4 font-medium transition-all duration-300
                hover:cursor-pointer
              `}
              initial={{ opacity: 0, y: 20 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`
                  absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0
                  transition-opacity duration-300
                  group-hover:opacity-100
                `}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.5, 0]
                }}
                className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20
                  opacity-0 blur-xl transition-opacity duration-300
                  group-hover:opacity-100
                `}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />

              <div className="relative z-10 flex items-center gap-3">
                <motion.img
                  alt=""
                  src="/web3-images/headset.svg"
                  className="w-6 h-6 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-200"
                  // whileHover={{ rotate: -12, scale: 1.9 }}
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                />
                <motion.span
                  className="font-semibold text-white"
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                  whileHover={{ x: 2 }}
                >
                  Enter Metaverse
                </motion.span>
              </div>

              <motion.div
                className="absolute inset-0 rounded-2xl bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 1, opacity: 1 }}
              />
            </motion.button>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <h3 className="text-2xl font-bold text-white">METAVERSUS</h3>
              <p className="text-sm text-white/60">
                Copyright © {new Date().getFullYear()} Metaversus. All rights reserved.
              </p>
              <div className="flex gap-4">
                {SOCIALS.map((social) => (
                  <motion.a
                    key={social.name}
                    aria-label={`Visit our ${social.name}`}
                    className={`
                      glass-light flex h-10 w-10 items-center justify-center rounded-full
                      transition-colors
                      hover:bg-white/20
                    `}
                    href={social.url}
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                    transition={{ duration: 0.2 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      alt={social.name}
                      className="h-5 w-5"
                      src={social.src}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}