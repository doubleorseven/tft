import { createApp } from 'vue'
import { createI18n } from '@/lib/i18n'
import App from './App.vue'
import router from './router'
import Notifications from '@kyvg/vue3-notification'
import '@/styles/application.css'
import { loadApplicationSettings } from '@/composables/useApplicationSettings';
import { isMobile } from '@/lib/functions';
loadApplicationSettings()
    .then((as) => {
        const app = createApp(App);
        const im = isMobile()
        app.config.globalProperties.$isMobile = im;
        app.provide('$isMobile', im);
        const i18n = createI18n()
        app.use(router)
        app.use(i18n)
        app.use(Notifications)
        app.directive('longpress', (el, binding) => {

            let pressTimer: number = 0;

            const start = (e: any) => {
                if (e.type === 'click' && e.button !== 0) {
                    return
                }

                if (pressTimer === 0) {
                    pressTimer = setTimeout(() => {
                        handler(e)
                    }, 1000)
                }
            }

            // Cancel Timeout
            const cancel = () => {
                if (pressTimer !== null) {
                    clearTimeout(pressTimer)
                    pressTimer = 0
                }

            }
            // Run Function
            const handler = (e: any) => {
                binding.value(e)
            }

                ;['mousedown', 'touchstart'].forEach(e => {
                    el.addEventListener(e, start, { passive: true })
                })

                ;['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => {
                    el.addEventListener(e, cancel, { passive: true })
                })

        });
        app.mount('#app')
    });
