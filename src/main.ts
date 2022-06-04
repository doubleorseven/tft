import { createApp } from 'vue'
import { createI18n } from '@/lib/i18n'
import App from './App.vue'
import router from './router'

import '@/styles/application.css'

const app = createApp(App)
const i18n = createI18n()
app.use(router)
app.use(i18n)
app.mount('#app')
