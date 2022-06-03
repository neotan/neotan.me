export default function Spinner() {
  return (
    <span className="absolute flex h-20 w-20 items-center justify-center">
      <span className="bg-secondary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
      <span className="bg-secondary absolute inline-flex h-10 w-10 animate-ping rounded-full opacity-75" />
      <span className="bg-secondary relative inline-flex h-5 w-5 rounded-full" />
    </span>
  )
}
