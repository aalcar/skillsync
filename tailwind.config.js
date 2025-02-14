
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

module.exports = {
    content: [
        "./src/**/*/.{js, jsx, ts, tsx",
    ],
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
}

/*
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
*/
