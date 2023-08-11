import {gsap} from '../../vendor/gsap/gsap.min.js';
import {ScrollToPlugin} from '../../vendor/gsap/scroll-to.min';

const header = document.querySelector('.header');

const setOffset = (offset, padding = 0) => {
  if (offset === 'header') {
    if (!header) {
      return 0;
    }
    return header.getBoundingClientRect().height - padding;
  }

  return offset;
};

export const scrollToHandler = (e) => {
  e.preventDefault();
  const btn = e.target.closest('[data-move-to]');
  const mainElement = document.querySelector(btn.dataset.moveTo);
  const target = mainElement.closest('section.page-section');

  const styleOfTarget = window.getComputedStyle(target);
  const paddingTopOfTarget = styleOfTarget.paddingTop;

  const offset = setOffset(btn.dataset.offset, parseFloat(paddingTopOfTarget));

  const options = {
    duration: 1,
    offset: btn.dataset.offset ? offset : 0,
  };

  gsap.to(window, options.duration, {
    scrollTo: {
      y: target,
      offsetY: options.offset,
      autoKill: true,
    },
    ease: 'power4.out',
  });
};

export const initScrollTo = () => {
  gsap.registerPlugin(ScrollToPlugin);
  const scrollToButtons = document.querySelectorAll('[data-move-to]');

  scrollToButtons.forEach((btn) => {
    btn.addEventListener('click', scrollToHandler);
  });
};
