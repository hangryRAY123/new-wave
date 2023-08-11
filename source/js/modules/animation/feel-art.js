import {gsap} from '../../vendor/gsap/gsap.min.js';

export const initFeelArt = () => {
  const parallaxItem = document.querySelector('[data-parallax-mouse]');
  const parallaxArt = document.querySelector('[data-parallax-art]');

  if (!parallaxArt) {
    return;
  }

  let mouseCords = {
    x: 0,
    y: 0,
  };

  const handleMouseMove = (e) => {
    mouseCords.x = e.clientX - window.innerWidth / 2;
    mouseCords.y = e.clientY - window.innerHeight / 2;
  };

  const handleMouseOut = () => {
    mouseCords.x = 0;
    mouseCords.y = 0;
  };

  parallaxArt.addEventListener('mousemove', handleMouseMove);
  parallaxArt.addEventListener('mouseout', handleMouseOut);

  const updateParallax = () => {
    const movement = parallaxItem.dataset.movement
      ? parallaxItem.dataset.movement
      : 1;

    gsap.to(parallaxItem, {
      x: mouseCords.x / movement,
      y: mouseCords.y / movement,
      duration: parallaxItem.dataset.duration
        ? parallaxItem.dataset.duration
        : 0.5,
      ease: 'power3.out',
    });
  };

  gsap.ticker.add(updateParallax);
};
