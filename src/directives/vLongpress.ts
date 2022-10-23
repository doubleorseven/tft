import { notify } from '@kyvg/vue3-notification';

const vLongpress = (el: any, binding: any) => {

    let pressTimer: number = 0;

    const start = (e: any) => {
        if (e.type === 'click' && e.button !== 0) {
            return;
        }

        if (pressTimer === 0) {
            pressTimer = setTimeout(() => {
                handler(e);
            }, 1000)
        }
    }

    // Cancel Timeout
    const cancel = () => {
        if (pressTimer !== null) {
            clearTimeout(pressTimer);
            pressTimer = 0;
            notify({
                type: "notification-warning",
                title: `long press to delete`,
            });
        }

    }
    // Run Function
    const handler = (e: any) => {
        binding.value(e);
    }

        ;['mousedown', 'touchstart'].forEach(e => {
            el.addEventListener(e, start, { passive: true })
        });

    ;['click', 'touchend', 'touchcancel'].forEach(e => {
        el.addEventListener(e, cancel, { passive: true })
    });

};

export default vLongpress;