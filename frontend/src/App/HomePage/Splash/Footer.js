import React from 'react';
import PropTypes from 'prop-types';

function Footer({ isFooterVisible, toggleFooter }) {
  return (
    <>
      <div className="toggle-footer" onClick={toggleFooter}>
        {isFooterVisible ? (
          <span>
            <i className="material-icons">close</i>
            Close
          </span>
        ) : (
          <span>
            <i className="material-icons" />
            Terms, Pricacy, Currency & More
          </span>
        )}
      </div>
      {isFooterVisible && <div className="footer">FOOTER</div>}
    </>
  );
}

Footer.propTypes = {
  isFooterVisible: PropTypes.bool.isRequired,
  toggleFooter: PropTypes.func.isRequired,
};

export default Footer;
