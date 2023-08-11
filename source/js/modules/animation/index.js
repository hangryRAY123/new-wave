import {generateTimeline} from './generate-timeline';
import {Slider} from './slider';
import {initArt} from './art';
import {initFeelArt} from './feel-art';
import {initFlyingPictures} from './flying-pictures';
import ImageCard from './image-card';

const imageCardContainer = document.querySelector('[data-image-card]');

export const initAnimationModules = () => {
  const slider = new Slider();
  slider.init();
  initArt();
  initFeelArt();
  initFlyingPictures();
  generateTimeline();

  const imageCard = new ImageCard(imageCardContainer);
  imageCard.init();
};
