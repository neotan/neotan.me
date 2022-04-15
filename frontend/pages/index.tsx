import Head from 'next/head'
import TopNav from '../components/top-nav'
import Results from '../components/results'
import requests from './../shared/request'

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNav />
      {/* <Results results={props.results} /> */}
    </div>
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
