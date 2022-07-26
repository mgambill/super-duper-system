import { createApp } from 'vue'

import "./assets/tailwind.css"

import App from './App.vue'
import Layout from "./layouts/Layout.vue";
import router from './plugins/router'
import { useFields } from './fields/components'

createApp(App)
  .component('Layout', Layout)
  .use(useFields)
  .use(router)
  .mount('#app')
