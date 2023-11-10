import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from '@vant/auto-import-resolver';


export default {
    plugins: [
        vue(),
        Components({
            resolvers: [
                VantResolver(),],
        }),
    ],
    server: {
        proxy: {
            '/api': {
                target: "http://localhost:8099",
                changeOrigin: true,
                cookiePathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};