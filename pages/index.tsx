import {motion as mo} from 'framer-motion'
import Layout from '~/components/layout'

export default function Home() {
  return (
    <Layout>
      <section className="height-screen mx-10 flex flex-col items-start justify-center space-y-8 leading-none md:mx-auto md:w-[50rem]">
        <mo.h1
          className="text-[8vw] text-gray-600 dark:text-gray-400 md:text-5xl"
          initial={{opacity: 0, y: 100}}
          animate={{opacity: 1, y: 0}}
        >
          Hi there!👋 I&apos;m
        </mo.h1>
        <h1 className="flex space-x-8 text-[19vw] font-semibold text-gray-800 dark:text-gray-100 md:text-9xl">
          <mo.div
            initial={{opacity: 0, x: -200}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: 1}}
          >
            Neo
          </mo.div>
          <mo.div
            initial={{opacity: 0, x: 200}}
            animate={{opacity: 1, x: 0}}
            transition={{delay: 1}}
          >
            Tan
          </mo.div>
        </h1>
        <h1 className="text-[7vw] leading-snug text-gray-500 dark:text-gray-500 sm:text-3xl">
          {typing(
            'a software engineer👨‍💻 based in Canada🍁, love creating tools🛠, apps💾 and helping people to make great web🕸.',
          )}
        </h1>
      </section>
    </Layout>
  )
}

function typing(str: string) {
  return str.split('').map((c, i) => {
    return (
      <mo.span
        key={i}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 2 + i / 100, type: 'inertia', velocity: 100}}
      >
        {c}
      </mo.span>
    )
  })
}
