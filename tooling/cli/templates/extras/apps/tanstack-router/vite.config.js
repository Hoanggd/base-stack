import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { resolve } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tanstackRouter({ target: 'react', autoCodeSplitting: true }), react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
})
