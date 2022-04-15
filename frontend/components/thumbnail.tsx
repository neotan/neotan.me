import {forwardRef} from 'react'
import Image from 'next/image'
import {ThumbUpIcon} from '@heroicons/react/outline'
import {MovieListObject} from '../types'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/'

const Thumbnail = forwardRef<HTMLInputElement, MovieListObject>(
  (props, forwardedRef) => {
    const {
      id,
      overview,
      release_date,
      adult,
      backdrop_path,
      vote_count,
      vote_average,
      original_language,
      original_title,
      poster_path,
      video,
      title,
      popularity,
      genre_ids,
    } = props

    const imgUrl =
      `${IMAGE_BASE_URL}${backdrop_path}` || `${IMAGE_BASE_URL}${poster_path}`

    return (
      <figure
        ref={forwardedRef}
        title={title}
        className="group transform cursor-pointer p-2 transition hover:z-50 sm:hover:scale-105"
      >
        <Image
          layout="responsive"
          alt={title}
          src={imgUrl}
          height={1080}
          width={1920}
        />
        <footer className="p-2">
          <figcaption className="max-w-md truncate">{overview}</figcaption>
          <h2 className="duration-50 mt-1 text-2xl text-white transition-all ease-in-out group-hover:font-bold">
            {title || original_title}
          </h2>
          <div className="flex items-center opacity-0 group-hover:opacity-100">
            <time>{release_date}</time>
            <i className="mx-2">•</i>
            <ThumbUpIcon className="mr-1 h-5" />
            {vote_count}
          </div>
        </footer>
      </figure>
    )
  },
)

Thumbnail.displayName = 'Thumbnail'
export default Thumbnail
