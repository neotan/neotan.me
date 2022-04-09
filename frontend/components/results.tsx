import FlipMove from "react-flip-move"
import Thumbnail from "./thumbnail"
import { MovieListObject } from "../types"

type ResultProps = {
  results: MovieListObject[];
};

function Results({ results }: ResultProps) {
  return (
    <FlipMove className="flex-wrap justify-center px-5 my-10 sm:grid md:grid-cols-2 xl:grid-cols-3 3xl:flex">
      {results.map((movie) => {
        return <Thumbnail key={movie.id} {...movie} />
      })}
      <div />
    </FlipMove>
  )
}

export default Results
