import { RefObject, useEffect } from 'react';

export function useMagneticHover<T extends HTMLElement>(
  ref: RefObject<T>,
  strength = 0.3
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let animating = false;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;

      if (!animating) {
        animating = true;
        animate();
      }
    };

    const onMouseLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    const animate = () => {
      currentX = lerp(currentX, mouseX, 0.1);
      currentY = lerp(currentY, mouseY, 0.1);
      el.style.transform = `translate(${currentX * strength}px, ${
        currentY * strength
      }px)`;

      if (
        Math.abs(currentX - mouseX) > 0.1 ||
        Math.abs(currentY - mouseY) > 0.1
      ) {
        requestAnimationFrame(animate);
      } else {
        animating = false;
      }
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [ref, strength]);
}
