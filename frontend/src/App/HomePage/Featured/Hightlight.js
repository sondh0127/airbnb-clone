import React from 'react';
import PropTypes from 'prop-types';

function Hightlight({ title, subtitle, cta, image_url }) {
  return (
    <div className="highlight">
      <h2 className="highlight__title">{title}</h2>
      <h3 className="highlight__subtitle">{subtitle}</h3>
      <img alt={subtitle} src={image_url} />
      <a className="highlight__action" href="/">
        {cta}
      </a>
    </div>
  );
}

Hightlight.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  cta: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
};

export default Hightlight;
