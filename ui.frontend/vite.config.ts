import path from 'path'
import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import analyze from 'rollup-plugin-analyzer'

import aemClientLibs from './rollup-plugins/rollup-plugin-aem-clientlibs.plugin'

const AEM_INSTANCE_URL = 'http://localhost:4502'
const AEM_PROXY_SETTINGS = {
  target: AEM_INSTANCE_URL,
  auth: 'admin:admin',
}

const CLIENTLIBS_CONTEXT = path.resolve(__dirname, 'dist')
const CLIENTLIBS_ROOT = path.resolve(
  __dirname,
  '..',
  'ui.apps',
  'src',
  'main',
  'content',
  'jcr_root',
  'apps',
  'mysite',
  'clientlibs'
)

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    aemClientLibs({
      name: 'trainingproject.app',
      clientLibRoot: CLIENTLIBS_ROOT,
      context: CLIENTLIBS_CONTEXT,
      allowProxy: true,
      verbose: true,
    }),
  ],
  resolve: {
    alias: {
      $: fileURLToPath(new URL('./src', import.meta.url)),
      $types: fileURLToPath(new URL('./src/@types', import.meta.url)),
      $components: fileURLToPath(new URL('./src/components', import.meta.url)),
      'vue': 'vue/dist/vue.esm-bundler.js',
    },
  },
  define: {
    'process.env': process.env,
  },
  server: {
    port: 3000,
    proxy: {
      '^/etc.clientlibs/.*': AEM_PROXY_SETTINGS,
      '^/etc/.*': AEM_PROXY_SETTINGS,
      '^/bin/.*': AEM_PROXY_SETTINGS,
      '^/content/dam/.*': AEM_PROXY_SETTINGS,
      '^/home/.*': AEM_PROXY_SETTINGS,
      '^/libs/.*': AEM_PROXY_SETTINGS,
      '^/jcr:content.*': AEM_PROXY_SETTINGS,
      '^/is/.*': AEM_PROXY_SETTINGS,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: ''
      },
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'),
      formats: ['iife'],
      name: 'TrainingProject',
      fileName: (format) => `training-project.${format}.js`,
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
      plugins: [
        analyze({
          summaryOnly: true,
        }),
      ],
    },
  },
})
