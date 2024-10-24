import React, { ComponentProps , Fragment, useState } from 'react'

import { Link } from 'next-view-transitions'
import { pluck, without } from 'ramda'
import {
  FaAngleUp,
  FaChartLine,
  FaSortAlphaDown,
  FaTimes,
} from 'react-icons/fa'
import { ReactSortable } from 'react-sortablejs'

import { Badge } from '@/components/ui/badge'
import { cn, isNilOrEmpty } from '@/lib/utils'

export default function PkgBasket({
  className,
  selectedPkgNames,
  setSelectedPkgNames,
}: ComponentProps<'aside'> & {
  selectedPkgNames: string[]
  setSelectedPkgNames: (pkgNames: string[]) => void
}) {
  const [isBasketExpanded, setIsBasketExpanded] = useState(false)
  const selectedPkgs = selectedPkgNames.map(name => ({ id: name }))
  return (
    <aside
      className={cn(
        'fixed bottom-0 right-0 rounded-b-none rounded-s-md border-2 border-popover bg-card p-2 pt-3 shadow-2xl sm:px-4',
        className,
        {
          'w-full sm:w-auto':
            !isNilOrEmpty(selectedPkgNames) && isBasketExpanded,
        },
      )}
    >
      <div className="flex flex-col space-y-6">
        {isBasketExpanded && !isNilOrEmpty(selectedPkgNames) && (
          <ReactSortable
            className="flex flex-col gap-1"
            animation={500}
            delayOnTouchOnly={true}
            delay={200}
            ghostClass="opacity-0"
            list={selectedPkgs}
            setList={items => setSelectedPkgNames(pluck('id', items))}
          >
            {selectedPkgNames?.map((pkgName, i) => {
              return (
                <Fragment key={pkgName}>
                  <div
                    className="!bg-tertiary flex cursor-grab gap-1 truncate rounded-md py-1 !text-lg text-accent sm:py-0"
                    title={pkgName}
                    color="ghost"
                  >
                    {pkgName}
                    <div className="grow" />
                    <FaTimes
                      className="size-5 cursor-pointer text-muted-foreground"
                      onClick={() =>
                        setSelectedPkgNames(
                          without([pkgName], selectedPkgNames),
                        )
                      }
                    />
                  </div>
                </Fragment>
              )
            })}
          </ReactSortable>
        )}
        <div
          className={cn('flex items-center gap-9', {
            'opacity-40': isNilOrEmpty(selectedPkgNames),
          })}
        >
          <Link
            className="flex"
            target="_blank"
            title="Compare on NpmTrends.com"
            href={`https://npmtrends.com/${selectedPkgNames?.join?.('-vs-')}`}
          >
            <div className="flex gap-2 rounded-md bg-secondary px-2 py-1">
              <FaChartLine
                className="size-7 fill-accent group-hover:z-10"
                title="Compare on NpmTrends.com"
              />
              <Badge
                key={selectedPkgNames.length}
                className="bg-secondary p-0 text-secondary-foreground"
              >
                {selectedPkgNames.length}
              </Badge>
            </div>
          </Link>
          <div className="grow" />
          {!isNilOrEmpty(selectedPkgNames) && isBasketExpanded && (
            <div className="flex">
              <FaSortAlphaDown
                className="size-6 cursor-pointer"
                title="Sort the selected packages alphabetically"
                onClick={() => setSelectedPkgNames(selectedPkgNames.sort())}
              />
            </div>
          )}
          <FaAngleUp
            className={cn(
              'size-7 transform-gpu cursor-pointer  text-muted-foreground duration-200',
              { 'rotate-180': isBasketExpanded },
            )}
            title="Show/hide basket"
            onClick={() => setIsBasketExpanded(!isBasketExpanded)}
          />
        </div>
      </div>
    </aside>
  )
}
