/* eslint-disable @next/next/no-img-element */ // 'next/image' requires static size of image
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { TitleText, TypingText } from '../components/custom-texts'
import { ExploreCard } from '../components/explore-card'
import { InsightCard } from '../components/insight-card'
import { NewFeatureCard } from '../components/new-feature-card'
import { StartSteps } from '../components/start-steps'
import MenuIcon from '../icons/menu-icon'
import SearchIcon from '../icons/search-icon'
import {
  EXPLORE_WORLDS,
  INSIGHTS,
  NEW_FEATURES,
  SOCIALS,
  WorldId
} from '../utils/constants'
import {
  fadeIn,
  footerVariants,
  navVariants,
  planetVariants,
  slideIn,
  staggerContainer,
  textVariant,
  zoomIn
} from '../utils/motions'
import { cn, styles } from '../utils/styles'

export default function Web3Page() {
  const [activeExplorerWorldId, setActiveExplorerWorldId] = useState<WorldId>('world1')
  return (
    <>
      <div className={cn('overflow-hidden  bg-primary-black')}>
        <motion.nav
          id="navbar"
          className={cn(styles.px, 'relative py-8')}
          variants={navVariants}
          initial='hidden'
          whileInView='show'
        >
          <div className="gradient-01 absolute inset-0 w-1/2" />
          <div className={cn(styles.innerWidth, 'mx-auto flex justify-between gap-8')}>
            <SearchIcon className="h-6 w-6 stroke-white" />
            <h2 className='text-[24px] font-extrabold leading-[30.24px] text-white'>METAVERSUS</h2>
            <MenuIcon className='h-6 w-6 fill-white stroke-white' />
          </div>
        </motion.nav>


        <section id='hero' className={cn(styles.py,)}>
          <motion.div
            className={cn(styles.innerWidth, 'mx-auto flex flex-col')}
            initial="hidden"
            whileInView="show"
            variants={staggerContainer(1, 1)}
            viewport={{ amount: 0.25 }}
          >
            <div className="relative z-10 flex flex-col items-center justify-center">

              <motion.h1 className={styles.heroHeading} variants={textVariant(1.2)}>MATAVERSE</motion.h1>
              <motion.div
                className='flex items-center justify-center'
                variants={textVariant(1)}>
                <h1 className={styles.heroHeading}>MA</h1>
                <div className={styles.heroDText} />
                <h1 className={styles.heroHeading}>Ness</h1>
              </motion.div>
            </div>

            <motion.div
              className="relative mt-[-12px] w-full md:mt-[-20px]"
              variants={slideIn('right', 'tween', 0.2, 1)}
            >
              <div className="hero-gradient absolute top-[-30px] z-[0] h-[300px] w-full rounded-tl-[140px]" />
              <img
                className="relative z-10 h-[350px] w-full rounded-tl-[140px] object-cover sm:h-[500px]"
                src="/images/cover.png"
                alt="hero_cover"
              />

              <Link href="#explore">
                <div className="relative z-10 mt-[-50px] flex w-full justify-end pr-[40px] sm:mt-[-70px]">
                  <img
                    className="h-[100px] w-[100px] object-contain sm:h-[155px] sm:w-[155px]"
                    src="/images/stamp.png"
                    alt="stamp"
                  />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </section>


        <div className="relative">
          <section id='about' className={cn(styles.p, 'relative z-10')}>
            <div className="gradient-02 z-0" />
            <motion.div
              className={cn(styles.innerWidth, styles.flexCenter, 'mx-auto flex-col')}
              variants={staggerContainer(1, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.25 }}
            >
              <TypingText text="| About Metaversus" className="text-center" />

              <motion.p
                className="mt-[8px] text-center text-[20px] font-normal text-secondary-white sm:text-[32px]"
                variants={fadeIn('up', 'tween', 0.2, 1)}
              >
                <span className="font-extrabold text-white">Metaverse</span> is a new
                thing in the future, where you can enjoy the virtual world by feeling
                like it&apos;s really real, you can feel what you feel in this metaverse
                world, because this is really the{' '}
                <span className="font-extrabold text-white">
                  madness of the metaverse
                </span>{' '}
                of today, using only{' '}
                <span className="font-extrabold text-white">VR</span> devices you can
                easily explore the metaverse world you want, turn your dreams into
                reality. Let&apos;s{' '}
                <span className="font-extrabold text-white">explore</span> the madness
                of the metaverse by scrolling down
              </motion.p>

              <motion.img
                className="mt-[28px] h-[28px] w-[18px] object-contain"
                variants={fadeIn('up', 'tween', 0.3, 1)}
                src="/images/arrow-down.svg"
                alt="Arrow down"
              />
            </motion.div>
          </section>

          <div className="gradient-03 z-0" />

          <section id="explore" className={styles.p} >
            <motion.div
              className={cn(styles.innerWidth, 'mx-auto flex flex-col')}
              variants={staggerContainer(1, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.25 }}
            >
              <TypingText text="| The World" className="text-center" />
              <TitleText className="text-center" >
                Choose the world you want <br className="hidden md:block" /> to explore
              </TitleText>
              <div className="mt-[50px] flex min-h-[70vh] flex-col gap-5 lg:flex-row">
                {EXPLORE_WORLDS.map((world, index) => (
                  <ExploreCard
                    key={world.id}
                    {...world}
                    index={index}
                    activeId={activeExplorerWorldId}
                    onClick={() => setActiveExplorerWorldId(world.id)}
                  />
                ))}
              </div>
            </motion.div>
          </section>
        </div>


        <div className="relative">
          <section id='getstarted' className={cn(styles.p, 'relative z-10')}>
            <motion.div
              className={cn(styles.innerWidth, 'mx-auto flex flex-col gap-8 lg:flex-row')}
              variants={staggerContainer(1, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.25 }}
            >
              <motion.div
                className={cn(styles.flexCenter, 'flex-1')}
                variants={planetVariants('left')}
              >
                <img
                  className="h-[90%] w-[90%] object-contain"
                  src="/images/get-started.png"
                  alt="Get Started"
                />
              </motion.div>
              <motion.div
                className="flex flex-[0.75] flex-col justify-center"
                variants={fadeIn('left', 'tween', 0.2, 1)}
              >
                <TypingText text="| How Metaversus Works" />
                <TitleText >
                  Get started with just a few clicks
                </TitleText>
                <div className="mt-[31px] flex max-w-[370px] flex-col gap-[24px]">
                  {[
                    'Find a world that suits you and you want to enter',
                    'Enter the world by reading basmalah to be safe',
                    'No need to beat around the bush, just stay on the gas and have fun',
                  ].map((feature, index) => (
                    <StartSteps
                      key={feature}
                      number={String(index + 1).padStart(2, '0')}
                      text={feature}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </section>

          <div className="gradient-04 z-0" />

          <section id='whatsnew' className={cn(styles.p, 'relative z-10')}>
            <motion.div
              className={cn(styles.innerWidth, 'mx-auto flex flex-col gap-8 lg:flex-row')}
              variants={staggerContainer(1, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.25 }}
            >
              <motion.div
                className="flex flex-[0.95] flex-col justify-center"
                variants={fadeIn('right', 'tween', 0.2, 1)}
              >
                <TypingText text="| Whats new?" />
                <TitleText >What&apos;s new about Metaversus?</TitleText>
                <div className="mt-[48px] flex flex-wrap justify-between gap-[24px]">
                  {NEW_FEATURES.map((feature) => (
                    <NewFeatureCard key={feature.title} {...feature} />
                  ))}
                </div>
              </motion.div>
              <motion.div
                className={cn(styles.flexCenter, 'flex-1')}
                variants={planetVariants('right')}
              >
                <img
                  className="h-[90%] w-[90%] object-contain"
                  src="/images/whats-new.png"
                  alt="What's New"
                />
              </motion.div>
            </motion.div>
          </section>
        </div>


        <section id='world' className={cn(styles.p, 'relative z-10')}>
          <motion.div
            className={cn(styles.innerWidth, 'mx-auto flex flex-col')}
            variants={staggerContainer(1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.25 }}
          >
            <TypingText text="| People on the World" className="text-center" />
            <TitleText className="text-center">
              Track friends around you and invite them to play together in the same
              world
            </TitleText>
            <motion.div
              className="relative mt-[68px] flex h-[550px] w-full"
              variants={fadeIn('up', 'tween', 0.3, 1)}
            >
              <img src="/images/map.png" alt="Map" className="h-full w-full object-cover" />
              <div className="absolute bottom-20 right-20 h-[70px] w-[70px] rounded-full bg-[#5D6680] p-[6px]">
                <img src="/images/people-01.png" alt="People" className="h-full w-full" />
              </div>
              <div className="absolute left-20 top-10 h-[70px] w-[70px] rounded-full bg-[#5D6680] p-[6px]">
                <img src="/images/people-02.png" alt="People" className="h-full w-full" />
              </div>
              <div className="absolute left-[45%] top-1/2 h-[70px] w-[70px] rounded-full bg-[#5D6680] p-[6px]">
                <img src="/images/people-03.png" alt="people" className="h-full w-full" />
              </div>
            </motion.div>
          </motion.div>
        </section>


        <div className="relative">
          <section id='insights' className={cn(styles.p, 'relative z-10')}>
            <motion.div
              className={cn(styles.innerWidth, 'mx-auto flex flex-col')}
              variants={staggerContainer(1, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.25 }}
            >
              <TypingText text="| Insight" className="text-center" />
              <TitleText className="text-center" >Insight about metaverse</TitleText>
              <div className="mt-[50px] flex flex-col gap-[30px]">
                {INSIGHTS.map((item, index) => (
                  <InsightCard key={`insight-${index}`} {...item} index={index + 1} />
                ))}
              </div>
            </motion.div>
          </section>

          <div className="gradient-04 z-0" />

          <section id='feedback' className={styles.p}>
            <motion.div
              className={cn(styles.innerWidth, 'mx-auto flex flex-col gap-6 lg:flex-row')}
              variants={staggerContainer(1, 1)}
              initial="hidden"
              whileInView="show"
              viewport={{ amount: 0.25 }}
            >
              <motion.div
                className="gradient-05 relative flex flex-[0.5] flex-col justify-end rounded-[32px] border-[1px] border-[#6A6A6A] p-4 text-white sm:p-8 lg:max-w-[370px]"
                variants={fadeIn('right', 'tween', 0.2, 1)}
              >
                <div className="feedback-gradient" />
                <div>
                  <h4 className="text-[26px] font-bold leading-[36.32px] sm:text-[32px] sm:leading-[40.32px]">
                    Samantha
                  </h4>
                  <p className="mt-[8px] text-[12px] font-normal leading-[16.68px] sm:text-[18px] sm:leading-[22.68px]">
                    Founder Metaverus
                  </p>
                </div>
                <p className="mt-[24px] text-[18px] font-normal leading-[39.6px] sm:text-[24px] sm:leading-[45.6px]">
                  “With the development of today&apos;s technology, metaverse is very
                  useful for today&apos;s work, or can be called web 3.0. by using
                  metaverse you can use it as anything”
                </p>
              </motion.div>
              <motion.div
                className="relative flex flex-1 items-center justify-center"
                variants={fadeIn('left', 'tween', 0.2, 1)}
              >
                <img
                  className="h-auto min-h-[210px] w-full rounded-[40px] object-cover lg:h-[610px]"
                  src="/images/planet-09.png"
                  alt="Planet 09"
                />
                <motion.div
                  className="absolute left-[-10%] top-[3%] hidden lg:block  "
                  variants={zoomIn(0.4, 1)}
                >
                  <img
                    className="h-[155px] w-[155px] object-contain"
                    src="/images/stamp.png"
                    alt="Stamp"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </section>
        </div>


        <motion.footer
          id='footer'
          className={cn(styles.px, 'relative py-8')}
          variants={footerVariants}
          initial="hidden"
          whileInView="show"
        >
          <div className="footer-gradient" />
          <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <h4 className="text-[44px] font-bold text-white md:text-[64px]">
                Enter the Metaverse
              </h4>
              <button type="button" className="flex h-fit items-center gap-[12px] rounded-[32px] bg-[#25618B] px-6 py-4">
                <img
                  className="h-[24px] w-[24px] object-contain"
                  src="/images/headset.svg"
                  alt="headset"
                />
                <span className="text-[16px] font-normal text-white">
                  Enter Metaverse
                </span>
              </button>
            </div>

            <div className="flex flex-col">
              <div className="mb-[50px] h-[2px] bg-white opacity-10" />

              <div className="flex flex-wrap items-center justify-between gap-4">
                <h4 className="text-[24px] font-extrabold text-white">
                  METAVERUS
                </h4>
                <p className="text-[14px] font-normal text-white opacity-50">
                  Copyright © {new Date().getFullYear()} Metaversus. All rights reserved.
                </p>

                <div className="flex gap-4">
                  {SOCIALS.map((social) => (
                    <Link key={social.name} href={social.url}>
                      <img
                        className="h-[24px] w-[24px] cursor-pointer object-contain"
                        key={social.name}
                        src={social.src}
                        alt={social.name}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  )
}
