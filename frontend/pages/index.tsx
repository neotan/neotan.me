import TopNav from '../components/top-nav'
import Layout from './../components/layout'
import Results from '../components/results'
import requests from './../shared/request'
import {CardsForDev} from './../components/article-card'

export default function Home() {
  return (
    <Layout>
      <CardsForDev />
    </Layout>
  )
}

// export async function getServerSideProps(context) {
//   const genre = context.query.genre

//   const {results} = await fetch(
//     `https://api.themoviedb.org/3${
//       requests[genre]?.url || requests.fetchTopRated.url
//     }`,
//   )
//     .then(res => res.json())
//     .catch(err => console.error(err))

//   return {
//     props: {
//       results,
//     },
//   }
// }
