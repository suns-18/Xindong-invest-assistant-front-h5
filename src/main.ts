import { createApp } from 'vue'
import 'vant/lib/index.css';
import App from './App.vue'
import router from "./ts/router.ts";

createApp(App)
    .use(router)
    .mount('#app')
