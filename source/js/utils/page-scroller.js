const vp1023 = window.matchMedia('(max-width: 1023px)');
const vpTouch = window.matchMedia('(pointer: coarse)');

export const pageScroller = () => vp1023.matches || vpTouch.matches ? '.wrapper' : 'body';
