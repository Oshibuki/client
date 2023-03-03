import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import inject from "@rollup/plugin-inject";
import { viteMockServe } from 'vite-plugin-mock'
// import Icons from 'unplugin-icons/vite'
// import AutoImport from 'unplugin-auto-import/vite'
// import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'



const localEnabled = process.env.USE_MOCK || false;
const prodEnabled = process.env.USE_CHUNK_MOCK || false;

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
        plugins: [
            inject({   // => that should be first under plugins array
                $: 'jquery',
                jQuery: 'jquery',
            }),
            vue(),
            viteMockServe({
                // 只在开发阶段开启 mock 服务
                mockPath: "./src/mock",
                supportTs: false,
                localEnabled: localEnabled, // 开发打包开关
                prodEnabled: prodEnabled, // 生产打包开关
                // 这样可以控制关闭mock的时候不让mock打包到最终代码内
            }),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
              '/api/user/login': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false,
                ws:true
              }
            }
          }
    }
})
