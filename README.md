My portfolio to share my thoughts, translations and products for fun.

## Todos

- [x] setup overall theme
  - [x] dark/light mode theming toggle
- [x] add footer
- [x] add single post displaying
- [x] add posts listing
- [ ] add site-wide animation with framer-motion
  - [ ] Home page
  - [ ] Showcase page
- [x] add code highlight
- [ ] SEO, sitemap.xml

## Trade-offs

As you may have seen, there is a few "Anti-patterns" code in the application,
but believe me, they are reasonable in the context of such scale, like:

1. **Put related components in a single .tsx file**. Which is following the
   practices:

   1. [💡Colocation](https://kentcdodds.com/blog/colocation) by
      [Kent C. Dodds](https://kentcdodds.com/about) and
   1. [💡Optimization Principle](https://www.laws-of-software.com/laws/knuth/) by [Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth)
      
      > Premature optimization is the root of all evil. -- Donald Knuth, 1974
