import {motion as mo} from 'framer-motion'
import {DefaultLayout} from '~/components/layouts'

export default function Home() {
  return (
    <DefaultLayout>
      <section className="home-page height-screen mx-3 flex flex-col items-start justify-center space-y-8 leading-none sm:mx-10 md:mx-auto md:max-w-[60vw]">
        <BgImage />
        <div className="rounded bg-gray-900 bg-opacity-60 p-3 sm:p-20">
          <mo.h1
            className="text-[8vw] md:text-5xl"
            initial={{opacity: 0, y: 100}}
            animate={{opacity: 1, y: 0}}
          >
            Hi there!👋 I&apos;m
          </mo.h1>
          <h1 className="mt-6 flex space-x-8 text-[19vw] font-semibold md:text-9xl">
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
          <h1 className="mt-6 text-[7vw] leading-snug sm:text-3xl">
            {typing(
              'a software engineer👨‍💻 based in Canada🍁, love creating tools🛠, apps💾 and helping people to make great web🕸.',
            )}
          </h1>
        </div>
      </section>
    </DefaultLayout>
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

function BgImage() {
  return (
    <div
      className="center absolute top-0 left-0 bottom-0 right-0 -z-10 bg-cover bg-center bg-no-repeat dark:grayscale"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/ntme/image/upload/v1653179674/blog/HK_JWMarriott_cmxjbo.jpg")',
      }}
    />
  )
}
