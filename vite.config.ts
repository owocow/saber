import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
// import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
// import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { defineConfig, loadEnv } from 'vite'
import { createViteProxy, getBuildTime } from './build'

export default defineConfig(configEnv => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as unknown as Env.ImportMeta
  const buildTime = getBuildTime()
  const enableProxy = configEnv.command === 'serve' && !configEnv.isPreview
  return {
    base: viteEnv.VITE_BASE_URL || '/',
    define: {
      BUILD_TIME: JSON.stringify(buildTime),
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            '@/store/modules/app': ['useAppStore'],
            '@unhead/vue': ['useHead'],
          },
        ],
        dts: 'auto-imports.d.ts',
        vueTemplate: true,
      }),
      Components({
        dts: 'components.d.ts',
        resolvers: [
          ElementPlusResolver({ importStyle: 'sass' }),
          // IconsResolver({
          //   enabledCollections: ['ep', 'solar', 'material-symbols-light'],
          // }),
        ],
      }),
      // Icons({
      //   compiler: 'vue3',
      //   autoInstall: true,
      // }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css: {
      preprocessorMaxWorkers: true,
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/styles/element/index.scss" as *;`,
        },
      },
    },
    preview: {
      port: 9725,
    },
    server: {
      host: '0.0.0.0',
      port: 8084,
      open: true,
      proxy: createViteProxy(viteEnv, enableProxy),
    },
  }
})
