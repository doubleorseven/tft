import { ref } from "vue";
const vSwipe = (el: any, binding: any) => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleGesture = () => {
        if (touchEndX < touchStartX) {
            binding.value('LEFT');
        }

        if (touchEndX > touchStartX) {
            binding.value('RIGHT');
        }
        touchStartX = 0;
        touchEndX = 0;
    }
    const start = (event: TouchEvent) => {
        touchStartX = event.changedTouches[0].screenX;
    };
    const end = (event: TouchEvent) => {
        touchEndX = event.changedTouches[0].screenX;
        handleGesture();
    }
    el.addEventListener('touchstart', start, { passive: true });
    el.addEventListener('touchend', end, { passive: true });
    el.addEventListener('touchcancel', end, { passive: true });
};

export default vSwipe;