import Navbar from '@/components/navbar'
export default function HashAppLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-background">
      <Navbar className='sticky top-0 z-50' />
      <nav className="flex items-center justify-center bg-background pt-4">
        <h1 className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-6xl font-black text-transparent">HASH</h1>
      </nav>
      {children}
    </div>
  )
}