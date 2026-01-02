import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollToSection(targetId: string, duration = 700) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const start = window.scrollY;
  const end = target.getBoundingClientRect().top + start;
  const distance = end - start;
  const startTime = performance.now();

  // smooth but not cinematic
  const easeOut = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function step(time: number) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);

    window.scrollTo(0, start + distance * easeOut(progress));

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}
