import * as React from 'react'

interface HeaderItemProps {
  title: React.ReactNode
  Icon: any
}

export default function HeaderItem({title, Icon}: HeaderItemProps) {
  return (
    <div className="flex flex-col items-center w-12 cursor-pointer sm:w-20 hover:text-white group">
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <p className="tracking-widest opacity-0 group-hover:opacity-100">
        {title}
      </p>
    </div>
  )
}
