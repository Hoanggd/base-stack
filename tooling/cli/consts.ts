export const CLI_NAME = 'create-bs-app'
export const PROJECT_NAME = 'my-project-turbo'

export enum Stack {
    Next = 'next',
    ViteTanstackRouter = 'tanstack-router',
    ViteReactRouter = 'react-router',
}

export const STACK_CHOICES = [
    {
        id: Stack.Next,
        name: 'Next.js (App Router)',
        description: "Fullstack React framework with file-based routing, server components, and built-in SSR/SSG."
    },
    {
        id: Stack.ViteTanstackRouter,
        name: 'Vite (Tanstack Router)',
        description: "Vite-powered React app using TanStack Router for flexible, type-safe client-side routing."
    },
    // {
    //     id: Stack.ViteReactRouter,
    //     name: 'Vite (React Router)',
    //     description: "Vite-powered React app using React Router for declarative, dynamic client-side routing."
    // },
]
