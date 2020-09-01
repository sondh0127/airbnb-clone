import React from 'react';
import logo from '../../images/logo.png';

function Navigation() {
  return (
    <nav className="navigation">
      <a className="navigation__logo" href="/">
        <img alt="Airbnb Logo" src={logo} />
      </a>
      <span
        className="navigation__toggle-menu"
        onClick={() => {
          document.querySelectorAll('.navigation__item').forEach((item) => {
            item.classList.toggle('navigation__item--is-hidden');
          });
        }}
      >
        <i className="material-icons">expand_more</i>
      </span>
      <a className="navigation__item navigation__item--is-hidden" href="/">
        Host a home
      </a>
      <a className="navigation__item navigation__item--is-hidden" href="/">
        Host an experience
      </a>
      <a className="navigation__item navigation__item--is-hidden" href="/">
        Host Help
      </a>
      <a className="navigation__item navigation__item--is-hidden" href="/">
        Sign up
      </a>
      <a className="navigation__item navigation__item--is-hidden" href="/">
        Log in
      </a>
    </nav>
  );
}

export default Navigation;
