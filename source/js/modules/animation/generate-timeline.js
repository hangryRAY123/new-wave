import {gsap} from '../../vendor/gsap/gsap.min.js';
import {ScrollTrigger} from '../../vendor/gsap/scroll-trigger.min.js';
import {pageScroller} from '../../utils/page-scroller';

const getMaxWidth = (blocks) => {
  let maxWidth = 0;
  blocks.forEach((block) => {
    maxWidth += block.offsetWidth;
  });
  return maxWidth;
};

const getObjectFromString = (str) => {
  if (str.indexOf('clipPath') !== -1) {
    const arr = str.split(':');
    return {clipPath: arr[1]};
  }
  return str.split(',')
      .map((keyVal) => {
        return keyVal
            .split(':')
            .map((_) => _.trim());
      })
      .reduce((accumulator, currentValue) => {
        accumulator[currentValue[0]] = isNaN(Number(currentValue[1])) ? currentValue[1] : Number(currentValue[1]);
        return accumulator;
      }, {});
};

const getAnimationObject = (el) => {
  const obj = {};
  obj.element = el;
  obj.direction = el.dataset.animationDirection;
  obj.duration = +el.dataset.animationDuration || 1;
  obj.delay = +el.dataset.animationDelay || 0;
  obj.position = el.dataset.position;
  obj.animation = getObjectFromString(el.dataset.animation.toString());
  return obj;
};

export const generateTimeline = () => {
  const sections = document.querySelectorAll('[data-section-animation]');
  sections.forEach((section) => {
    const blocks = gsap.utils.toArray(section.querySelectorAll('[data-animation]')).sort((a, b) => {
      const aIndex = +a.dataset.index || 1;
      const bIndex = +b.dataset.index || 1;
      return aIndex - bIndex;
    });

    const tl = window.gsap.timeline({
      scrollTrigger: {
        scroller: pageScroller(),
        trigger: section,
        start: section.dataset.start,
        end: section.hasAttribute('data-end') ? section.dataset.end : () => `+=${getMaxWidth(blocks)}`,
        scrub: section.dataset.scrub ? Number(section.dataset.scrub) : 1.5,
        pin: section.hasAttribute('data-pin') ? true : false,
        pinSpacing: section.hasAttribute('data-pin-spacing') ? true : false,
      },
    });

    blocks.forEach((block) => {
      const obj = getAnimationObject(block);
      const direction = obj.direction || 'to';

      if (obj.position) {
        tl[direction](obj.element, Object.assign({duration: obj.duration, delay: obj.delay}, obj.animation), obj.position);
      } else {
        tl[direction](obj.element, Object.assign({duration: obj.duration, delay: obj.delay}, obj.animation));
      }
    });

    ScrollTrigger.refresh();
  });
};
