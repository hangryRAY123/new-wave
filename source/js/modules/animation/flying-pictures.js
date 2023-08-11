import {gsap} from '../../vendor/gsap/gsap.min.js';
import {ScrollTrigger} from '../../vendor/gsap/scroll-trigger.min.js';

export const initFlyingPictures = () => {
  const section = document.querySelector('[data-section-animation="flying-pictures"]');
  if (section !== null) {
    const tween = gsap.timeline({defaults: {ease: 'sine.inOut'}, paused: true});
    tween
        .to('[data-animation="palm"]', {yPercent: 220})
        .to('[data-animation="bust"]', {yPercent: -100}, '<');
    ScrollTrigger.create({
      trigger: '[data-section-animation="flying-pictures"]',
      start: 'clamp(top bottom)',
      end: 'clamp(bottom top)',
      scrub: true,
      animation: tween,
    });
  }
};
