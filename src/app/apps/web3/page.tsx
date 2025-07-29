/* eslint-disable @next/next/no-img-element */ // 'next/image' requires static size of image
'use client'
import { useState } from 'react'

import { motion } from 'framer-motion'
import Link from 'next/link'

import { TitleText, TypingText } from './_components/custom-texts'
import { ExploreCard } from './_components/explore-card'
import { InsightCard } from './_components/insight-card'
import { NewFeatureCard } from './_components/new-feature-card'
import { StartSteps } from './_components/start-steps'
import MenuIcon from './_icons/menu-icon'
import SearchIcon from './_icons/search-icon'
import {
  EXPLORE_WORLDS,
  INSIGHTS,
  NEW_FEATURES,
  SOCIALS,
  type WorldId
} from './_utils/constants'
import {
  fadeIn,
  footerVariants,
  navVariants,
  planetVariants,
  slideIn,
  staggerContainer,
  textVariant,
  zoomIn
} from './_utils/motions'
import { cn, styles } from './_utils/styles'

export default function Web3Page() {
  const [activeExplorerWorldId, setActiveExplorerWorldId] = useState<WorldId>('world1')
  return (
    <>
      <div className='bg-primary-black overflow-hidden'>
        <motion.nav
          className={cn(styles.px, 'relative py-8')}
          id="navbar"
          initial='hidden'
          variants={navVariants}
          whileInView='show'
        >
          <div className="gradient-01 absolute inset-0 w-1/2" />
          <div className={cn(styles.innerWidth, 'mx-auto flex justify-between gap-8')}>
            <SearchIcon className="size-6 stroke-white" />
            <Link href="/">
              <h1 className='text-[24px] leading-[30.24px] font-extrabold text-white'>METAVERSUS</h1>
            </Link>
            <MenuIcon className='size-6 fill-white stroke-white' />
          </div>
        </motion.nav>


        <section className={styles.py} id='hero'>
          <motion.div
            className={cn(styles.innerWidth, 'mx-auto flex flex-col')}
            initial="hidden"
            variants={staggerContainer(1, 1)}
            viewport={{ amount: 0.25 }}
            whileInView="show"
          >
            <div className='relative z-10 flex flex-col items-center justify-center'>

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
              <div className={`
                hero-gradient absolute top-[-30px] z-0 h-[300px] w-full rounded-tl-[140px]
              `} />
              <img
                alt="hero_cover"
                className={`
                  relative z-10 h-[350px] w-full rounded-tl-[140px] object-cover
                  sm:h-[500px]
                `}
                src="/web3-images/cover.png"
              />

              <Link href="#explore">
                <div className={`
                  relative z-10 mt-[-50px] flex w-full justify-end pr-[40px]
                  sm:mt-[-70px]
                `}>
                  <img
                    alt="stamp"
                    className="size-[100px] object-contain sm:size-[155px]"
                    src="/web3-images/stamp.png"
                  />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </section>


        <div className="relative">
          <section className={cn(styles.p, 'relative z-10')} id='about'>
            <div className="gradient-02 z-0" />
            <motion.div
              className={cn(styles.innerWidth, styles.flexCenter, 'mx-auto flex-col')}
              initial="hidden"
              variants={staggerContainer(1, 1)}
              viewport={{ amount: 0.25 }}
              whileInView="show"
            >
              <TypingText className="text-center" text="| About Metaversus" />

              <motion.p
                className={`
                  text-secondary-white mt-[8px] text-center text-[20px] font-normal
                  sm:text-[32px]
                `}
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
                alt="Arrow down"
                className="mt-[28px] h-[28px] w-[18px] object-contain"
                src="/web3-images/arrow-down.svg"
                variants={fadeIn('up', 'tween', 0.3, 1)}
              />
            </motion.div>
          </section>

          <div className="gradient-03 z-0" />

          <section className={styles.p} id="explore" >
            <motion.div
              className={cn(styles.innerWidth, 'mx-auto flex flex-col')}
              initial="hidden"
              variants={staggerContainer(1, 1)}
              viewport={{ amount: 0.25 }}
              whileInView="show"
            >
              <TypingText className="text-center" text="| The World" />
              <TitleText className="text-center" >
                Choose the world you want <br className="hidden md:block" /> to explore
              </TitleText>
              <div className='mt-[50px] flex min-h-[70vh] flex-col gap-5 lg:flex-row'>
                {EXPLORE_WORLDS.map((world, index) => (
                  <ExploreCard
                    key={world.id}
                    {...world}
                    activeId={activeExplorerWorldId}
                    index={index}
                    onClick={() => setActiveExplorerWorldId(world.id)}
                  />
                ))}
              </div>
            </motion.div>
          </section>
        </div>


        <div className="relative">
          <section className={cn(styles.p, 'relative z-10')} id='getstarted'>
            <motion.div
              className={cn(styles.innerWidth, 'mx-auto flex flex-col gap-8 lg:flex-row')}
              initial="hidden"
              variants={staggerContainer(1, 1)}
              viewport={{ amount: 0.25 }}
              whileInView="show"
            >
              <motion.div
                className={cn(styles.flexCenter, 'flex-1')}
                variants={planetVariants('left')}
              >
                <img
                  alt="Get Started"
                  className="size-[90%] object-contain"
                  src="/web3-images/get-started.png"
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
                <div className='mt-[31px] flex max-w-[370px] flex-col gap-[24px]'>
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

          <section className={cn(styles.p, 'relative z-10')} id='whatsnew'>
            <motion.div
              className={cn(styles.innerWidth, 'mx-auto flex flex-col gap-8 lg:flex-row')}
              initial="hidden"
              variants={staggerContainer(1, 1)}
              viewport={{ amount: 0.25 }}
              whileInView="show"
            >
              <motion.div
                className="flex flex-[0.95] flex-col justify-center"
                variants={fadeIn('right', 'tween', 0.2, 1)}
              >
                <TypingText text="| Whats new?" />
                <TitleText >What&apos;s new about Metaversus?</TitleText>
                <div className='mt-[48px] flex flex-wrap justify-between gap-[24px]'>
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
                  alt="What's New"
                  className="size-[90%] object-contain"
                  src="/web3-images/whats-new.png"
                />
              </motion.div>
            </motion.div>
          </section>
        </div>


        <section className={cn(styles.p, 'relative z-10')} id='world'>
          <motion.div
            className={cn(styles.innerWidth, 'mx-auto flex flex-col')}
            initial="hidden"
            variants={staggerContainer(1, 1)}
            viewport={{ amount: 0.25 }}
            whileInView="show"
          >
            <TypingText className="text-center" text="| People on the World" />
            <TitleText className="text-center">
              Track friends around you and invite them to play together in the same
              world
            </TitleText>
            <motion.div
              className="relative mt-[68px] flex h-[550px] w-full"
              variants={fadeIn('up', 'tween', 0.3, 1)}
            >
              <img alt="Map" className="size-full object-cover" src="/web3-images/map.png" />
              <div className={`
                absolute right-20 bottom-20 size-[70px] rounded-full bg-[#5D6680] p-[6px]
              `}>
                <img alt="People" className="size-full" src="/web3-images/people-01.png" />
              </div>
              <div className={`
                absolute top-10 left-20 size-[70px] rounded-full bg-[#5D6680] p-[6px]
              `}>
                <img alt="People" className="size-full" src="/web3-images/people-02.png" />
              </div>
              <div className={`
                absolute top-1/2 left-[45%] size-[70px] rounded-full bg-[#5D6680] p-[6px]
              `}>
                <img alt="people" className="size-full" src="/web3-images/people-03.png" />
              </div>
            </motion.div>
          </motion.div>
        </section>


        <div className="relative">
          <section className={cn(styles.p, 'relative z-10')} id='insights'>
            <motion.div
              className={cn(styles.innerWidth, 'mx-auto flex flex-col')}
              initial="hidden"
              variants={staggerContainer(1, 1)}
              viewport={{ amount: 0.25 }}
              whileInView="show"
            >
              <TypingText className="text-center" text="| Insight" />
              <TitleText className="text-center" >Insight about metaverse</TitleText>
              <div className="mt-[50px] flex flex-col gap-[30px]">
                {INSIGHTS.map((item, index) => (
                  <InsightCard key={`insight-${index}`} {...item} index={index + 1} />
                ))}
              </div>
            </motion.div>
          </section>

          <div className="gradient-04 z-0" />

          <section className={styles.p} id='feedback'>
            <motion.div
              className={cn(styles.innerWidth, 'mx-auto flex flex-col gap-6 lg:flex-row')}
              initial="hidden"
              variants={staggerContainer(1, 1)}
              viewport={{ amount: 0.25 }}
              whileInView="show"
            >
              <motion.div
                className={`
                  gradient-05 relative flex flex-[0.5] flex-col justify-end rounded-[32px] border
                  border-[#6A6A6A] p-4 text-white
                  sm:p-8
                  lg:max-w-[370px]
                `}
                variants={fadeIn('right', 'tween', 0.2, 1)}
              >
                <div className="feedback-gradient" />
                <div>
                  <h4 className={`
                    text-[26px] leading-[36.32px] font-bold
                    sm:text-[32px] sm:leading-[40.32px]
                  `}>
                    Samantha
                  </h4>
                  <p className={`
                    mt-[8px] text-[12px] leading-[16.68px] font-normal
                    sm:text-[18px] sm:leading-[22.68px]
                  `}>
                    Founder Metaverus
                  </p>
                </div>
                <p className={`
                  mt-[24px] text-[18px] leading-[39.6px] font-normal
                  sm:text-[24px] sm:leading-[45.6px]
                `}>
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
                  alt="Planet 09"
                  className='h-auto min-h-[210px] w-full rounded-[40px] object-cover lg:h-[610px]'
                  src="/web3-images/planet-09.png"
                />
                <motion.div
                  className="absolute top-[3%] left-[-10%] hidden lg:block"
                  variants={zoomIn(0.4, 1)}
                >
                  <img
                    alt="Stamp"
                    className="size-[155px] object-contain"
                    src="/web3-images/stamp.png"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </section>
        </div>


        <motion.footer
          className={cn(styles.px, 'relative py-8')}
          id='footer'
          initial="hidden"
          variants={footerVariants}
          whileInView="show"
        >
          <div className="footer-gradient" />
          <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
            <div className="flex flex-wrap items-center justify-between gap-5">
              <h4 className="text-[44px] font-bold text-white md:text-[64px]">
                Enter the Metaverse
              </h4>
              <button className={`
                flex h-fit items-center gap-[12px] rounded-[32px] bg-[#25618B] px-6 py-4
              `} type="button">
                <img
                  alt="headset"
                  className="size-[24px] object-contain"
                  src="/web3-images/headset.svg"
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
                        key={social.name}
                        alt={social.name}
                        className="size-[24px] cursor-pointer object-contain"
                        src={social.src}
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
