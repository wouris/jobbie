import {fileURLToPath, URL} from 'url';
import svgLoader from 'vite-svg-loader';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    app: {
        head: {
            title: 'Jobbie',
            link: [
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico',
                },
            ],
        },
    },
    modules: [
        '@pinia/nuxt',
        '@nuxt/devtools',
        '@nuxtjs/color-mode',
        'nuxt-icon'
    ],
    vite: {
        resolve: {
            alias: {
                '~': fileURLToPath(new URL('./', import.meta.url)),
            },
        },
        plugins: [svgLoader()],
        test: {
            include: ['tests/*.test.ts'],
        },
    },
    css: [
        '~/assets/styles/css/main.css',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    colorMode: {
        classSuffix: '',
        storageKey: 'theme'
    },
});
