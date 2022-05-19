import Layout from '~/components/layout'

export default function Home() {
  return (
    <Layout>
      <section className="mx-10 mt-20 flex flex-col items-start justify-center space-y-2 leading-none sm:mx-auto sm:mt-24 sm:max-w-xl md:items-center">
        <h1 className="text-[8vw] text-gray-600 dark:text-gray-400 md:text-5xl">
          Hi there!👋 I&apos;m
        </h1>
        <h1 className="text-[19vw] font-semibold text-gray-800 dark:text-gray-100 md:text-9xl">
          Neo Tan
        </h1>
        <h1 className="text-[7vw] leading-snug text-gray-500 dark:text-gray-500 sm:text-3xl md:text-center">
          I am a software engineer👨‍💻 based in Canada🍁, love creating tools🛠,
          apps💾 and helping people to make great web🕸.
        </h1>
      </section>
    </Layout>
  )
}
