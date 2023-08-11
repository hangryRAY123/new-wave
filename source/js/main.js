import {iosVhFix} from './utils/ios-vh-fix';
import {burger} from './modules/burger-menu/burger';
import {initScrollTo} from './modules/burger-menu/scroll-to';
import {StickyHeader} from './modules/sticky-header/sticky-header';
import {initAnimationModules} from './modules/animation/index';
import {initExhibitionsScripts} from './modules/exhibitions/index';
import {Preloader} from './modules/preloader';
import {createMap} from './modules/map/map';
import {initStickyScroll} from './modules/sticky-block/sticky-block';
// import {initPalm} from './modules/animation/flying-pictures';
import {resizeObserver} from './utils/observers';

window.addEventListener('DOMContentLoaded', () => {
  iosVhFix();

  const preloader = new Preloader();
  preloader.init();

  window.addEventListener('load', () => {
    initExhibitionsScripts();
    initAnimationModules();
    createMap();
    resizeObserver.subscribe(initStickyScroll);
    // resizeObserver.subscribe(initPalm);
    initScrollTo();

    burger.init();
    const stickyHeader = new StickyHeader();
    stickyHeader.init();
  });
});
