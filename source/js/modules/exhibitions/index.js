import InnerSwiper from './inner-swiper';
import HorizontalScroll from './horizontal-scroll';

const swiperContainer = document.querySelector('[data-swiper="swiper"]');
const scrollContainer = document.querySelector('[data-section="exhibitions"]');

export const initExhibitionsScripts = () => {
  const innerSwiper = new InnerSwiper(swiperContainer);
  innerSwiper.init();

  const horizontalScroll = new HorizontalScroll(scrollContainer);
  horizontalScroll.init();
};
