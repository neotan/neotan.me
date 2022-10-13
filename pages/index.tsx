import { motion as mo } from 'framer-motion'
import { Hero } from 'react-daisyui'
import { DefaultLayout } from '~/components/layouts'
import ClientRenderOnly from '~/components/client-render-only'

export default function Home() {
  return (
    <DefaultLayout className="bg-img bg-cover">
      <Hero className="flex-grow">
        <Hero.Overlay className="absolute top-0 flex flex-col items-center justify-center  bg-gray-900 bg-opacity-40 p-10 text-gray-100 sm:static sm:h-fit sm:w-fit sm:rounded-md lg:max-w-[50vw]">
          <mo.h2
            className="text-3xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Hi there!{wave('👋')} I&apos;m
          </mo.h2>
          <h1 className="mt-6 flex space-x-8 text-7xl font-semibold md:text-9xl">
            <mo.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              Neo
            </mo.div>
            <mo.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              Tan
            </mo.div>
          </h1>
          <ClientRenderOnly>
            <h2 className="mt-6 text-center text-[7vw] leading-snug sm:text-3xl">
              {typing(
                'a software engineer👨‍💻 based in Canada🍁, love creating tools🛠, apps💾 and helping people to make great web🕸.',
              )}
            </h2>
          </ClientRenderOnly>
        </Hero.Overlay>
      </Hero>
    </DefaultLayout>
  )
}

function typing(str: string) {
  return str.split('').map((c, i) => {
    return (
      <mo.span
        key={i}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2 + i / 100, type: 'inertia', velocity: 100 }}
      >
        {c}
      </mo.span>
    )
  })
}

function wave(str: string) {
  return (
    <mo.span
      style={{ originX: 1, originY: 1 }}
      className="inline-block text-center"
      animate={{ rotate: [0, 20] }}
      transition={{ duration: 0.5, flip: 8 }}
    >
      {str}
    </mo.span>
  )
}
