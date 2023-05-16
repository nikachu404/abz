import React from 'react';
import './Intro.scss';

export const Intro: React.FC = () => {
  return (
    <section className="intro">
      <div className="intro__container">
        <div className="intro__content">
          <div className="intro__preamble">
            <h1 className="intro__main-text">
              Test assignment for front-end developer
            </h1>

            <h2 className="intro__second-text">
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they&apos;ll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </h2>
          </div>

          <a href="#sign-up" className="intro__link">
            <button className="button-template intro__button">Sign up</button>
          </a>
        </div>
      </div>
    </section>
  );
};
