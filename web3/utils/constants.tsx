
export interface World {
  id: WorldId
  imgUrl: string
  title: string
}

export const EXPLORE_WORLDS = [
  {
    id: 'world1',
    imgUrl: '/images/planet-01.png',
    title: 'The Hogwarts',
  },
  {
    id: 'world2',
    imgUrl: '/images/planet-02.png',
    title: 'The Upside Down',
  },
  {
    id: 'world3',
    imgUrl: '/images/planet-03.png',
    title: 'Kadirojo Permai',
  },
  {
    id: 'world4',
    imgUrl: '/images/planet-04.png',
    title: 'Paradise Island',
  },
  {
    id: 'world5',
    imgUrl: '/images/planet-05.png',
    title: 'Hawkins Labs',
  }
] as const

export type WorldId = typeof EXPLORE_WORLDS[number]['id']
