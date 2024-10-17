import Head from 'next/head'
import './styles.css'
export default function Web3SiteLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-[#1A232E]">
      <Head>
        <title>Metaversus @ NEOTAN.ME</title>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  )
}