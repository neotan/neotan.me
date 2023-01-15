import type { NextSeoProps } from 'next-seo';
import pkgJson from './package.json'

const TITLE = `Neo Tan's website`
const DESCRIPTION = pkgJson.description
const URL = pkgJson.homepage

export const NEXT_SEO_DEFAULT: NextSeoProps = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: URL,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${URL}/images/avatar-icon.png`,
        width: 800,
        height: 600,
        alt: DESCRIPTION,
        type: 'image/png',
        secureUrl: `${URL}/images/avatar-icon.png`,
      },
    ],
    siteName: TITLE,
  }
};