import {gsap} from '../../vendor/gsap/gsap.min.js';
import {ScrollTrigger} from '../../vendor/gsap/scroll-trigger.min.js';
import {resizeObserver} from '../../utils/observers.js';

export default class HorizontalScroll {
  constructor(container) {
    if (!container) {
      return;
    }

    this.container = container;
    this.section = this.container.querySelector('[data-section="horizontal"]');
    this.sticky = this.container.querySelector('[data-section="sticky"]');
    this.content = this.container.querySelector('[data-section="content"]');

    this.tween = null;
    this.scrollTrigger = null;
    this.set = this.set.bind(this);
  }

  toggle() {
    this.section.classList.toggle('horizontal-scroll');
    this.sticky.classList.toggle('horizontal-scroll__sticky');
    this.content.classList.toggle('horizontal-scroll__content');
  }

  create() {
    if (this.tween || this.scrollTrigger) {
      return;
    }

    this.toggle();

    const contentRect = this.content.getBoundingClientRect();
    this.section.style.minHeight = contentRect.width + 'px';

    this.tween = gsap.timeline({paused: true});
    this.tween.to(this.content, {
      x: () => (-contentRect.width + (this.section.dataset.hiddenEnd ? 0 : window.innerWidth)),
      ease: 'none',
    });

    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.container,
      start: this.section.dataset.start ? this.section.dataset.start : 'top top',
      end: this.section.dataset.end ? this.section.dataset.end : 'bottom bottom',
      scrub: 1,
      animation: this.tween,
    });
  }

  remove() {
    if (!this.tween || !this.scrollTrigger) {
      return;
    }

    this.toggle();

    this.section.style.minHeight = 'auto';

    this.tween.seek(0).kill();
    this.tween = null;
    this.scrollTrigger.kill();
    this.scrollTrigger = null;
  }

  set() {
    const isDesktop = window.matchMedia('(min-width:1024px)').matches;

    if (isDesktop) {
      this.remove();
      this.create();
    } else {
      this.remove();
    }
  }

  init() {
    if (!this.container) {
      return;
    }

    this.set();
    resizeObserver.subscribe(this.set);
  }
}
