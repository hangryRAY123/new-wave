import Splitting from '../../vendor/splitting.min.js';
import {ScrollTrigger} from '../../vendor/gsap/scroll-trigger.min.js';

export default class ImageCard {
  constructor(container) {
    if (!container) {
      return;
    }

    this.container = container;
    this.text = this.container.querySelector('[data-image-card="text"]');

    this.splitting = null;
    this.scrollTrigger = null;
  }

  create() {
    this.splitting = new Splitting({target: this.text});

    this.scrollTrigger = ScrollTrigger.create({
      trigger: this.container,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onToggle: (self) => {
        this.text.classList[self.isActive ? 'add' : 'remove']('image-card__text--splitting');
      },
    });
  }

  init() {
    if (!this.container) {
      return;
    }

    this.create();
  }
}
