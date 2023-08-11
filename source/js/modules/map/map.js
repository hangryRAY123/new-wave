const pinTemplate = (
  `<div class="map__pin">
    <svg width="45" height="45" aria-hidden="true">
      <use xlink:href="img/stack.svg#pin"></use>
    </svg>
  </div>`
);

const changePinColor = (color = 'black') => {
  document.querySelector('.map__pin').style.color = color;
};

export const createMap = () => {
  window.ymaps.ready(() => {
    const myMap = new window.ymaps.Map('map',
        {
          center: [60.158310, 24.936963],
          zoom: 11,
          controls: [],
          behaviors: ['drag', 'multiTouch'],
        },
        {
          autoFitToViewport: 'always',
          suppressMapOpenBlock: true,
        }
    );

    myMap.controls.add('zoomControl', {
      size: 'auto',
      position: 'bottom',
    });

    const placemarkLayout = window.ymaps.templateLayoutFactory.createClass(pinTemplate);

    const placemark = new window.ymaps.Placemark([60.158310, 24.936963], null, {
      placemarkType: 'mainPin',
      iconLayout: 'default#imageWithContent',
      iconImageHref: '',
      iconContentSize: [45, 45],
      iconContentOffset: [-19, -44],
      iconContentLayout: placemarkLayout,
      zIndex: 100,
    });

    myMap.geoObjects.add(placemark);

    placemark.events
        .add(['mouseenter', 'mouseup'], () => changePinColor('#7c0d59'))
        .add('mouseleave', () => changePinColor('#b91a87'))
        .add('mousedown', () => changePinColor('#5b1144'));
  });
};
