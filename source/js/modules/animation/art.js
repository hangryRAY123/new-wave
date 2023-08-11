import {gsap} from '../../vendor/gsap/gsap.min.js';
import {ScrollTrigger} from '../../vendor/gsap/scroll-trigger.min.js';

export const initArt = () => {
  const imgTimeline = gsap.timeline({paused: true});

  imgTimeline.fromTo('[data-animate-img="parallax"] img',
      {yPercent: 10, scale: 1.2, duration: 2, ease: 'Power1.easeInOut'},
      {yPercent: -10, scale: 1.3, duration: 2, ease: 'Power1.easeInOut'});
  ScrollTrigger.create({
    animation: imgTimeline,
    scrub: 1,
    trigger: '[data-animate-img="parallax"] img',
    start: 'top bottom',
    end: 'bottom top',
  });
};
