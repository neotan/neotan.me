"use client"
import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import { JetBrains_Mono, Mitr } from "@next/font/google";

const mitr = Mitr({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700"]
})
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ["200", "300", "400", "500", "600", "700", "100", "800"]
})

export default function HomeIndex() {
  return (
    <>
      <style jsx global>
        {`:root{
              --mitr-font: ${mitr.style.fontFamily};
              --jbmono-font: ${jetBrainsMono.style.fontFamily};
            }`}
      </style>
      <ThemeProvider
        attribute="data-theme"
        storageKey={`neotan.me-root-theme"`}
      defaultTheme='autumn'
      >
      <main className="grow">
        <div className="absolute top-0 flex flex-col items-center  justify-center  bg-gray-900/40 p-10 text-gray-100 sm:static sm:h-fit sm:w-fit sm:rounded-md lg:max-w-[50vw]">
          <h2
            className="text-3xl md:text-5xl"
          >
            Hi there!👋 I&apos;m a software engineer👨‍💻 based in Canada🍁, love creating tools🛠, apps💾 and helping people to make great web🕸.
          </h2>
          <h1 className="mt-6 flex space-x-8 text-7xl font-semibold md:text-9xl">
            Neo Tan
          </h1>
        </div>
      </main>
      </ThemeProvider>
    </>
  )
}
