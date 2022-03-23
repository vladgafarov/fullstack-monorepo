import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { resolve } from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
   // Consult https://github.com/sveltejs/svelte-preprocess
   // for more information about preprocessors
   preprocess: preprocess(),

   kit: {
      adapter: adapter(),
      vite: {
         resolve: {
            alias: {
               $components: resolve('./src/components'),
               $ui: resolve('./src/ui'),
               $lib: resolve('./src/lib'),
               $stores: resolve('./src/stores'),
               $actions: resolve('./src/actions'),
               $api: resolve('./src/api'),
               $static: resolve('./static')
            }
         }
      }
   }
}

export default config
