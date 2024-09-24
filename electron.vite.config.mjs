import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin, splitVendorChunkPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import postcssPluginPx2Rem from 'postcss-plugin-px2rem';

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src')
            }
        },
        plugins: [
            vue(),
            // 自动按需加载 ElementPlus 组件，降低打包体积
            AutoImport({
                resolvers: [ElementPlusResolver()]
            }),
            Components({
                resolvers: [ElementPlusResolver()]
            }),
            // 分割 Vendor Chunk
            splitVendorChunkPlugin()
        ],
        css: {
            postcss: {
                plugins: [
                    postcssPluginPx2Rem({
                        rootValue: 12.8,
                        unitPrecision: 5,
                        mediaQuery: false,
                        minPixelValue: 0
                    })
                ]
            }
        },
        server: {
            host: '172.17.17.38',
            port: 8090
        }
    }
});
