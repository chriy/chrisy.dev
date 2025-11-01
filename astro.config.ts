import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    site: 'https://chrisy.dev',
    server: { port: 3000 },
    integrations: [react()],
    vite: {
        plugins: [tailwindcss()]
    }
});