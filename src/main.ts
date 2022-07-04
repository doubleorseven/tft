import { createApp } from 'vue'
import { createI18n } from '@/lib/i18n'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import '@/styles/application.css'
import { initApplicationSettings, loadApplicationSettings } from '@/composables/useApplicationSettings';
import { isMobile } from '@/lib/functions';
loadApplicationSettings()
    .then((as) => {
        const app = createApp(App)
        app.config.globalProperties.$isMobile = isMobile();
        const i18n = createI18n()
        app.use(router)
        app.use(i18n)
        app.use(Notifications)
        app.mount('#app')
    });
