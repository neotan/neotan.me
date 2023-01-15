> ℹ This repo is now managed by my private Turborepo instance, but it's still being updated if any and stay public for your reference my friends 🙂. Let me know if you are interested in any part of it. Happy coding!🍻

My a bit over-engineering website to share my thoughts, translations and
products for fun.

## Features

To be completed...

## Todos

- [x] setup overall theme
  - [x] dark/light mode theming toggle
- [x] add footer
- [x] add single post displaying
- [x] add posts listing
- [x] add MDX files compilation with mdx-bundler
- [x] integrate cloudinary image service
  - [x] migrate all images to cloudinary
- [x] add site-wide full-text search, by Fuse.js
- [x] add site-wide animation with framer-motion
  - [x] Home page
  - [x] Dark mode toggle button
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

1. **Put classNames inline**. Because I'm leveraging the fantastic
   [🧙‍♂️TailwindCSS 3](https://tailwindcss.com/) to style the site, and
   [✨Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
   for VS Code's AutoComplete, they only work with **inline** classNames
   perfectly so far.