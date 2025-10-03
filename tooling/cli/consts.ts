export const CLI_NAME = 'create-bs-app'
export const PROJECT_NAME = 'my-project'

export enum Stack {
    Next = 'next',
    ViteTanstackRouter = 'tanstack-router',
    ViteReactRouter = 'react-router',
}

export const STACK_CHOICES = [
    {
        id: Stack.Next,
        name: 'Next.js (App Router)',
    },
    {
        id: Stack.ViteTanstackRouter,
        name: 'Vite (Tanstack Router)',
    },
    {
        id: Stack.ViteReactRouter,
        name: 'Vite (React Router)',
    },
]
