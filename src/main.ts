import { createApp } from 'vue'
import App from './App.vue'
import Layout from "./layouts/Layout.vue";
import router from './plugins/router'
import "./assets/tailwind.css"

createApp(App)
  .component('Layout', Layout)
  .use(router)
  .mount('#app')
