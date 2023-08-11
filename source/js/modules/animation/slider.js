import Swiper from '../../vendor/swiper';

export class Slider {
  constructor() {
    this.slider = null;
  }

  init() {
    this.slider = new Swiper('.mySwiper', {
      speed: 800,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
      },
    });
  }
}

