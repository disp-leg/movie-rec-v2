"use client";
import { gsap } from "gsap";

// Register ScrollTrigger if available (dynamic import to avoid SSR issues)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ScrollTrigger: any = null;

export async function initGSAP() {
  if (typeof window === 'undefined') return;
  const mod = await import('gsap/ScrollTrigger');
  ScrollTrigger = mod.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}

// Fade in and slide up an element when it enters viewport
export function scrollFadeIn(element: HTMLElement, delay: number = 0) {
  if (!ScrollTrigger) return;
  gsap.fromTo(element,
    { opacity: 0, y: 24 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    }
  );
}

// Staggered fade-in for child elements
export function scrollStaggerIn(parent: HTMLElement, childSelector: string, stagger: number = 0.1) {
  if (!ScrollTrigger) return;
  const children = parent.querySelectorAll(childSelector);
  gsap.fromTo(children,
    { opacity: 0, y: 16 },
    {
      opacity: 1, y: 0,
      duration: 0.6,
      stagger,
      ease: "power2.out",
      scrollTrigger: {
        trigger: parent,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    }
  );
}

// Word-by-word reveal (for CollectionIntro zone)
export function wordByWordReveal(container: HTMLElement) {
  if (!ScrollTrigger) return;
  const words = container.querySelectorAll('.reveal-word');
  gsap.fromTo(words,
    { opacity: 0.25, color: '#6E6E73' },
    {
      opacity: 1, color: '#1D1D1F',
      duration: 0.4,
      stagger: 0.08,
      ease: "power1.out",
      scrollTrigger: {
        trigger: container,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 0.5,
      }
    }
  );
}

// Parallax effect for poster images
export function posterParallax(element: HTMLElement) {
  if (!ScrollTrigger) return;
  gsap.fromTo(element,
    { y: -30 },
    {
      y: 30,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
}

// Expand/collapse spring animation
export function expandSpring(element: HTMLElement) {
  gsap.fromTo(element,
    { height: 0, opacity: 0 },
    { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" }
  );
}

export function collapseSpring(element: HTMLElement) {
  return gsap.to(element, { height: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
}
