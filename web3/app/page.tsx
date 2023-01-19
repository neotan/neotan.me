/* eslint-disable @next/next/no-img-element */ // 'next/image' requires static size of image
'use client'
import Link from 'next/link'
import Image, { ImageLoader } from 'next/image'
import { motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'
import localFont from '@next/font/local'
import styles from '../utils/styles'
import { fadeIn, navVariants, slideIn, staggerContainer, textVariant } from '../utils/motions'
import {
  TypingText
} from '../components/custom-texts'
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
  const cardCls = 'w-full h-64 sm:w-1/2 lg:w-1/3 bg-base border-secondary'
  return (
    <>
      <div className={twMerge(eudoxusFont.className, 'bg-primary-black divide-y divide-white/5')}>
        <motion.nav
          className={`${styles.px} relative py-8`}
          variants={navVariants}
          initial='hidden'
          whileInView='show'
        >
          <div className="gradient-01 absolute inset-0 w-1/2" />
          <div className={twMerge(styles.innerWidth, 'mx-auto flex justify-between')}>
            <SearchIcon className="h-6 w-6 stroke-white" />
            <h2 className='text-2xl font-extrabold leading-7 text-white'>METAVERSUS</h2>
            <MenuIcon className='h-6 w-6 fill-white stroke-white' />
          </div>

        </motion.nav>

        <section id='hero' className={twMerge(styles.py, 'pl-6 sm:pl-16')}>
          <motion.div
            className={twMerge(styles.innerWidth, 'mx-auto flex flex-col')}
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
        <section id='about' className={twMerge(styles.p, 'relative z-10')}>
          <div className="gradient-02 z-0" />
          <motion.div
            variants={staggerContainer(1, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
          >
            <TypingText title="| About Metaversus" className="text-center" />

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
        <section id='explore' className='grid h-screen place-content-center text-3xl text-white'>Explore</section>
        <section id='getstarted' className='grid h-screen place-content-center text-3xl text-white'>GetStarted</section>
        <section id='insights' className='grid h-screen place-content-center text-3xl text-white'>Insights</section>
        <section id='whats' className='grid h-screen place-content-center text-3xl text-white'>Whats</section>
        <section id='world' className='grid h-screen place-content-center text-3xl text-white'>World</section>
        <section id='feedback' className='grid h-screen place-content-center text-3xl text-white'>Feedback</section>
        <footer id='footer' className='grid h-screen place-content-center text-3xl text-white'>Footer</footer>
      </div>
    </>
  )
}
