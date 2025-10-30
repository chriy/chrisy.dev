import {defineConfig} from 'astro/config';
import tailwindcss from '@tailwindcss/vite'
import react from "@astrojs/react";
// https://astro.build/config
export default defineConfig({
    site: 'https://chrisy.dev',
    server: {
        port: 3000
    },
    plugins: [
        tailwindcss(),
        "@tailwindcss/postcss",
    ],
    integrations: [react()]
});