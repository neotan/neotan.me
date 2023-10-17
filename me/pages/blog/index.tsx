'use client'
import { useRouter } from 'next/router'
import { values } from 'ramda'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { deserialize } from 'superjson'
import { formatDate } from 'utils/helpers'
import Anchor from '../../components/anchor'
import DefaultLayout from '../../components/default-layout'
//@ts-ignore
import postFiles from '../../public/db.json'
import { Meta } from '../../types'

export default function BlogIndex({ metas }: { metas: Meta[] }) {
  const router = useRouter()
  return (
    <DefaultLayout className='h-screen'>
      <main key='til' className='flex grow flex-col'>
        <ol className='grid  grid-cols-1 gap-6 px-4 sm:px-8 md:grid-cols-2'>
          {metas
            .sort((right, left) => {
              const rDate = right.updatedAt || right.createdAt
              const lDate = left.updatedAt || left.createdAt
              return lDate > rDate ? 1 : -1
            })
            .map((meta) => {
              const { slug, updatedAt, createdAt } = meta
              if (!meta.published) return null

              return (
                <li
                  key={slug}
                  className='border-1 flex h-full cursor-pointer flex-col justify-between rounded-lg !bg-base-100 p-2 shadow-md transition-transform hover:scale-105 sm:p-4 '
                  onClick={() => router.push(`/blog/${slug}`)}
                >
                  <div className=''>
                    <h2 className="">{meta.title}</h2>
                  </div>
                  <div className='flex justify-end'>
                    <time className='text-secondary'>{formatDate(updatedAt || createdAt)}</time>
                  </div>
                </li>
              )
            })}
        </ol>
      </main>
      <div className='flex justify-center p-4 sm:px-8'>
        <Anchor
          newWindow
          href='https://github.com/neotan/npmhub/tree/master/apps/me/content'>
          <FiEdit className='h-7 w-7 cursor-pointer stroke-secondary/50 hover:stroke-primary' />
        </Anchor>
      </div>
    </DefaultLayout>
  )
}

export async function getStaticProps({ params }) {
  //@ts-ignore
  const metas = values(deserialize(postFiles)).map(({ meta }) => meta)
  return {
    props: {
      metas
    }
  }
}
