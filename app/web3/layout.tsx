import '../../styles/web3.css'
import { twMerge } from 'tailwind-merge'
import { BaseProps } from 'shared-types'

function Web3Layout({ className, children }: BaseProps<'html'>) {
  return (
    <html lang="en">
      <head />
      <body className={twMerge('antialiased', className)}>
        {children}
      </body>
    </html >
  )
}

export default Web3Layout