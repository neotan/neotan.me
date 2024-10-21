import Head from 'next/head'
import './styles.css'
export default function Web3SiteLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-[#1A232E]">
      {children}
    </div>
  )
}