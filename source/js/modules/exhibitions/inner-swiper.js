import Swiper from '../../vendor/swiper';
import {resizeObserver} from '../../utils/observers.js';

export default class InnerSwiper {
  constructor(container) {
    if (!container) {
      return;
    }

    this.container = container;
    this.wrapper = this.container.querySelector('[data-swiper="wrapper"]');
    this.slides = this.container.querySelectorAll('[data-swiper="slide"]');

    this.swiper = null;
    this.set = this.set.bind(this);
  }

  toggle() {
    this.container.classList.toggle('swiper');
    this.wrapper.classList.toggle('swiper-wrapper');
    this.slides.forEach((item) => {
      item.classList.toggle('swiper-slide');
    });
  }

  create() {
    if (this.swiper) {
      return;
    }

    this.toggle();

    this.swiper = new Swiper(this.container, {
      autoHeight: true,
      loop: false,
      navigation: {
        nextEl: '.inner-slider__toggle--next',
        prevEl: '.inner-slider__toggle--previous',
        disabledClass: 'inner-slider__toggle--disabled',
      },
    });
  }

  remove() {
    if (!this.swiper) {
      return;
    }

    this.toggle();

    this.swiper.destroy();
    this.swiper = null;
  }

  set() {
    const isDesktop = window.matchMedia('(min-width:1024px)').matches;

    if (!isDesktop) {
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
