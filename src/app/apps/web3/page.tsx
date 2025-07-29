'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

import { Navigation } from './_components/navigation'
import { HeroSection } from './_components/hero-section'
import { SectionWrapper } from './_components/section-wrapper'
import { TypingText, TitleText } from './_components/animated-text'
import { ExploreCard } from './_components/explore-card'
import { GradientBackground } from './_components/gradient-background'
import { EXPLORE_WORLDS, INSIGHTS, NEW_FEATURES, SOCIALS } from './_utils/constants'
import { staggerList, fadeInUp, viewportAnimations, floatAnimation, pulseAnimation } from './_utils/animations'
import type { WorldId } from './_types'
import { Meteor } from './_components/meteor'
import { cn } from '@/lib/utils'


export default function Web3Page() {
  const [activeWorldId, setActiveWorldId] = useState<WorldId | null>('world1')

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900" />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-500/5 via-purple-500/3 to-blue-500/5" />

      <Navigation />

      <HeroSection />

      <SectionWrapper id="about" className="relative overflow-hidden">
        <GradientBackground variant="cool" className="top-0 right-0" />
        <GradientBackground variant="primary" className="bottom-0 left-0 opacity-10" />

        <Meteor delay={0} duration={3} startX={-50} startY={30} endX={50} endY={70} size="small" />
        <Meteor delay={1.5} duration={2.8} startX={120} startY={50} endX={60} endY={90} size="medium" />
        <Meteor delay={3} duration={3.2} startX={-40} startY={80} endX={40} endY={120} size="small" />
        <Meteor delay={4.5} duration={2.5} startX={110} startY={100} endX={70} endY={140} size="large" />

        <div className="text-center space-y-8">
          <TypingText text="| About Metaversus" className="text-center" />

          <TitleText size="lg" className="text-center">
            Discover the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Future
            </span>{' '}
            of Digital Reality
          </TitleText>

          <motion.p
            className="text-white/70 text-lg sm:text-xl max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportAnimations}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
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

      <SectionWrapper id="explore" className="relative">
        <GradientBackground variant="primary" className="bottom-0 left-0" />
        <GradientBackground variant="secondary" className="top-0 right-0 opacity-15" />

        <div className="space-y-12">
          <div className="text-center space-y-4">
            <TypingText text="| The World" className="text-center" />
            <TitleText size="lg" className="text-center">
              Choose the world you want <br className="hidden md:block" /> to explore
            </TitleText>
          </div>

          <motion.div
            className="flex gap-4 h-[600px] lg:h-[700px]"
            variants={staggerList}
            initial="hidden"
            whileInView="visible"
            viewport={viewportAnimations}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            {EXPLORE_WORLDS.map((world, index) => (
              <ExploreCard
                key={world.id}
                world={world}
                index={index}
                activeId={activeWorldId}
                onCardClick={setActiveWorldId}
              />
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="getstarted" className="relative overflow-hidden">
        <GradientBackground variant="neutral" className="top-0 right-0" />
        <GradientBackground variant="cool" className="bottom-0 left-0 opacity-10" />

        <Meteor delay={0} duration={2.5} startX={1120} startY={30} endX={-30} endY={100} size="small" />
        <Meteor delay={1.5} duration={3} startX={1110} startY={60} endX={-20} endY={130} size="medium" />
        <Meteor delay={3} duration={2} startX={1100} startY={40} endX={-40} endY={110} size="small" />
        <Meteor delay={4.5} duration={2.8} startX={1130} startY={80} endX={-50} endY={150} size="large" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100, rotateY: -15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={viewportAnimations}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2
            }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportAnimations}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <TypingText text="| How Metaversus Works" />
              <TitleText size="lg">
                Get started with just a few clicks
              </TitleText>
            </motion.div>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportAnimations}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
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
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportAnimations}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                >
                  <motion.div
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                  <p className="text-white/80 leading-relaxed">{step}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: 100, rotateY: 15, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            viewport={viewportAnimations}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.3
            }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <motion.img
              src="/web3-images/get-started.png"
              alt="Get started with Metaversus"
              className="w-full max-w-md object-contain"
              loading="lazy"
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                filter: "brightness(1.1)"
              }}
              transition={{ duration: 0.3 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            />
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="whatsnew" className="relative overflow-hidden">
        <GradientBackground variant="dark" className="bottom-0 left-0" />
        <GradientBackground variant="accent" className="top-0 right-0 opacity-10" />

        <Meteor delay={0.5} duration={2.8} startX={-40} startY={30} endX={110} endY={90} size="medium" />
        <Meteor delay={2} duration={2.2} startX={-50} startY={70} endX={120} endY={130} size="small" />
        <Meteor delay={3.5} duration={3.2} startX={-30} startY={50} endX={100} endY={110} size="large" />
        <Meteor delay={5} duration={2.5} startX={-60} startY={90} endX={130} endY={150} size="small" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -100, rotateY: -15, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
            viewport={viewportAnimations}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.2
            }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <motion.img
              src="/web3-images/whats-new.png"
              alt="What's new in Metaversus"
              className="w-full max-w-md object-contain"
              loading="lazy"
              whileHover={{
                scale: 1.05,
                rotateY: -5,
                filter: "brightness(1.1)"
              }}
              transition={{ duration: 0.3 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            />
          </motion.div>

          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 100, rotateY: 15 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={viewportAnimations}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.3
            }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportAnimations}
              transition={{ duration: 0.6, delay: 0.5 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <TypingText text="| What's new?" />
              <TitleText size="lg">
                What's new about Metaversus?
              </TitleText>
            </motion.div>

            <motion.div
              className="grid sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportAnimations}
              transition={{ duration: 0.8, delay: 0.7 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              {NEW_FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="p-6 rounded-2xl glass-light border border-white/10 group"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={viewportAnimations}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    boxShadow: "0 20px 40px rgba(99, 102, 241, 0.2)"
                  }}
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  >
                    <img src={feature.imgUrl} alt="" className="w-6 h-6" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{feature.subtitle}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="world" className="relative">
        <GradientBackground variant="primary" className="top-0 right-0" />
        <GradientBackground variant="secondary" className="bottom-0 left-0 opacity-10" />

        <div className="space-y-12">
          <div className="text-center space-y-4">
            <TypingText text="| People on the World" className="text-center" />
            <TitleText size="lg" className="text-center">
              Track friends around you and invite them to play together in the same world
            </TitleText>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportAnimations}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <img
              src="/web3-images/map.png"
              alt="World map showing user locations"
              className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl"
              loading="lazy"
            />

            <motion.div
              className="absolute top-10 left-20 w-16 h-16 rounded-full glass-light p-1"
              variants={floatAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={viewportAnimations}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <img src="/web3-images/people-01.png" alt="User avatar" className="w-full h-full rounded-full" />
            </motion.div>
            <motion.div
              className="absolute bottom-20 right-20 w-16 h-16 rounded-full glass-light p-1"
              variants={floatAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={viewportAnimations}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <img src="/web3-images/people-02.png" alt="User avatar" className="w-full h-full rounded-full" />
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full glass-light p-1"
              variants={pulseAnimation}
              initial="hidden"
              whileInView="visible"
              viewport={viewportAnimations}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <img src="/web3-images/people-03.png" alt="User avatar" className="w-full h-full rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="insights" className="relative">
        <GradientBackground variant="accent" className="bottom-0 left-0" />
        <GradientBackground variant="cool" className="top-0 right-0 opacity-10" />

        <div className="space-y-12">
          <div className="text-center space-y-4">
            <TypingText text="| Insight" className="text-center" />
            <TitleText size="lg" className="text-center">
              Insight about metaverse
            </TitleText>
          </div>

          <motion.div
            className="space-y-8"
            variants={staggerList}
            initial="hidden"
            whileInView="visible"
            viewport={viewportAnimations}
            style={{
              willChange: 'transform',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            {INSIGHTS.map((insight, index) => (
              <motion.div
                key={insight.title}
                className="grid lg:grid-cols-2 gap-8 items-center"
                variants={fadeInUp}
                style={{
                  willChange: 'transform',
                  transform: 'translate3d(0, 0, 0)',
                }}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        willChange: 'transform',
                        transform: 'translate3d(0, 0, 0)',
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </motion.div>
                    <span className="text-white/60 text-sm">5 min read</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{insight.title}</h3>
                  <p className="text-white/70 leading-relaxed">{insight.subtitle}</p>
                </div>

                <div className="flex justify-center">
                  <motion.img
                    src={insight.imgUrl}
                    alt={insight.title}
                    className="w-full max-w-sm object-contain"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      <footer className="relative py-16 px-4 sm:px-6 lg:px-8">
        <GradientBackground variant="primary" className="top-0 left-0" />
        <GradientBackground variant="secondary" className="bottom-0 right-0 opacity-10" />

        <div className={cn('max-w-7xl mx-auto space-y-12')}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Enter the Metaverse
            </h2>
            <motion.button
              className="group hover:cursor-pointer relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-medium transition-all duration-300 shadow-glow hover:shadow-glow-hover overflow-hidden"
              whileHover={{
                scale: 1.05,
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{
                willChange: 'transform',
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />

              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10 flex items-center gap-3">
                <motion.img
                  src="/web3-images/headset.svg"
                  alt=""
                  className="w-6 h-6 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-200"
                  // whileHover={{ rotate: -12, scale: 1.9 }}
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                />
                <motion.span
                  className="text-white font-semibold"
                  whileHover={{ x: 2 }}
                  style={{
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                  }}
                >
                  Enter Metaverse
                </motion.span>
              </div>

              <motion.div
                className="absolute inset-0 rounded-2xl bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            </motion.button>
          </div>

          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <h3 className="text-2xl font-bold text-white">METAVERSUS</h3>
              <p className="text-white/60 text-sm">
                Copyright © {new Date().getFullYear()} Metaversus. All rights reserved.
              </p>
              <div className="flex gap-4">
                {SOCIALS.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className="w-10 h-10 rounded-full glass-light flex items-center justify-center hover:bg-white/20 transition-colors"
                    aria-label={`Visit our ${social.name}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      willChange: 'transform',
                      transform: 'translate3d(0, 0, 0)',
                    }}
                  >
                    <img
                      src={social.src}
                      alt={social.name}
                      className="w-5 h-5"
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