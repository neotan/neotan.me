
export interface World {
  id: string
  imgUrl: string
  title: string
}

export type WorldId = keyof typeof EXPLORE_WORLDS

export const EXPLORE_WORLDS = {
  'world1': {
    id: 'world1',
    imgUrl: '/images/planet-01.png',
    title: 'The Hogwarts',
  },
  'world2': {
    id: 'world2',
    imgUrl: '/images/planet-02.png',
    title: 'The Upside Down',
  },
  'world3': {
    id: 'world3',
    imgUrl: '/images/planet-03.png',
    title: 'Kadirojo Permai',
  },
  'world4': {
    id: 'world4',
    imgUrl: '/images/planet-04.png',
    title: 'Paradise Island',
  },
  'world5': {
    id: 'world5',
    imgUrl: '/images/planet-05.png',
    title: 'Hawkins Labs',
  },
}