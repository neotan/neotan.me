import { ComponentProps } from 'react'
import { cn, styles } from '../_utils/styles'

export type StartStepsProps = ComponentProps<'div'> & { number: string, text: string }

export function StartSteps({ className, number, text }: StartStepsProps) {

  return (
    <div className={cn(styles.flexCenter, 'flex-row', className)}>
      <div className={cn(styles.flexCenter, 'h-[70px] w-[70px] rounded-[24px] bg-[#323F5D]')} >
        <p className="text-[20px] font-bold text-white">
          {number}
        </p>
      </div>
      <p className="ml-[30px] flex-1 text-[18px] font-normal leading-[32.4px] text-[#B0B0B0]">
        {text}
      </p>
    </div>
  )
}