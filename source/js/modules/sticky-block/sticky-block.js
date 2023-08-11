import {gsap} from '../../vendor/gsap/gsap.min.js';
import {ScrollTrigger} from '../../vendor/gsap/scroll-trigger.min.js';

export const initStickyScroll = () => {
  const stickySections = document.querySelectorAll('[data-section-animation="sticky-section"]');

  stickySections.forEach((stickySection) => {
    const stickyImg = stickySection.querySelector('[data-block-inner="sticky-inner"]');
    const header = document.querySelector('[data-header="sticky"]');
    const headerHeight = header.offsetHeight;
    const stickyTopFixed = headerHeight * 1.12;

    gsap.to(stickyImg, {top: stickyTopFixed});

    ScrollTrigger.create({
      trigger: stickySection,
      start: 'top top',
      end: 'top top',
      scrub: true,
    });
  });
};

