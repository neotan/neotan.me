
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


export const INSIGHTS = [
  {
    imgUrl: '/images/planet-06.png',
    title: 'The launch of the Metaverse makes Elon musk ketar-ketir',
    subtitle:
      'Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Diam maecenas sed enim ut sem viverra alique.',
  },
  {
    imgUrl: '/images/planet-07.png',
    title: '7 tips to easily master the madness of the Metaverse',
    subtitle:
      'Vitae congue eu consequat ac felis donec. Et magnis dis parturient montes nascetur ridiculus mus. Convallis tellus id interdum',
  },
  {
    imgUrl: '/images/planet-08.png',
    title: 'With one platform you can explore the whole world virtually',
    subtitle:
      'Quam quisque id diam vel quam elementum. Viverra nam libero justo laoreet sit amet cursus sit. Mauris in aliquam sem',
  },
];