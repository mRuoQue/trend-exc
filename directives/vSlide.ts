const D = 200;
const T = 2000;
const aniMap = new WeakMap();

const isBlowViewport = (el: Element) => {
  const rect = el.getBoundingClientRect();
  const windowInner = window.innerHeight;
  return rect.top > windowInner;
};

const ob = new IntersectionObserver((entries: any[]) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = aniMap.get(entry.target);
      animation.play();
      ob.unobserve(entry.target);
    }
  }
});

export default function (app: any) {
  app.directive("slide", {
    mounted(el: Element) {
      if (!isBlowViewport(el)) {
        return;
      }
      const animation = el.animate(
        [
          {
            opacity: 0.3,
            transform: `translateY(${D}px)`,
          },
          {
            opacity: 1,
            transform: `translateY(0)`,
          },
        ],
        {
          duration: T,
        }
      );
      animation.pause();

      aniMap.set(el, animation);
      ob.observe(el);
    },
    unmounted(el: Element) {
      ob.unobserve(el);
    },
  });
}
