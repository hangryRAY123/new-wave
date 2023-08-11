import {gsap} from '../vendor/gsap/gsap.min.js';

export class Preloader {
  constructor() {
    this.body = document.querySelector('body');
    this.container = document.querySelector('[data-preloader]');
    this.animationElement = document.querySelector('[data-preloader="preloader-icon"] svg');

    this.event = new Event('loaderOff');
    this.pageLoaded = false;

    this.off = this.off.bind(this);
  }

  on() {
    this.body.classList.add('scroll-lock');
    if (this.container) {
      this.setAnimation();
      window.addEventListener('load', () => {
        this.pageLoaded = true;
      });
    } else {
      this.body.classList.remove('scroll-lock');
      window.addEventListener('load', this.off());
    }
  }

  off() {
    window.dispatchEvent(this.event);
    this.pageLoaded = true;
  }

  init() {
    window.scrollTo(0, 0);
    this.on();
    window.addEventListener('load', this.off());
  }

  setAnimation() {
    this.timeline = gsap.timeline({
      repeat: -1,
      onRepeat: () => {
        this.hide();
      },
    });

    this.timeline.addLabel('start');
    this.timeline.to(this.animationElement, {scaleX: 1.5, duration: 2}, 'start');
    this.timeline.to(this.animationElement, {scaleX: 1, duration: 2});
    this.timeline.addLabel('loaderBackToRegularSize');
    this.timeline.to(this.animationElement, {rotate: -180, duration: 2}, 'loaderBackToRegularSize');
  }

  hide() {
    if (!this.pageLoaded) {
      return;
    }

    this.timeline.pause();
    const timeline = gsap.timeline();
    timeline
        .then(() => this.container.classList.add('is-hidden'))
        .then(() => this.body.classList.remove('scroll-lock'))
        .then(() => this.off());
  }
}
