# Showcase / Web3 landing page
> ℹ This repo is now managed by my private Turborepo instance, but it's still being updated if any and stay public for your reference my friends 🙂. Let me know if you are interested in any part of it. Happy coding!🍻

## Stack
1. Next.js 13
1. TypeScript
1. Framer Motion
1. Tailwind CSS
1. [Figma](https://www.figma.com/file/40WytyUbP7wlNAb2K9qBD6/Modern-UI%2FUX-Framer-Motion-(Copy)?node-id=1%3A4&t=iwAXvnHwus1VhfaE-1)
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
   [🧙‍♂️Tailwindcss 3](https://tailwindcss.com/) to style the site, and
   [✨Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
   for VS Code's AutoComplete, they only work with **inline** classNames
   perfectly so far.
