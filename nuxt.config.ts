import * as fs from 'fs'
import * as path from 'path'
// https://nuxt.com/docs/guide/concepts/esm#default-exports
import { isProduction } from 'std-env'
// import { VitePWA } from 'vite-plugin-pwa'
import { variables as constants } from './app/constants'
import pkg from './package.json'

/**
 *
 * copy asset files to public folder
 *
 */

// clean the 'article' folder (copy from the 'content' folder) first
const cleanContentFiles = (...folderPathArr:string[]) => {
  folderPathArr.forEach((folderPath) => {
    const exists = fs.existsSync(folderPath)
    if (exists) {
      fs.rmSync(folderPath, { recursive: true })
    }
  })
}

// then copy all other type of files except .md from 'content' folder to public folder
// so all the assets can link to inside the markdown file by relative path
const copyContentFiles = (src:string, destFolderName:string, ignore:string[] = []) => {
  // url isn't case-sensitive but folder name is case-sensitive
  // change all the folders name to lowercase when copy them to public
  const dest = destFolderName.toLowerCase()

  const exists = fs.existsSync(src)
  const stats = exists && fs.statSync(src)
  const isDirectory = exists && stats.isDirectory()
  if (isDirectory) {
    if (!fs.existsSync(dest) || !fs.statSync(src).isDirectory()) {
      fs.mkdirSync(dest)
    }
    fs.readdirSync(src).forEach((childItemName:string) => {
      copyContentFiles(
        path.join(src, childItemName),
        path.join(dest, childItemName),
        ignore
      )
    })
  } else {
    const ext = path.extname(src)
    if (!ignore.includes(ext)) {
      fs.copyFileSync(src, dest)
    }
  }
}

cleanContentFiles('public/article')
copyContentFiles('content', 'public', ['.md', '.json', '.csv'])

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // https://content.nuxtjs.org
  content: {
    navigation: {
      fields: ['_id', '_type', 'series', 'tags']
    },
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'one-dark-pro',
      // check out https://content.nuxtjs.org/api/configuration#highlightpreload for the default preload languages
      // check out https://github.com/shikijs/shiki/blob/main/docs/languages.md for the available program language
      preload: ['vue', 'python']
    },
    markdown: {
      toc: {
        depth: 5,
        searchDepth: 5
      },
      remarkPlugins: ['remark-math', 'remark-sub', 'remark-super', 'remark-critic-markup'],
      rehypePlugins: {
        'rehype-katex': {
          output: 'htmlAndMathml'
        }
      }
    }
  },
  typescript: {
    shim: false,
    strict: false,
    typeCheck: true
  },
  css: [
    '~/assets/style.css'
  ],
  app: { head: { /* app.vue */ } },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt'
  ],
  nitro: {
    prerender: {
      routes: ['/rss.xml', '/sitemap.xml', '/']
    }
  },
  vite: {
    plugins: [
      // VitePWA({ }) // testing between "pwa: { * }" and "VitePWA({ * })"
    ]
  },
  pwa: {
    manifest: false, // public/manifest.webmanifest
    strategies: 'generateSW',
    injectRegister: 'auto',
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: '/',
      globPatterns: ['**/*.{js,css,html,json,md,svg,webp,ico,png,jpg}'],
      globIgnores: ['google*.html'],
      cleanupOutdatedCaches: true,
      runtimeCaching: [
        {
        // urlPattern: /^https:\/\/kirkepostille.vercel\.app\/.*/i, // not working
          urlPattern: ({ url }) => { return url.pathname.startsWith('/api') },
          handler: 'CacheFirst' as const,
          options: {
            cacheName: 'api-cache',
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        },
        { // source: https://vite-pwa-org.netlify.app/workbox/generate-sw.html
          handler: 'NetworkOnly',
          urlPattern: /\/api\/.*\/*.json/,
          method: 'POST',
          options: {
            backgroundSync: {
              name: 'backgroundsync',
              options: {
                maxRetentionTime: 24 * 60
              }
            }
          }
        }
      ]
    },
    devOptions: {
      enabled: true,
      navigateFallback: '/'
    },
    client: {
      installPrompt: true,
      periodicSyncForUpdates: 300 // per 5 min for testing only
    }
  },
  runtimeConfig: {
    rss: {
      title: constants.title.home,
      description: constants.description.home,
      image: `${pkg.homepage}${constants.site.avatar}`,
      favicon: `${pkg.homepage}${constants.site.favicon}`,
      copyright: `All rights reserved ${(new Date()).getFullYear()}, ${constants.site.author}`
    },
    public: {
      hostname: pkg.homepage,
      production_mode: isProduction,
      gtag_id: `G-${process.env.GTAG_ID}`
    }
  }
})
