import type { World, Insight, NewFeature, SocialLink } from '../_types'

export const EXPLORE_WORLDS: readonly World[] = [
  {
    id: 'world1',
    imgUrl: '/web3-images/planet-01.png',
    title: 'The Hogwarts',
    description: 'Enter the magical world of wizardry and wonder',
  },
  {
    id: 'world2',
    imgUrl: '/web3-images/planet-02.png',
    title: 'The Upside Down',
    description: 'Explore the mysterious parallel dimension',
  },
  {
    id: 'world3',
    imgUrl: '/web3-images/planet-03.png',
    title: 'Kadirojo Permai',
    description: 'Discover the beauty of Indonesian paradise',
  },
  {
    id: 'world4',
    imgUrl: '/web3-images/planet-04.png',
    title: 'Paradise Island',
    description: 'Experience tropical bliss and adventure',
  },
  {
    id: 'world5',
    imgUrl: '/web3-images/planet-05.png',
    title: 'Hawkins Labs',
    description: 'Uncover the secrets of scientific experiments',
  },
] as const

export const INSIGHTS: readonly Insight[] = [
  {
    id: 'insight-1',
    imgUrl: '/web3-images/planet-06.png',
    title: 'The launch of the Metaverse makes Elon musk ketar-ketir',
    subtitle:
      'Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Diam maecenas sed enim ut sem viverra alique.',
    readTime: '5 min read',
  },
  {
    id: 'insight-2',
    imgUrl: '/web3-images/planet-07.png',
    title: '7 tips to easily master the madness of the Metaverse',
    subtitle:
      'Vitae congue eu consequat ac felis donec. Et magnis dis parturient montes nascetur ridiculus mus. Convallis tellus id interdum',
    readTime: '8 min read',
  },
  {
    id: 'insight-3',
    imgUrl: '/web3-images/planet-08.png',
    title: 'With one platform you can explore the whole world virtually',
    subtitle:
      'Quam quisque id diam vel quam elementum. Viverra nam libero justo laoreet sit amet cursus sit. Mauris in aliquam sem',
    readTime: '6 min read',
  },
] as const

export const NEW_FEATURES: readonly NewFeature[] = [
  {
    id: 'feature-1',
    imgUrl: '/web3-images/vrpano.svg',
    title: 'A new world',
    subtitle:
      'We have the latest update with new world for you to try never mind',
  },
  {
    id: 'feature-2',
    imgUrl: '/web3-images/headset.svg',
    title: 'More realistic',
    subtitle:
      'In the latest update, your eyes are narrow, making the world more realistic than ever',
  },
] as const

export const SOCIALS: readonly SocialLink[] = [
  {
    name: 'github',
    src: '/web3-images/github.svg',
    url: 'https://github.com/neotan/neotan.me/tree/master/web3',
    ariaLabel: 'Visit our GitHub repository',
  },
  {
    name: 'twitter',
    src: '/web3-images/twitter.svg',
    url: '#',
    ariaLabel: 'Follow us on Twitter',
  },
  {
    name: 'linkedin',
    src: '/web3-images/linkedin.svg',
    url: '#',
    ariaLabel: 'Connect with us on LinkedIn',
  },
  {
    name: 'instagram',
    src: '/web3-images/instagram.svg',
    url: '#',
    ariaLabel: 'Follow us on Instagram',
  },
  {
    name: 'facebook',
    src: '/web3-images/facebook.svg',
    url: '#',
    ariaLabel: 'Like us on Facebook',
  },
] as const

export const ANIMATION_DELAYS = {
  NAV: 0.5,
  HERO: 0.2,
  SECTION: 0.1,
  CARD: 0.05,
} as const

export const BREAKPOINTS = {
  MOBILE: 640,
  TABLET: 768,
  DESKTOP: 1024,
  LARGE: 1280,
} as const 