import React from 'react';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content">
          <a href="/" className="header__logo">
            <img
              src="https://raw.githubusercontent.com/nikachu404/abz/main/src/assets/Logo.svg"
              alt="cat logo"
              className="header__image"
            />
          </a>

          <div className="header__nav">
            <a href="#users" className="header__nav-link">
              <button className="button-template header__button">Users</button>
            </a>

            <a href="#sign-up" className="header__nav-link">
              <button className="button-template header__button">Sign up</button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
