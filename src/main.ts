import { createApp } from 'vue'
import { createI18n } from '@/lib/i18n'
import App from '@/App.vue'
import router from '@/router'
import Notifications from '@kyvg/vue3-notification'
import '@/styles/application.css'
import { loadApplicationSettings, initApplicationSettings } from '@/composables/useApplicationSettings';
import { isMobile } from '@/lib/functions';
import vLongpress from '@/directives/vLongpress'
import vSwipe from './directives/vSwipe'
loadApplicationSettings()
    .then((as) => {
        console.log(as.isDrawerOpen);
        const app = createApp(App, { IsDrawerOpen: as.isDrawerOpen });
        const im = isMobile()
        app.config.globalProperties.$isMobile = im;
        app.provide('$isMobile', im);
        const i18n = createI18n()
        app.use(router)
        app.use(i18n)
        app.use(Notifications)
        app.directive('longpress', vLongpress);
        app.directive('swipe', vSwipe);
        app.mount('#app')
    });
