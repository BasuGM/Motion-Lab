# Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 16 App Router |
| UI | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Primitives | shadcn/ui on Radix, restyled |
| State | Zustand for compare selection and the studio |
| Forms | React Hook Form and Zod in the studio inspector |
| Animation | `motion`, `gsap`, `@gsap/react`, `@react-spring/web`, `lottie-react`, `@formkit/auto-animate` |
| Charts | Recharts through the shadcn chart primitive |
| Unit tests | Vitest and React Testing Library |
| End to end | Playwright |

Cache Components and the React Compiler are off. Animation work is client-side and does not benefit from `use cache`.

Package manager is pnpm. The dev server uses Turbopack.
