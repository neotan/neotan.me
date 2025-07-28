export default function SearchIcon({
  width = 24,
  height = 24,
  title = 'Search',
  className,
  ...restProps
}: { width?: number; height?: number; title?: string; className?: string }) {
  return (
    <svg className={className} fill="none" height={height} viewBox="0 0 24 24" width={width} {...restProps}>
      <title>{title}</title>
      <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 12.7543 18.1045 14.9163 16.5104 16.5104C14.9163 18.1045 12.7543 19 10.5 19C8.24566 19 6.08365 18.1045 4.48959 16.5104C2.89553 14.9163 2 12.7543 2 10.5C2 8.24566 2.89553 6.08365 4.48959 4.48959C6.08365 2.89553 8.24566 2 10.5 2C12.7543 2 14.9163 2.89553 16.5104 4.48959C18.1045 6.08365 19 8.24566 19 10.5V10.5Z" strokeLinecap="round" strokeWidth="2" />
    </svg>
  )
}
