import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'],
            },
            gridTemplateColumns: {
                '70/30': '70% 28%',
            },
        },
    },
  plugins: [
    tailwindcss(),
  ],
})