export class StickyHeader {
  constructor() {
    this._stickyHeader = document.querySelector('[data-header="sticky"]');
    this._headerHeight = this._stickyHeader ? this._stickyHeader.offsetHeight : '';
    this._hidePoint = this._stickyHeader ? +this._stickyHeader.dataset.hidePoint : 0;
    this._hidePoint = this._hidePoint ? this._hidePoint : 0;

    this._themeItems = document.querySelectorAll('[data-header-theme-class]');
    this._activeTheme = null;

    this._scrollY = null;
    this._prevScrollY = null;

    this._isHidden = false;
    this._isDisableScrolling = false;

    this._onWindowScroll = this._onWindowScroll.bind(this);
    this._onLocomotiveScroll = this._onLocomotiveScroll.bind(this);
  }

  init() {
    if (!this._stickyHeader) {
      return;
    }
    window.addEventListener('scroll', this._onWindowScroll);
  }

  _hideHeader() {
    if (!this._isHidden) {
      this._isHidden = true;
      this._stickyHeader.classList.add('is-hidden');
    }
  }

  _showHeader() {
    if (this._isHidden) {
      this._isHidden = false;
      this._stickyHeader.classList.remove('is-hidden');
    }
  }

  _checkScrollDirection() {
    if (this._scrollY > this._prevScrollY) {
      return 'down';
    }
    return 'up';
  }

  _onLocomotiveScroll(evt) {
    this._checkTheme();

    if (evt.direction === 'down' && evt.delta.y > this._hidePoint) {
      this._hideHeader();
    }

    if (evt.direction === 'up' || evt.delta.y <= this._hidePoint) {
      this._showHeader();
    }
  }

  _onWindowScroll() {
    this._scrollY = document.documentElement.scrollTop;
    const intro = document.querySelector('.intro');
    const header = document.querySelector('header');

    if (this._checkScrollDirection() === 'down' && this._scrollY > (intro.offsetHeight - header.offsetHeight)) {
      this._showHeader();
      this._stickyHeader.classList.add('header--sticky');
    }

    if (this._checkScrollDirection() === 'up' || this._scrollY <= (intro.offsetHeight - header.offsetHeight)) {
      this._stickyHeader.classList.remove('header--sticky');
    }

    this._prevScrollY = this._scrollY;
  }

  _checkTheme() {
    this._themeItems.forEach((item) => {
      if (item.getBoundingClientRect().top <= 0 && item.getBoundingClientRect().height + item.getBoundingClientRect().top > 0) {
        if (this._activeTheme === item.dataset.headerThemeClass) {
          return;
        }
        this._stickyHeader.classList.remove(this._activeTheme);
        this._activeTheme = item.dataset.headerThemeClass;
        this._stickyHeader.classList.add(this._activeTheme);
      }
    });
  }
}
