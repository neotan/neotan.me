/* eslint-disable @next/next/no-img-element */ // 'next/image' requires static size of image
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { values } from 'ramda'
import { motion } from 'framer-motion'
import localFont from '@next/font/local'
import { cn, styles } from '../utils/styles'
import { EXPLORE_WORLDS, INSIGHTS, NEW_FEATURES, WorldId } from '../utils/constants'
import { fadeIn, navVariants, planetVariants, slideIn, staggerContainer, textVariant } from '../utils/motions'
import { TitleText, TypingText } from '../components/custom-texts'
import { ExploreCard } from '../components/explore-card'
import { StartSteps } from '../components/start-steps'
import { NewFeatureCard } from '../components/new-feature-card'
import { InsightCard } from '../components/insight-card'
import SearchIcon from '@/icons/search-icon'
import MenuIcon from '@/icons/menu-icon'

const eudoxusFont = localFont({
  src: [
    {
      path: '../fonts/eudoxus-sans/EudoxusSans-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/eudoxus-sans/EudoxusSans-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/eudoxus-sans/EudoxusSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/eudoxus-sans/EudoxusSans-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/eudoxus-sans/EudoxusSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/eudoxus-sans/EudoxusSans-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    }
  ]
})

export default function Web3Page() {
  const [activeExplorerWorldId, setActiveExplorerWorldId] = useState<WorldId>('world1')
  return (
    <>
      <div className={cn(eudoxusFont.className, 'bg-primary-black divide-y divide-white/5')}>
        <motion.nav
          className={`${styles.px} relative py-8`}
          variants={navVariants}
          initial='hidden'
          whileInView='show'
        >
          <div className="gradient-01 absolute inset-0 w-1/2" />
          <div className={cn(styles.innerWidth, 'mx-auto flex justify-between')}>
            <SearchIcon className="h-6 w-6 stroke-white" />
            <h2 className='text-2xl font-extrabold leading-7 text-white'>METAVERSUS</h2>
            <MenuIcon className='h-6 w-6 fill-white stroke-white' />
          </div>

        </motion.nav>

        <section id='hero' className={cn(styles.py, 'pl-6 sm:pl-16')}>
          <motion.div
            className={cn(styles.innerWidth, 'mx-auto flex flex-col')}
            initial="hidden"
            whileInView="show"
            variants={staggerContainer(1, 1)}
            viewport={{ once: false, amount: 0.25 }}
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
              variants={slideIn('right', 'tween', 0.2, 1)}
              className="relative mt-[-12px] w-full md:mt-[-20px]"
            >
              <div className="hero-gradient absolute top-[-30px] z-[0] h-[300px] w-full rounded-tl-[140px]" />
              <img
                src="/images/cover.png"
                alt="hero_cover"
                className="relative z-10 h-[350px] w-full rounded-tl-[140px] object-cover sm:h-[500px]"
              />

              <Link href="#explore">
                <div className="relative z-10 mt-[-50px] flex w-full justify-end pr-[40px] sm:mt-[-70px]">
                  <img
                    src="/images/stamp.png"
                    alt="stamp"
                    className="h-[100px] w-[100px] object-contain sm:h-[155px] sm:w-[155px]"
                  />
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </section>
        <section id='about' className={cn(styles.p, 'relative z-10')}>
          <div className="gradient-02 z-0" />
          <motion.div
            variants={staggerContainer(1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
          >
            <TypingText text="| About Metaversus" className="text-center" />

            <motion.p
              variants={fadeIn('up', 'tween', 0.2, 1)}
              className="text-secondary-white mt-[8px] text-center text-[20px] font-normal sm:text-[32px]"
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
              variants={fadeIn('up', 'tween', 0.3, 1)}
              src="/images/arrow-down.svg"
              alt="Arrow down"
              className="mt-[28px] h-[28px] w-[18px] object-contain"
            />
          </motion.div>
        </section>
        <section id="explore" className={styles.p} >
          <motion.div
            variants={staggerContainer(1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`${styles.innerWidth} mx-auto flex flex-col`}
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
        <section id='getstarted' className={cn(styles.p, 'relative z-10')}>
          <motion.div
            variants={staggerContainer(1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={cn(styles.innerWidth, 'mx-auto flex flex-col gap-8 lg:flex-row')}
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
        <section id='whatsnew' className={cn(styles.p, 'relative z-10')}>
          <section className={cn(styles.p, 'relative z-10')}>
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
        </section>
        <section id='world' className={cn(styles.p, 'relative z-10')}>
          <motion.div
            className={cn(styles.innerWidth, 'mx-auto flex flex-col')}
            variants={staggerContainer(1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ amount: 0.25 }}
          >
            <TypingText text="| People on the World" className="text-center" />
            <TitleText className="text-center"
            >Track friends around you and invite them to play together in the same
              world</TitleText>
            <motion.div
              className="relative mt-[68px] flex h-[550px] w-full"
              variants={fadeIn('up', 'tween', 0.3, 1)}
            >
              <img src="/images/map.png" alt="Map" className="h-full w-full object-cover" />
              <div className="absolute bottom-20 right-20 h-[70px] w-[70px] rounded-full bg-[#5D6680] p-[6px]">
                <img src="/images/people-01.png" alt="People" className="h-full w-full" />
              </div>
              <div className="absolute top-10 left-20 h-[70px] w-[70px] rounded-full bg-[#5D6680] p-[6px]">
                <img src="/images/people-02.png" alt="People" className="h-full w-full" />
              </div>
              <div className="absolute top-1/2 left-[45%] h-[70px] w-[70px] rounded-full bg-[#5D6680] p-[6px]">
                <img src="/images/people-03.png" alt="people" className="h-full w-full" />
              </div>
            </motion.div>
          </motion.div>
        </section>
        <section id='feedback' className='grid h-40 place-content-center text-3xl text-white'>Feedback</section>
        <footer id='footer' className='grid h-40 place-content-center text-3xl text-white'>Footer</footer>
      </div>
    </>
  )
}
